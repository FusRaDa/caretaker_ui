import { useState } from "react"

import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"


const AddMedicationRecord = () => {

  let [addMed, setAddMed] = useState(true)

  return (
    <Container>
      <Row>
        <Col>
          <Button>Add Medication</Button>
        </Col>
        <Col>
          <Button>Add Label</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter name of medication"/>
            </Form.Group>
            <Button variant="success" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AddMedicationRecord