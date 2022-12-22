import { useContext } from "react"
import ServerAddress from "../utils/ServerAddress";

import ClientContext from "../context/ClientContext";
import AuthContext from "../context/AuthContext";

//styles
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


const CreateClient = ({handleClose}) => {

  let {setUpdatingClients} = useContext(ClientContext)
  let {authTokens} = useContext(AuthContext)

  const addClient = async (e) => {
    e.preventDefault()

    let response = await fetch(`${ServerAddress}/api/client/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'first_name': e.target.first_name.value,
        'last_name': e.target.last_name.value,
        'phone_number': e.target.phone_number.value,
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 201) {
      setUpdatingClients(true)
      handleClose()
    } else {
      alert('something went wrong!')
    }
  }


  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={addClient}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first_name" placeholder="Client's first name"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" placeholder="Client's last name"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone_number" placeholder="Client's phone number"/>
            </Form.Group>

            <Button type="submit">Submit</Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateClient