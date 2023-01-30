import { useContext, useState } from "react"
import ServerAddress from "../utils/ServerAddress"
import AuthContext from "../context/AuthContext"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import ClientMedicationTableStyles from "./ClientMedicationTableStyles"
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal'
import ClientMedicationList from "./ClientMedicationList"


const AddClientMedicationRecord = ({client}) => {

  let {authTokens} = useContext(AuthContext)

  let [date, setDate] = useState(null)
  let [weekOfMonth, setWeekOfMonth] = useState(null)
  let [weekNumber, setWeekNumber] = useState(null)
  let [year, setYear] = useState(null)
  let [daysOfWeek, setDaysOfWeek] = useState([])

  let [medications, setMedications] = useState([])

  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

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
    
    let totalWeeks = weekMonth + remainingWeeks
    
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

    console.log(days)

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
        'client_id': 1,
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
    <ClientMedicationTableStyles>
      <Container>
        
        <Row>
          <Col>
            Date: <input onChange={onChangeDate} id="date" name="date" type="date"/>
          </Col>
          <Col className="week_month">
            {date !== null && 
            <div>
              {
              weekOfMonth === 1 ? <h5>1st Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> : 
              weekOfMonth === 2 ? <h5>2nd Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
              weekOfMonth === 3 ? <h5>3rd Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
              weekOfMonth === 4 ? <h5>4th Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
              <h5>5th Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5>
              }
            </div>
            }
          </Col>
          <Col>
            <Button className="medication_list" onClick={handleShow}>{`Edit ${client.full_name}'s Medication List`}</Button>
          </Col>
        </Row>


        <Form onSubmit={addMedicationRecord}>
          <Row>
            <Col>
              <Table responsive>

                <thead>
                  <tr>
                    <th className="medication_header">Medication</th>
                    <th>{daysOfWeek.length !== 0 ? `Sun-${daysOfWeek[0].sunday}` : "Sun"}</th>
                    <th>{daysOfWeek.length !== 0 ? `Mon-${daysOfWeek[1].monday}` : "Mon"}</th>
                    <th>{daysOfWeek.length !== 0 ? `Tue-${daysOfWeek[2].tuesday}` : "Tue"}</th>
                    <th>{daysOfWeek.length !== 0 ? `Wed-${daysOfWeek[3].wednesday}` : "Wed"}</th>
                    <th>{daysOfWeek.length !== 0 ?  `Thu-${daysOfWeek[4].thursday}` : "Thu"}</th>
                    <th>{daysOfWeek.length !== 0 ? `Fri-${daysOfWeek[5].friday}` : "Fri"}</th>
                    <th>{daysOfWeek.length !== 0 ? `Sat-${daysOfWeek[6].saturday}` : "Sat"}</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>medafadfadsfiadsfasdf</td>
                    <td id="sunday"><input type="checkbox"/></td>
                    <td id="monday"><input type="checkbox"/></td>
                    <td id="tuesday"><input type="checkbox"/></td>
                    <td id="wednesday"><input type="checkbox"/></td>
                    <td id="thursday"><input type="checkbox"/></td>
                    <td id="friday"><input type="checkbox"/></td>
                    <td id="saturday"><input type="checkbox"/></td>
                  </tr>

                </tbody>

              </Table>
            </Col>
          </Row>

          <Button type="submit">Submit</Button>
          <Button className="add_button">Add Medication</Button>
        </Form>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>{`${client.full_name}'s Medication List`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ClientMedicationList client={client}/>
          </Modal.Body>
        </Modal>

      </Container>
    </ClientMedicationTableStyles>
  )

}

export default AddClientMedicationRecord