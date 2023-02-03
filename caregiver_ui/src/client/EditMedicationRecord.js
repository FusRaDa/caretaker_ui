

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form'


const EditMedicationRecord = ({weeklyRecord, setWeeklyRecord, handleClose, selection}) => {

  let deleteMedication = () => {
    let data = weeklyRecord.filter(m => m !== selection)
    setWeeklyRecord(data)
    handleClose()
  }

  let editMedication = (e) => {
    e.preventDefault()
    let index = weeklyRecord.indexOf(selection)

    if (selection.medication === e.target.medication.value) {
      handleClose()
      return
    }

    let validation = weeklyRecord.filter(m => m.medication === e.target.medication.value || m.label === e.target.medication.value )
    if (validation.length > 0) {
      alert("Row already exists, input must be unique")
      return
    }

    selection.medication = e.target.medication.value
    if (index !== -1) {
      weeklyRecord[index] = selection
      setWeeklyRecord(weeklyRecord)
    } else {
      alert('item not found')
    }
    handleClose()
  }

  let editLabel = (e) => {
    e.preventDefault()
    let index = weeklyRecord.indexOf(selection)

    if (selection.label === e.target.label.value) {
      handleClose()
      return
    }

    let validation = weeklyRecord.filter(m => m.label === e.target.label.value || m.medication === e.target.label.value)
    if (validation.length > 0) {
      alert("Row already exists, input must be unique")
      return
    }

    selection.label = e.target.label.value
    if (index !== -1) {
      weeklyRecord[index] = selection
      setWeeklyRecord(weeklyRecord)
    } else {
      alert('item not found')
    }
    handleClose()
  }


  return (
    <Container>

      <Row>
        <Col>
          <Button variant="danger" onClick={() => deleteMedication()}>Delete</Button>
        </Col>
      </Row>

      <Row>

        {selection.label === undefined && 
        <Col>
          <Form onSubmit={editMedication}>
            <Form.Group>
              <Form.Control 
                defaultValue={selection.medication}
                required name="medication" 
                type="text" 
                placeholder="Enter name of medication"/>
            </Form.Group>
            <Button variant="success" type="submit">Edit Medication</Button>
          </Form>
        </Col>}

        {selection.label !== undefined && 
        <Col>
          <Form onSubmit={editLabel}>
            <Form.Group>
              <Form.Control 
                defaultValue={selection.label}
                required name="label" 
                type="text" 
                placeholder="Enter name of label"/>
            </Form.Group>
            <Button variant="success" type="submit">Edit Label</Button>
          </Form>
        </Col>}

      </Row>
      
    </Container>
  )

}

export default EditMedicationRecord