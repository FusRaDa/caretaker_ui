import { useContext, useEffect, useState } from "react";

import ServerAddress from "../utils/ServerAddress";
import AuthContext from "../context/AuthContext";

//styles
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAsyncValue } from "react-router-dom";


const PreviewTimeStamps = ({record, handleCloseP}) => {

  let {authTokens} = useContext(AuthContext)


  useEffect(() => {
    console.log(record)
    // eslint-disable-next-line
  }, [])

  let addRecord = async (e) => {
    e.preventDefault()

    console.log(e.target.services.value)

    return

    let response = await fetch(`${ServerAddress}/api/record/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        caregiver_id: record.caregiver.pk,
        date_created: record.date_created,
        service: e.target.services.value,

      })
    })
    .catch(() => {
      alert('server response failed!')
    })
  
    if (response.status === 201) {
      console.log('recorded')
    
      handleCloseP()
    } else {
      alert('something went wrong!')
    }
  }



  return (
    <Container>

      <Row>
        <Col>
          <div>{`Date: ${record[0].date_created}`}</div>
        </Col>
        <Col>
          {`Client(s):`}
        </Col>
      </Row>

      <Row>
        <Col>
          <div>{`PDA: ${record[1].caregiver.full_name}`}</div>
        </Col>
        <Col>
          {[...new Set(record[2].timestamps.map(a => a.client.full_name))].map((full_name) => (
            <div>{full_name}</div>
          ))}
        </Col>
      </Row>

      <Row>
        <Col>
          <table>
            <tr>
              <th>Date/Time In</th>
              <th>Date/Time Out</th>
              <th>Total Hours</th>
              <th>Hourly Rate</th>
              <th>Compensation</th>
            </tr>

            {record[2].timestamps.map(t => (
              <tr>
                <td>{t.start_time}</td>   
                <td>{t.end_time}</td>
                <td>{t.total_hours}</td>   
                <td>{t.hourly_rate}</td>   
                <td>{t.compensation}</td>              
              </tr>
            ))}
          </table>
        </Col>
      </Row>

      <Row>
        <Col>
          <div>{`Total Hours: `}</div>
        </Col>
        <Col>
          <div>{`Total Amount Due:`}</div>
        </Col>
      </Row>

      <Form onSubmit={addRecord}>
        <Row>
          <Col>
            <FloatingLabel label="Types of Services Provided">
              <Form.Control
                as="textarea"
                name="services"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        
        <Row>
          <Form.Label>Assistance with Daily Living Activities:</Form.Label>

          <Col>
            <Form.Check 
              type="switch"
              name="bathing"
              label="Bathing"
            />
            <Form.Check 
              type="switch"
              name="transferring"
              label="Transferring"
            />
            <Form.Check 
              type="switch"
              name="ambulation"
              label="Ambulation"
            />
          </Col>

          <Col>
            <Form.Check 
              type="switch"
              name="dressing"
              label="Dressing"
            />
            <Form.Check 
              type="switch"
              name="protective_supervision"
              label="Protective Supervision"
            />
            <Form.Check 
              type="switch"
              name="eating"
              label="Eating"
            />
          </Col>

          <Col>
            <Form.Check 
              type="switch"
              name="incontinence"
              label="Incontinence"
            />
            <Form.Check 
              type="switch"
              name="medication_reminders"
              label="Medication Reminders"
            />
            <Form.Check 
              type="switch"
              name="toileting"
              label="Toileting"
            />
          </Col>
        
        </Row>
        <Button type="submit">Confirm Review</Button>
      </Form>

      
  
    </Container>
  )
}

export default PreviewTimeStamps