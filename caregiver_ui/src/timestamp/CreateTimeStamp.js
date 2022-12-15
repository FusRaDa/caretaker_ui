

//context
import CareGiverContext from "../context/CareGiverContext";
import ClientContext from "../context/ClientContext";

//styles
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext, useState } from "react";

const CreateTimeStamp = () => {

  let {careGivers} = useContext(CareGiverContext)
  let {clients} = useState(ClientContext)

  let [searchCareGivers, setSearchCareGivers] = useState(null)
  let [searchClients, setSearchClients] = useState(null)

  let [selectedCareGiver, setSelectedCareGiver] = useState(null)
  let [selectedClient, setSelectedClient] = useState(null)


  const searchCareGiver = () => {
    let search = document.getElementById('caregiver_search').value
    setSearchCareGivers(search)
  }

  const searchClient = () => {
    let search = document.getElementById('client_search').value
    setSearchClients(search)
  }

  const chooseCareGiver = (pk) => {
    let data = careGivers.find(cg => cg.pk === pk)
    setSelectedCareGiver(data)
  }

  const chooseClient = (pk) => {
    let data = clients.find(client => client.pk === pk)
    setSelectedClient(data)
  }

  return (
    <Container>
      <Row>

        <Col>
          <Form className="d-flex" onChange={() => searchCareGiver()}>
            <Form.Control
              type="search"
              placeholder="Search for a caregiver"
              id="caregiver_search"
            />
          </Form>

          <ListGroup>
            {careGivers
              .filter(cg => searchCareGivers !== null ? cg.full_name.toLowerCase().includes(searchCareGivers) : cg)
              .map(cg => (
                <ListGroup.Item action key={cg.pk} onClick={() => chooseCareGiver(cg.pk)}>
                  {cg.full_name}
                </ListGroup.Item>
              ))          
            }
          </ListGroup>
        </Col>
      
        <Col>
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
        </Col>

      </Row>

      <Row>
        <Col>

          <Form>

            <Form.Group>
              <Form.Label>Caregiver</Form.Label>
              <Form.Control type="text" placeholder="Select a caregiver" disabled />
            </Form.Group>

            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Control type="text" placeholder="Select a client" disabled/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" placeholder="Start of shift" />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control type="datetime-local" placeholder="End of shift" />
            </Form.Group>

            <Form.Group>
            <Form.Label>Hourly Rate</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" placeholder="Rate per hour" step='0.01' defaultValue='0.50' />
            </InputGroup>
            </Form.Group>




            



          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default CreateTimeStamp