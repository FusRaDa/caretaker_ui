import { useContext, useEffect, useState } from "react"
import ServerAddress from "../utils/ServerAddress"
import AddMedicationRecord from "./AddMedicationRecord"
import EditMedicationRecord from "./EditMedicationRecord"

import AuthContext from "../context/AuthContext"
import ClientContext from "../context/ClientContext"

import ClientMedicationTableStyles from "./ClientMedicationTableStyles"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'


const AddClientMedicationRecord = ({client, handleClose, setUpdating}) => {

  let {authTokens} = useContext(AuthContext)
  let {setUpdatingClients} = useContext(ClientContext)

  let [date, setDate] = useState(null)
  let [weekOfMonth, setWeekOfMonth] = useState(null)
  let [weekNumber, setWeekNumber] = useState(null)
  let [month, setMonth] = useState(null)
  let [year, setYear] = useState(null)
  let [daysOfWeek, setDaysOfWeek] = useState([])

  let [selection, setSelection] = useState(null)

  let [weeklyRecord, setWeeklyRecord] = useState([])

  //modal to add medication
  let [showA, setShowA] = useState(false);
  let handleCloseA = () => setShowA(false);
  let handleShowA = () => setShowA(true);

  //modal to edit medication
  let [showE, setShowE] = useState(false);
  let handleCloseE = () => setShowE(false);
  let handleShowE = () => setShowE(true);

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
    let monthNumberData = date.getMonth()
    let yearData = date.getFullYear()
    
    setWeekOfMonth(weekMonthData)
    setWeekNumber(weekNumberData)
    setMonth(monthNumberData)
    setYear(yearData)

    getDaysOfWeek(weekNumberData, yearData)
  }


  let initializeMedicationRecord = () => {

    let medications = client.medication_list

    if (medications.length < 1 || medications === null) {
      console.log('medication_list is null')
      return
    }

    let medicationRecord = []

    for (var x = 0; x < medications.length; x++) {

      let medication = medications[x]

      let obj = 
        {
          "medication": medication,
          "sunday": false, 
          "monday": false, 
          "tuesday": false,
          "wednesday": false,
          "thursday": false,
          "friday": false,
          "saturday": false,
        }

      medicationRecord.push(obj)
    }
    setWeeklyRecord(medicationRecord)
  }


  const addMedicationRecord = async (e) => {
    e.preventDefault()

    //validate that only sundays are chosen
    if (date.getDay() !== 0) {
      alert('choose sundays only!')
      document.getElementById('date').value = ""
      return
    }

    console.log(weeklyRecord)

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
        'month_number': month,
        'year_number': year,
        'weekly_record': weeklyRecord
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 201) {

      updateClientMedicationList()
      setUpdating(true)
      handleClose()
    } else {
      alert('something went wrong!')
    }
  }

  const updateClientMedicationList = async () => {

    let medicationList = weeklyRecord.map((m) => (
      m.label || m.medication
    ))

    console.log(medicationList)

    return

    let response = await fetch(`${ServerAddress}/api/client/${client.pk}/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'medication_list': medicationList
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 200) {
      setUpdatingClients(true)
    } else {
      alert('something went wrong!')
    }
  }

  let handleCheckBox = (e, medication) => {
    let checked = e.target.checked
    let day = e.target.value
    medication[day] = checked
  }

  let handleSelection = (med) => {
    setSelection(med)
    handleShowE()
  }


  useEffect(() => {
  
    initializeMedicationRecord()
    // eslint-disable-next-line
  }, [])


  return (
    <ClientMedicationTableStyles>
      <Container>

        <Form onSubmit={addMedicationRecord}>
          <Row>
            <Col>
              Date: <input required onChange={onChangeDate} id="date" name="date" type="date"/>
            </Col>
            <Col className="week_month">
              {date !== null && 
              <div>
                {
                weekOfMonth === 1 ? <h5>1st Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> : 
                weekOfMonth === 2 ? <h5>2nd Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
                weekOfMonth === 3 ? <h5>3rd Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
                weekOfMonth === 4 ? <h5>4th Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
                weekOfMonth === 5 ? <h5>5th Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5> :
                <h5>6th Week of {date.toLocaleString('en-US', { month: 'long' })}-{date.getFullYear()}</h5>
                }
              </div>
              }
            </Col>
          </Row>

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

                  {weeklyRecord.map((med) => (
                  <tr key={med.medication || med.label}>

                    {med.label !== undefined && 
                    <>
                      <td>
                        <Row>
                          <Col sm={1}>
                            <Button className="move_up">&#8593;</Button>
                            <Button className="move_down">&#8595;</Button>
                          </Col>

                          <Col 
                            key={`key_${med}`} 
                            className="med_col" 
                            sm={11} 
                          >
                            <div className="med_name"><h6 onClick={() => handleSelection(med)}>{med.label}</h6></div> 
                          </Col>
                        </Row>
                      </td>
                      <td>-----</td>
                      <td>-----</td>
                      <td>-----</td>
                      <td>-----</td>
                      <td>-----</td>
                      <td>-----</td>
                      <td>-----</td>
                    </>}

                    {med.label === undefined && 
                    <>
                      <td>
                        <Row>
                          <Col sm={1}>
                            <Button className="move_up">&#8593;</Button>
                            <Button className="move_down">&#8595;</Button>
                          </Col>

                          <Col 
                            key={`key_${med}`} 
                            className="med_col" 
                            sm={11}
                          >
                            <div className="med_name"><h6 onClick={() => handleSelection(med)}>{med.medication}</h6></div> 
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check">
                            <input
                              value="sunday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.sunday}/>
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check">
                            <input
                              value="monday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.monday}/>
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check">
                            <input 
                              value="tuesday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.tuesday}
                            />
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check"> 
                            <input 
                              value="wednesday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.wednesday}/>
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check">
                            <input 
                              value="thursday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.thursday}/>
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check">
                            <input 
                              value="friday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.friday}/>
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <Row>
                          <Col className="med_col_check">
                            <input 
                              value="saturday"
                              className="checkbox" 
                              onClick={(e) => handleCheckBox(e, med)}
                              type="checkbox" 
                              defaultChecked={med.saturday}/>
                          </Col>
                        </Row>
                      </td>
                    </>}
                  </tr>
                  ))}

                </tbody>

              </Table>
            </Col>
          </Row>

          <Button type="submit">Submit</Button>
          
          <Button className="add_button" onClick={handleShowA}>Add Medication/Label</Button>

        </Form>

        <Modal
          show={showA}
          onHide={handleCloseA}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Medication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddMedicationRecord 
              weeklyRecord={weeklyRecord} 
              setWeeklyRecord={setWeeklyRecord} 
              handleClose={handleCloseA}/>
          </Modal.Body>
        </Modal>

        <Modal
          show={showE}
          onHide={handleCloseE}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selection !== null && selection.label === undefined ? "Edit Medication" : "Edit Label"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditMedicationRecord 
              weeklyRecord={weeklyRecord} 
              setWeeklyRecord={setWeeklyRecord} 
              handleClose={handleCloseE}
              selection={selection}
            />
          </Modal.Body>
        </Modal>

      </Container>
    </ClientMedicationTableStyles>
  )

}

export default AddClientMedicationRecord