import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import CareGiverContext from "../context/CareGiverContext";
import ServerAddress from "../utils/ServerAddress";

//styles
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import DeleteCareGiver from "./DeleteCareGiver";
import Modal from 'react-bootstrap/Modal';


const EditCareGiver = ({handleCloseE, selectedCareGiver, setOnDelete}) => {

  let {authTokens} = useContext(AuthContext)
  let {setUpdatingCareGivers} = useContext(CareGiverContext)

  //modal - create caregiver
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  const editCareGiver = async (e) => {
    e.preventDefault()

    let response = await fetch(`${ServerAddress}/api/caregiver/${selectedCareGiver.pk}/update/`, {
      method: 'PATCH',
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
      setUpdatingCareGivers(true)
      handleCloseE()
    } else {
      alert('something went wrong!')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={editCareGiver}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first_name" placeholder="Caregiver's first name" defaultValue={selectedCareGiver.first_name} required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" placeholder="Caregiver's last name" defaultValue={selectedCareGiver.last_name} required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone_number" placeholder="Caregiver's phone number" defaultValue={selectedCareGiver.phone_number} required/>
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
          <Modal.Title>Delete Caregiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteCareGiver pk={selectedCareGiver.pk} handleClose={handleClose} handleCloseE={handleCloseE} setOnDelete={setOnDelete}/>
        </Modal.Body>
      </Modal>

    </Container>
  )

}

export default EditCareGiver