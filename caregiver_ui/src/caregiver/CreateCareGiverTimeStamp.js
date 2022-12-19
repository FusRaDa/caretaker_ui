//components
import ServerAddress from "../utils/ServerAddress";

//context
import ClientContext from "../context/ClientContext";
import AuthContext from "../context/AuthContext";

//styles
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext, useState } from "react";


const CreateCareGiverTimeStamp = ({handleClose, careGiver, updateData}) => {

  let {authTokens} = useContext(AuthContext)

  let {clients} = useContext(ClientContext)
  
  let [searchClients, setSearchClients] = useState(null)

  let [selectedClient, setSelectedClient] = useState(null)

  const searchClient = () => {
    let search = document.getElementById('client_search').value
    setSearchClients(search)
  }

  const chooseClient = (pk) => {
    let data = clients.find(client => client.pk === pk)
    setSelectedClient(data)
  }

  const addTimeStamp = async (e) => {
    e.preventDefault()

    let response = await fetch(`${ServerAddress}/api/timestamp/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'caregiver_id': careGiver.pk, //fix to care giver selected
        'client_id': selectedClient.pk,
        'start_time': e.target.start_time.value,
        'end_time': e.target.end_time.value,
        'hourly_rate': e.target.hourly_rate.value,
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 201) {
      console.log('timestamp added')
      updateData()
      handleClose()
    } else {
      alert('something went wrong!')
    }
  }


  return (
    <Container>
      <Row>

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

          <Form onSubmit={addTimeStamp}>

            <Form.Group>
              <Form.Label>Caregiver</Form.Label>
              <Form.Control type="text" placeholder="Select a caregiver" disabled required 
                defaultValue={careGiver.full_name}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Control type="text" placeholder="Select a client" disabled required 
                defaultValue={selectedClient === null ? null : selectedClient.full_name}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control name="start_time" type="datetime-local" placeholder="Start of shift" required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control name="end_time" type="datetime-local" placeholder="End of shift" required/>
            </Form.Group>

            <Form.Group>
            <Form.Label>Hourly Rate</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control name="hourly_rate" type="number" placeholder="Rate per hour" step="0.01" defaultValue="0.50" required/>
              </InputGroup>
            </Form.Group>

            <Button type="submit">Submit</Button>

          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default CreateCareGiverTimeStamp