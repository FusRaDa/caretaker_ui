import { useContext } from "react";
import ServerAddress from "../utils/ServerAddress";

//styles
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

//contexts
import AuthContext from "../context/AuthContext";
import ClientContext from "../context/ClientContext";


const DeleteClient = ({pk, handleClose, handleCloseE, setSelectedClient}) => {

  let {authTokens} = useContext(AuthContext)
  let {setUpdatingClients} = useContext(ClientContext)

  let deleteClient = async (e) => {
    e.preventDefault()

    let text = e.target.confirm_delete.value

    if (text === "permanently delete") {

      let response = await fetch(`${ServerAddress}/api/client/${pk}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
      })
      .catch(() => {
        alert('server response failed!')
      })
  
      if (response.status === 204) {
        setUpdatingClients(true)
        handleClose()
        handleCloseE()
        setSelectedClient(null)
      } else {
        alert('something went wrong!')
      }
    } else {
      alert('confirmation required')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={deleteClient}>
            <Form.Group>
              <Form.Label>Are you sure?</Form.Label>
              <Form.Control name="confirm_delete" type='text' placeholder="Confirm this deletion" autoComplete="off"/>
              <Form.Text>Type "permanently delete" and confirm</Form.Text>
            </Form.Group>
           
            <Button variant="danger" type="submit">Confirm</Button>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default DeleteClient