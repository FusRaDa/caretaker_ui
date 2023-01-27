import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form'


const AddClientMedicationRecord = () => {

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            Choose Week <input type="date"/>
          </Col>
        </Row>
        <Row>
          <Col>
            medication list
          </Col>

          <Col>
            days of week checkasd
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default AddClientMedicationRecord