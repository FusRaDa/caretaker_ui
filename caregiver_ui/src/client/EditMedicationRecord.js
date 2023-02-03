

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/esm/Button"


const EditMedicationRecord = ({weeklyRecord, setWeeklyRecord, handleClose, selection, setSelection}) => {

  let deleteMedication = () => {
    let data = weeklyRecord.filter(m => m != selection)
    setWeeklyRecord(data)
    setSelection(null)
    handleClose()
  }

  let editMedication = (e) => {
    let index = weeklyRecord.indexOf(selection)

    selection.medication = e.target.medication.value

    if (index !== -1) {
      let data = weeklyRecord[index] = selection
      setWeeklyRecord(data)
    } else {
      alert('item not found')
    }
    handleClose()
  }

  let editLabel = (e) => {
    let index = weeklyRecord.indexOf(selection)

    selection.label = e.target.label.value

    if (index !== -1) {
      let data = weeklyRecord[index] = selection
      setWeeklyRecord(data)
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

        {selectedMedication.label === undefined && 
        <Col>
          <Form onSubmit={editMedication}>
            <Form.Group onSubmit={addLabel}>
              <Form.Control required name="medication" type="text" placeholder="Enter name of medication"/>
            </Form.Group>
            <Button variant="success" type="submit">Edit Medication</Button>
          </Form>
        </Col>}

        {selectedMedication.label !== undefined && 
        <Col>
          <Form onSubmit={editLabel}>
            <Form.Group onSubmit={addLabel}>
              <Form.Control required name="label" type="text" placeholder="Enter name of label"/>
            </Form.Group>
            <Button variant="success" type="submit">Edit Label</Button>
          </Form>
        </Col>}

      </Row>
      
    </Container>
  )

}

export default EditMedicationRecord