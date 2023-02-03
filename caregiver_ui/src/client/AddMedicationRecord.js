import { useState } from "react"

import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"


const AddMedicationRecord = ({weeklyRecord, setWeeklyRecord, handleClose}) => {

  let [addMed, setAddMed] = useState(true)

  let addMedication = (e) => {

    let obj = 
        {
          "medication": e.target.medication.value,
          "sunday": false, 
          "monday": false, 
          "tuesday": false,
          "wednesday": false,
          "thursday": false,
          "friday": false,
          "saturday": false,
        }

    let data = weeklyRecord.push(obj)
    setWeeklyRecord(data)
  }

  let addLabel = (e) => {

    let obj = 
        { 
          "label": e.target.label.value,
        }

    let data = weeklyRecord.push(obj)
    setWeeklyRecord(data)
  }


  return (
    <Container>
      <Row>
        <Col>
          <Button 
            disabled={addMed} 
            onClick={() => setAddMed(true)}>
            Add Medication
          </Button>
        </Col>
        <Col>
          <Button 
            disabled={addMed ? false : true} 
            onClick={() => setAddMed(false)}>
            Add Label
          </Button>
        </Col>
      </Row>

      {addMed && 
      <Row>
        <Col>
          <Form>
            <Form.Group onSubmit={addMedication}>
              <Form.Control required name="medication" type="text" placeholder="Enter name of medication"/>
            </Form.Group>
            <Button variant="success" type="submit">Add Medication</Button>
          </Form>
        </Col>
      </Row>}

      {!addMed && 
      <Row>
        <Col>
          <Form>
            <Form.Group onSubmit={addLabel}>
              <Form.Control required name="label" type="text" placeholder="Enter name of label"/>
            </Form.Group>
            <Button variant="success" type="submit">Add Label</Button>
          </Form>
        </Col>
      </Row>}

    </Container>
  )
}

export default AddMedicationRecord