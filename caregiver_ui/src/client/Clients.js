import { useContext, useState } from "react"

import ClientContext from "../context/ClientContext";

//styles
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const Clients = () => {

  let {clients} = useContext(ClientContext)

  let [searchClients, setSearchClients] = useState(null)
  let [selectedClient, setSelectedClient] = useState(null)

  let chooseClient = (pk) => {
    let data = clients.find(client => client.pk === pk)
    setSelectedClient(data)
  }

  const searchClient = () => {
    let search = document.getElementById('client_search').value
    setSearchClients(search)
  }

  return (
    <Container>
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

            <ListGroup>
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
              <ListGroup.Item>First Name: {selectedClient !== null ?  selectedClient.first_name : null}</ListGroup.Item>
              <ListGroup.Item>Last Name: {selectedClient !== null ? selectedClient.last_name : null}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {selectedClient !== null ? selectedClient.phone_number : null}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </Container>
  )
}

export default Clients