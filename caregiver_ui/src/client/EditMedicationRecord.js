

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/esm/Button"


const EditMedicationRecord = ({}) => {





  return (
    <Container>

      <Row>
        <Col>
          <Button variant="danger">Delete</Button>
        </Col>
      </Row>
      <Row>

        <Col>
          <Form>
            <Form.Group onSubmit={addLabel}>
              <Form.Control required name="label" type="text" placeholder="Enter name of label"/>
            </Form.Group>
            <Button variant="success" type="submit">Edit Medication</Button>
          </Form>
        </Col>

        <Col>
          <Form>
            <Form.Group onSubmit={addLabel}>
              <Form.Control required name="label" type="text" placeholder="Enter name of label"/>
            </Form.Group>
            <Button variant="success" type="submit">Edit Label</Button>
          </Form>
        </Col>
      </Row>
      
    </Container>
  )

}

export default EditMedicationRecord