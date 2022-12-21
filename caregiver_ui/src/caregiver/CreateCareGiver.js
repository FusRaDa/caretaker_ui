import { useContext } from "react"
import ServerAddress from "../utils/ServerAddress";

import CareGiverContext from "../context/CareGiverContext"
import AuthContext from "../context/AuthContext";

//styles
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


const CreateCareGiver = ({handleClose}) => {

  let {setUpdatingCareGivers} = useContext(CareGiverContext)
  let {authTokens} = useContext(AuthContext)

  const addCareGiver = async (e) => {
    e.preventDefault()

    let response = await fetch(`${ServerAddress}/api/caregiver/create/`, {
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
      setUpdatingCareGivers(true)
      handleClose()
    } else {
      alert('something went wrong!')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={addCareGiver}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first_name" placeholder="Caregiver's first name"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" placeholder="Caregiver's last name"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone_number" placeholder="Caregiver's phone number"/>
            </Form.Group>

            <Button type="submit">Submit</Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  )

}

export default CreateCareGiver