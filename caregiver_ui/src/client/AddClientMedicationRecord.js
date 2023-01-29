import { useContext, useState } from "react"
import ServerAddress from "../utils/ServerAddress"
import AuthContext from "../context/AuthContext"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"



const AddClientMedicationRecord = ({pk}) => {

  let {authTokens} = useContext(AuthContext)

  let [date, setDate] = useState(null)
  let [weekOfMonth, setWeekOfMonth] = useState(null)
  let [weekNumber, setWeekNumber] = useState(null)
  let [year, setYear] = useState(null)
  let [daysOfWeek, setDaysOfWeek] = useState([])

  //get week number in the month - for aesthetic purposes only
  let getWeekMonth = (date) => {
    let monthStart = new Date(date)
    monthStart.setDate(0)
    let offset = (monthStart.getDay() + 1) % 7 //set to Sunday as start of week
    return Math.ceil((date.getDate() + offset) / 7)
  }

  let getWeekNumber = (date) => {
    
    const oneDay = 24 * 60 * 60 * 1000
    
    //beginning of year - Jan 1
    let yearStart = new Date(date.getFullYear(), 0, 1)

    //include offset of day in month
    let monthStart = new Date(date)
    monthStart.setDate(0)
    let offset = (monthStart.getDay() + 1) % 7 //set to Sunday as start of week
    console.log("offset: " + offset)
    
    //calculate week of month
    let weekMonth = Math.ceil((date.getDate() + offset) / 7)
    console.log("weekMonth: " + weekMonth)
    
    //calculate week of year subtract by offset, +1 to add the missing day from subraction   
    let days = Math.floor((date - yearStart) / oneDay) + 1 - offset - date.getDate()
    if (days < 0) {
        days = 0
    }
    let remainingWeeks = Math.ceil(days / 7 )
    console.log("days:" + days)
    console.log("remainingWeeks: " + remainingWeeks)
    
    totalWeeks = weekMonth + remainingWeeks
    
    return totalWeeks
    
  }

  let getDaysOfWeek = (w, y) => {
    

    let date = new Date(y, 0, (1 + (w-1) * 7)); // 1st of January + 7 days for each week

    let options = {day: 'numeric', month: 'numeric' }
    
    let sunday = new Date(date.setDate(date.getDate() + (0 - date.getDay()))).toLocaleDateString('en-GB', options)
    let monday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 1)).toLocaleDateString('en-GB', options)
    let tuesday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 2)).toLocaleDateString('en-GB', options)
    let wednesday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 3)).toLocaleDateString('en-GB', options)
    let thursday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 4)).toLocaleDateString('en-GB', options)
    let friday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 5)).toLocaleDateString('en-GB', options)
    let saturday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 6)).toLocaleDateString('en-GB', options)

    let days = []

    days.push({'sunday': sunday})
    days.push({'monday': monday})
    days.push({'tuesday': tuesday})
    days.push({'wednesday': wednesday})
    days.push({'thursday': thursday})
    days.push({'friday': friday})
    days.push({'saturday': saturday})

    setDaysOfWeek(days)
   
  }


  let onChangeDate = (e) => {

    //parse string from date input
    let dateString = e.target.value
    let b = dateString.split(/\D/)
    let date = new Date(b[0], --b[1], b[2])

    setDate(date)

    let weekMonthData = getWeekMonth(date)
    let weekNumberData = getWeekNumber(date)
    let yearData = date.getFullYear()
    
    setWeekOfMonth(weekMonthData)
    setWeekNumber(weekNumberData)
    setYear(yearData)

    getDaysOfWeek(weekNumberData, yearData)
  }


  const addMedicationRecord = async (e) => {
    e.preventDefault()

    //validate that only sundays are chosen
    if (date.getDay() !== 0) {
      alert('choose sundays only!')
      document.getElementById('date').value = ""
      return
    }




    return

    let response = await fetch(`${ServerAddress}/api/client_medication/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'client_id': pk,
        'week_of_month_number': weekOfMonth,
        'week_number': weekNumber,
        'year_number': year,
        'weekly_record': {}
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 201) {
      
 
    } else {
      alert('something went wrong!')
    }
  }




  return (
    <Container>
      
      <Row>
        <Col>
          Date: <input onChange={onChangeDate} id="date" name="date" type="date"/>
        </Col>
        <Col>
          {
          date !== null && 
          
          <div>
            {
            weekOfMonth === 1 ? <h3>1st Week of {date.toLocaleString('en-US', { month: 'long' })}</h3> : 
            weekOfMonth === 2 ? <h3>2nd Week of {date.toLocaleString('en-US', { month: 'long' })}</h3> :
            weekOfMonth === 3 ? <h3>3rd Week of {date.toLocaleString('en-US', { month: 'long' })}</h3> :
            weekOfMonth === 4 ? <h3>4th Week of {date.toLocaleString('en-US', { month: 'long' })}</h3> :
            <h3>5th Week of {date.toLocaleString('en-US', { month: 'long' })}</h3>
            }
          </div>

          
          }
        </Col>
      </Row>


      <Form onSubmit={addMedicationRecord}>
        <Row>
          <Col>
            <table>

              <thead>
                <tr>
                  <th>Medication</th>
                  <th>{daysOfWeek.length !== 0 ? `Sunday-${daysOfWeek.sunday}` : "-----"}</th>
                  <th>{daysOfWeek.length !== 0 ? `Monday-${daysOfWeek.monday}` : "-----"}</th>
                  <th>{daysOfWeek.length !== 0 ? `Tuesday-${daysOfWeek.tuesday}` : "-----"}</th>
                  <th>{daysOfWeek.length !== 0 ? `Wednesday-${daysOfWeek.wednesday}` : "-----"}</th>
                  <th>{daysOfWeek.length !== 0 ?  `Thursday-${daysOfWeek.thursday}` : "-----"}</th>
                  <th>{daysOfWeek.length !== 0 ? `Friday-${daysOfWeek.friday}` : "-----"}</th>
                  <th>{daysOfWeek.length !== 0 ? `Saturday-${daysOfWeek.saturday}` : "-----"}</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>

                  </td>
                </tr>

              </tbody>

            </table>
          </Col>
        </Row>

        <Button type="submit">Submit</Button>
      </Form>

    </Container>
  )

}

export default AddClientMedicationRecord