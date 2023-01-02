import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import RecordPageStyles from "./RecordPageStyles"


const RecordPage = () => {
  const {state} = useLocation()

  let [record, setRecord] = useState([])
  let [timestamps, setTimeStamps] = useState([])
  let [caregiver, setCareGiver] = useState(null)

  useEffect(() => {
    setRecord(state.data)
    setCareGiver(state.data.caregiver)
    setTimeStamps(state.data.timestamps)
    console.log(state.data)
  }, [])

  return (
    <RecordPageStyles>
      <Container className="container" fluid="sm">

        <Row>
          <Col>
            <h3 className="title">Billing Statement</h3> 
          </Col>
        </Row>

        <Row className="info">
          <Col>
            <div>{`Date: ${record.date_created}`}</div>
            <div>{caregiver !== null ? `PDA: ${caregiver.full_name}` : ""}</div>
            <div>{caregiver !== null ? `Contact Info: ${caregiver.phone_number}` : ""}</div>
          </Col>

          <Col className="client_header">
            {`Client(s):`}
          </Col>

          <Col className="clients">
            {[...new Set(timestamps.map(a => a.client.full_name))].map((full_name) => (
              <div>{full_name + " "}</div>
            ))}
          </Col>
        </Row>

        <Row>
          <Col>
            <table>

              <thead>
                <tr>
                  <th>Date/Time In</th>
                  <th>Date/Time Out</th>
                  <th>Total Hours</th>
                  <th>Hourly Rate</th>
                  <th>Compensation</th>
                </tr>
              </thead>

              <tbody>
                {timestamps.map(t => (
                  <tr key={t.pk}>
                    <td>{`${new Date(t.start_time).toLocaleDateString('en-US', {weekday: 'long'})} ${t.start_time}`}</td>   
                    <td>{`${new Date(t.end_time).toLocaleDateString('en-US', {weekday: 'long'})} ${t.end_time}`}</td>
                    <td>{t.total_hours}</td>   
                    <td>{`$${t.hourly_rate}`}</td>   
                    <td>{`$${t.compensation}`}</td>  
                  </tr>
                ))}


              </tbody>
            </table>
          </Col>
        </Row>

        <Row className="totals">
          <Col className="total_hours_header">
            Total Hours:
          </Col>
          <Col className="total_hours">
            <div>{`${Number(timestamps.reduce((total, hours) => total + Number(hours.total_hours), 0)).toFixed(2)}`}</div>
          </Col>

          <Col className="compensation_header">
            Total Amount Due:
          </Col>

          <Col className="compensation">
            <div>{`$${Number(timestamps.reduce((total, comp) => total + Number(comp.compensation), 0)).toFixed(2)}`}</div>
          </Col>
        </Row>

        <Row>
          <Col className="service_textbox">
            <FloatingLabel label="Types of Services Provided">
              <Form.Control
                className="textbox"
                as="textarea"
                name="services"
                style={{ height: '100px' }}
                defaultValue={record.service}
                disabled
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="first_row_check">
          <Col>{record.bathing ? `\u2713 Bathing` : '__ Bathing'}</Col>
          <Col>{record.dressing ? `\u2713 Dressing` : '__ Dressing'}</Col>
          <Col>{record.incontinence ? `\u2713 Incontinence` : '__ Incontinence'}</Col>
        </Row>

        <Row className="second_row_check">
          <Col>{record.transferring ? `\u2713 Transferring` : '__ Transferring'}</Col>
          <Col>{record.protective_supervision ? `\u2713 Protective Supervision` : '__ Protective Supervision'}</Col>
          <Col>{record.medication_reminders ? `\u2713 Medication Reminders` : '__ Medication Reminders'}</Col>
        </Row>

        <Row className="third_row_check"> 
          <Col>{record.ambulation ? `\u2713 Ambulation` : '__ Ambulation'}</Col>
          <Col>{record.eating ? `\u2713 Eating` : '__ Eating'}</Col>
          <Col>{record.toileting ? `\u2713 Toileting` : '__ Toileting'}</Col>
        </Row>


      </Container>
    </RecordPageStyles>
  )
}

export default RecordPage