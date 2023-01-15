import { useContext, useEffect, useState } from "react"

//context
import ClientContext from "../context/ClientContext";

//components
import CreateClient from "./CreateClient";
import EditClient from "./EditClient";

//styles
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';


const Caregivers = () => {

  let {clients, setUpdatingClients} = useContext(ClientContext)

  let [searchClients, setSearchClients] = useState(null)
  let [selectedClient, setSelectedClient] = useState(null)

  //modal - create caregiver
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  //modal - edit caregiver
  let [showE, setShowE] = useState(false);
  let handleCloseE = () => setShowE(false);
  let handleShowE = () => setShowE(true);

  //initialize
  useEffect(() => {
    setUpdatingClients(true)
    // eslint-disable-next-line
  }, [])

  let chooseClient = (pk) => {
    let data = clients.find(client => client.pk === pk)
    setSelectedClient(data)
  }

  const searchClient = () => {
    let search = document.getElementById('client_search').value
    setSearchClients(search)
  }

  //update display on edit
  useEffect(() => {
    if (selectedClient !== null) {
      chooseClient(selectedClient.pk)
    }
    // eslint-disable-next-line
  }, [clients])


  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={handleShow}>Add Client</Button>
        </Col>
        <Col>
          {selectedClient !== null && <Button onClick={handleShowE}>{`Edit ${selectedClient.full_name}'s Information`}</Button>}
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
          <Card.Header>List of Clients</Card.Header>
            <Form className="d-flex" onChange={() => searchClient()}>
              <Form.Control
                type="search"
                placeholder="Search for a client"
                id="client_search"
              />
            </Form>

            <ListGroup style={{overflow: 'auto'}}>
              {clients
                .filter(client => searchClients !== null ? client.full_name.toLowerCase().includes(searchClients) : client)
                .map(client => (
                  <ListGroup.Item action key={client.pk} onClick={() => chooseClient(client.pk)}>
                    {client.full_name}
                  </ListGroup.Item>
                ))          
              }
            </ListGroup>
          </Card>
        </Col>
        
        <Col>
          <Card>
          <Card.Header>{selectedClient !== null ? `${selectedClient.full_name}'s Information` : "Select a Client"}</Card.Header>
            <ListGroup>
              <ListGroup.Item>First Name: {selectedClient !== null ? selectedClient.first_name : null}</ListGroup.Item>
              <ListGroup.Item>Last Name: {selectedClient !== null ? selectedClient.last_name : null}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {selectedClient !== null ? selectedClient.phone_number : null}</ListGroup.Item>
              <ListGroup.Item>Address: {selectedClient !== null ? selectedClient.address : null}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateClient handleClose={handleClose}/>
        </Modal.Body>
      </Modal>

      <Modal
        show={showE}
        onHide={handleCloseE}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClient handleCloseE={handleCloseE} selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>
        </Modal.Body>
      </Modal>

    </Container>
  )
}

export default Caregivers