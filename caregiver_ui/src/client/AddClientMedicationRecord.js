import { useContext, useState } from "react"
import ServerAddress from "../utils/ServerAddress"
import AuthContext from "../context/AuthContext"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"



const AddClientMedicationRecord = () => {

  let {authTokens} = useContext(AuthContext)

  let [date, setDate] = useState(null)
  let [weekOfMonth, setWeekOfMonth] = useState(null)

  //get week number in the month - for aesthetic purposes only
  let getWeekMonth = (date) => {
    let monthStart = new Date(date)
    monthStart.setDate(0)
    let offset = (monthStart.getDay() + 1) % 7 //set to Sunday as start of week
    return Math.ceil((date.getDate() + offset) / 7)
  }


  let onChangeDate = (e) => {

    //parse string from date input
    let dateString = e.target.value
    let b = dateString.split(/\D/)
    let date = new Date(b[0], --b[1], b[2])

    setDate(date)

    setWeekOfMonth(getWeekMonth(date))
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

    let response = await fetch(`${ServerAddress}/api/client/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'first_name': e.target.first_name.value,
        'last_name': e.target.last_name.value,
        'phone_number': e.target.phone_number.value,
        'address': e.target.address.value,
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
            medication list
          </Col>

          <Col>
            days of week check
          </Col>
        </Row>

        <Button type="submit">Submit</Button>

      </Form>
    </Container>
  )

}

export default AddClientMedicationRecord