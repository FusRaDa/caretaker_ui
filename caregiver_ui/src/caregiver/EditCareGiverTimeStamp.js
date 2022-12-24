import { useContext, useState } from "react";

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
import TimeStampContext from "../context/TimeStampContext";
import ConfirmDeleteCGTS from "../utils/ConfirmDeleteCGTS";
import Modal from 'react-bootstrap/Modal';


const EditCareGiverTimeStamp = ({data, handleClose, updateData}) => {

  let {authTokens} = useContext(AuthContext)
  let {setUpdatingTimeStamps} = useContext(TimeStampContext)
  let {clients} = useContext(ClientContext)
  
  let [searchClients, setSearchClients] = useState(null)

  let [selectedClient, setSelectedClient] = useState(data.client)

  //modal
  let [show, setShow] = useState(false);
  let handleCloseDel = () => setShow(false);
  let handleShowDel = () => setShow(true);

  const searchClient = () => {
    let search = document.getElementById('client_search').value
    setSearchClients(search)
  }

  const chooseClient = (pk) => {
    let data = clients.find(client => client.pk === pk)
    setSelectedClient(data)
  }

  const editCareGiverTimeStamp = async (e) => {
    e.preventDefault()

    let response = await fetch(`${ServerAddress}/api/timestamp/${data.pk}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'caregiver_id': data.caregiver.pk, //fix to care giver selected
        'client_id': selectedClient.pk,
        'start_time': e.target.start_time.value,
        'end_time': e.target.end_time.value,
        'hourly_rate': e.target.hourly_rate.value,
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 200) {
      setUpdatingTimeStamps(true)
      updateData()
      handleClose()
    } else {
      alert('something went wrong!')
    }
  }

  let formatDateTime = (datetime) => {

    let date = new Date(datetime).toDateString()
    let stringDate = new Date(date)

    let year = stringDate.getFullYear()
    let month = stringDate.getMonth() + 1
    if (month < 10) {
      month = "0" + month
    }
    let day = stringDate.getDate()
    if (day < 10) {
      day = "0" + day
    }

    let time = new Date(datetime).toTimeString()
    let dtlFormat = `${year}-${month}-${day}T${time}`
    let finalFormat = dtlFormat.split(" ")
    
    return finalFormat[0]
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

          <Form onSubmit={editCareGiverTimeStamp}>

            <Form.Group>
              <Form.Label>Caregiver</Form.Label>
              <Form.Control type="text" placeholder="Select a caregiver" disabled required 
                defaultValue={data.caregiver.full_name}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Control type="text" placeholder="Select a client" disabled required 
                value={selectedClient === null ? null : selectedClient.full_name}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control name="start_time" type="datetime-local" placeholder="Start of shift" required defaultValue={formatDateTime(data.start_time)}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control name="end_time" type="datetime-local" placeholder="End of shift" required defaultValue={formatDateTime(data.end_time)}/>
            </Form.Group>

            <Form.Group>
            <Form.Label>Hourly Rate</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control name="hourly_rate" type="number" placeholder="Rate per hour" step="0.01" defaultValue="0.50" required/>
              </InputGroup>
            </Form.Group>
            
            <Button variant="danger" onClick={() => handleShowDel()}>Delete</Button>
            <Button style={{float: 'right'}} type="submit">Submit</Button>

          </Form>

        </Col>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ConfirmDeleteCGTS pk={data.pk} handleCloseDel={handleCloseDel} handleClose={handleClose} updateData={updateData}/>
          </Modal.Body>
        </Modal>

      </Row>
    </Container>
  )
}

export default EditCareGiverTimeStamp