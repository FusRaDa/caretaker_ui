import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ClientContext from "../context/ClientContext";
import ServerAddress from "../utils/ServerAddress";
import DeleteClient from "./DeleteClient";

//styles
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';


const EditClient = ({handleCloseE, selectedClient}) => {

  let {authTokens} = useContext(AuthContext)
  let {setUpdatingClients} = useContext(ClientContext)

  //modal - create caregiver
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  const editClient = async (e) => {
    e.preventDefault()

    let response = await fetch(`${ServerAddress}/api/client/${selectedClient.pk}/update/`, {
      method: 'PUT',
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

    if (response.status === 200) {
      setUpdatingClients(true)
      handleCloseE()
    } else {
      alert('something went wrong!')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={editClient}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first_name" placeholder="Client's first name" defaultValue={selectedClient.first_name} required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" placeholder="Client's last name" defaultValue={selectedClient.last_name} required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone_number" placeholder="Client's phone number" defaultValue={selectedClient.phone_number} required/>
            </Form.Group>

            <Button onClick={handleShow}>Delete</Button>
            <Button type="submit">Submit</Button>
            
          </Form>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteClient pk={selectedClient.pk} handleClose={handleClose} handleCloseE={handleCloseE} />
        </Modal.Body>
      </Modal>

    </Container>
  )

}

export default EditClient