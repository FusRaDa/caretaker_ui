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
import PreviewTableStyle from "./PreviewTableStyle";


const PreviewTimeStamps = ({record, handleCloseP}) => {

  let {authTokens} = useContext(AuthContext)

  let addRecord = async (e) => {
    e.preventDefault()

    let bools = {
      bathing: e.target.bathing.checked,
      transferring: e.target.transferring.checked,
      ambulation: e.target.ambulation.checked,
      dressing: e.target.dressing.checked,
      protective_supervision: e.target.protective_supervision.checked,
      eating: e.target.eating.checked,
      incontinence: e.target.incontinence.checked,
      medication_reminders: e.target.medication_reminders.checked,
      toileting: e.target.toileting.checked,
    }

    console.log(bools)

    return

    let response = await fetch(`${ServerAddress}/api/record/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        //do not send date_created, will be created in backend-auto
        caregiver_id: record.caregiver.pk,
        service: e.target.services.value,
        timestamps: record[2].timestamps,

      })
    })
    .catch(() => {
      alert('server response failed!')
    })
  
    if (response.status === 201) {
      console.log('recorded')
    
      handleCloseP()
      //or navigate to record page
    } else {
      alert('something went wrong!')
    }
  }


  return (
    <PreviewTableStyle>
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
              <tr key={t.pk}>
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
        <Col className="total_hours">
          <div>{`Total Hours: ${Number(record[2].timestamps.reduce((total, hours) => total + Number(hours.total_hours), 0)).toFixed(2)}`}</div>
        </Col>
        <Col className="compensation">
          <div>{`Total Amount Due: $${Number(record[2].timestamps.reduce((total, comp) => total + Number(comp.compensation), 0)).toFixed(2)}`}</div>
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
              id="bathing"
              label="Bathing"
            />
            <Form.Check 
              type="switch"
              id="transferring"
              label="Transferring"
            />
            <Form.Check 
              type="switch"
              id="ambulation"
              label="Ambulation"
            />
          </Col>

          <Col>
            <Form.Check 
              type="switch"
              id="dressing"
              label="Dressing"
            />
            <Form.Check 
              type="switch"
              id="protective_supervision"
              label="Protective Supervision"
            />
            <Form.Check 
              type="switch"
              id="eating"
              label="Eating"
            />
          </Col>

          <Col>
            <Form.Check 
              type="switch"
              id="incontinence"
              label="Incontinence"
            />
            <Form.Check 
              type="switch"
              id="medication_reminders"
              label="Medication Reminders"
            />
            <Form.Check 
              type="switch"
              id="toileting"
              label="Toileting"
            />
          </Col>
        
        </Row>
        <Button type="submit">Confirm Review</Button>
      </Form>

    </Container>
    </PreviewTableStyle>
  )
}

export default PreviewTimeStamps