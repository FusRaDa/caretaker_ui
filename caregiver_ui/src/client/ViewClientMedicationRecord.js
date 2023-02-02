import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import ServerAddress from "../utils/ServerAddress"
import AuthContext from "../context/AuthContext"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button"
import ClientMedicationTableStyles from "./ClientMedicationTableStyles"
import MedicationList from "./MedicationList"


const ViewClientMedicationRecord = () => {

  let {authTokens} = useContext(AuthContext)

  const location = useLocation()

  const navigate = useNavigate()

  let client = location.state.medicationRecord.client

  let weekOfMonth = location.state.medicationRecord.week_of_month_number
  let weekNumber = location.state.medicationRecord.week_number
  let month = location.state.medicationRecord.month_number
  let year = location.state.medicationRecord.year_number
  let [daysOfWeek, setDaysOfWeek] = useState([])

  let [weeklyMedications, setweeklyMedications] = useState([...location.state.medicationRecord.weekly_record])
  let [medications, setMedications] = useState([])

  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);


  const updateMedicationRecord = async (e) => {
    e.preventDefault()


    return

    // let weeklyRecord = createMedicationRecord()

    let response = await fetch(`${ServerAddress}/api/client_medication/create/`, {
      method: 'PATCH',
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
        'weekly_record': weeklyMedications
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 201) {
      // handleCloseAddRecord()
      // setUpdating(true)

    } else {
      alert('something went wrong!')
    }
  }

  let getMonthName = (year, month) => {
    let date = new Date(year, month, 1);
    return date.toLocaleString('en-us', { month: 'long' })
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

  let listMedications = () => {
    let list = weeklyMedications.map((med)=> (
      (Object.keys(med)[0])
    ))
    setMedications(list)
  }

  useEffect(() => {
    getDaysOfWeek(location.state.medicationRecord.week_number, location.state.medicationRecord.year_number)
    listMedications()
    // eslint-disable-next-line
  }, [])


  return (
    <ClientMedicationTableStyles>
      <Container>

        <Form onSubmit={updateMedicationRecord}>

          <Row>

            <Col>
              <Button variant="warning" onClick={() => navigate(-1)}>{`View ${client.full_name}'s Medical Records`}</Button>
            </Col>

            <Col className="week_month">
              <div>
                {
                weekOfMonth === 1 ? <h5>1st Week of {getMonthName(year, month)}-{year}</h5> : 
                weekOfMonth === 2 ? <h5>2nd Week of {getMonthName(year, month)}-{year}</h5> :
                weekOfMonth === 3 ? <h5>3rd Week of {getMonthName(year, month)}-{year}</h5> :
                weekOfMonth === 4 ? <h5>4th Week of {getMonthName(year, month)}-{year}</h5> :
                weekOfMonth === 5 ? <h5>5th Week of {getMonthName(year, month)}-{year}</h5> :
                <h5>6th Week of {getMonthName(year, month)}-{year}</h5>
                }
              </div>
            </Col>

            <Col>
              <Button className="medication_list" onClick={handleShow}>{`Edit Medication List`}</Button>
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
                  {weeklyMedications.map((med) => (
                  <tr key={weeklyMedications.indexOf(med)}>
                    <td>{Object.keys(med)}</td>
                    <td><input id={`sunday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].sunday}/></td>
                    <td><input id={`monday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].monday}/></td>
                    <td><input id={`tuesday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].tuesday}/></td>
                    <td><input id={`wednesday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].wednesday}/></td>
                    <td><input id={`thursday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].thursday}/></td>
                    <td><input id={`friday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].friday}/></td>
                    <td><input id={`saturday-${weeklyMedications.indexOf(med)}`} type="checkbox" defaultChecked={med[Object.keys(med)].saturday}/></td>
                  </tr>
                  ))}
                </tbody>

              </Table>
              
            </Col>
          </Row>

        </Form>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Medication List`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MedicationList medications={medications} client={client}/>
          </Modal.Body>
        </Modal>
        
      </Container>
    </ClientMedicationTableStyles>
  )

}

export default ViewClientMedicationRecord