import { useEffect, useState } from "react"

import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"


const AddMedicationRecord = ({weeklyRecord, setWeeklyRecord, handleClose}) => {

  let [addMed, setAddMed] = useState(true)

  let addMedication = (e) => {

    e.preventDefault()

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
    
    if (weeklyRecord.contains(obj)) {
      alert("medication is already in this list")
      return
    }

    setWeeklyRecord([...weeklyRecord, obj])

    handleClose()
  }

  let addLabel = (e) => {

    e.preventDefault()

    let obj = 

        { 
          "label": e.target.label.value,
        }

    if (weeklyRecord.contains(obj)) {
      alert("label is already in this list")
      return
    }

    setWeeklyRecord([...weeklyRecord, obj])

    handleClose()
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
          <Form onSubmit={addMedication}>
            <Form.Group>
              <Form.Control 
                required 
                name="medication" 
                type="text" 
                placeholder="Enter name of medication"/>
            </Form.Group>
            <Button variant="success" type="submit">Add Medication</Button>
          </Form>
        </Col>
      </Row>}

      {!addMed && 
      <Row>
        <Col>
          <Form onSubmit={addLabel}>
            <Form.Group>
              <Form.Control 
                required 
                name="label" 
                type="text" 
                placeholder="Enter name of label"/>
            </Form.Group>
            <Button variant="success" type="submit">Add Label</Button>
          </Form>
        </Col>
      </Row>}

    </Container>
  )
}

export default AddMedicationRecord