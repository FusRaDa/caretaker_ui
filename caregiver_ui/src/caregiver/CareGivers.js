import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

//context
import CareGiverContext from "../context/CareGiverContext"

//styles
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import EditCareGiver from "./EditCareGiver";
import CreateCareGiver from "./CreateCareGiver";
import Modal from 'react-bootstrap/Modal';


const Caregivers = () => {

  const navigate = useNavigate()

  let {careGivers, setUpdatingCareGivers} = useContext(CareGiverContext)

  let [searchCareGivers, setSearchCareGivers] = useState(null)
  let [selectedCareGiver, setSelectedCareGiver] = useState(null)

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
    setUpdatingCareGivers(true)
    // eslint-disable-next-line
  }, [])

  let chooseCareGiver = (pk) => {
    let data = careGivers.find(cg => cg.pk === pk)
    setSelectedCareGiver(data)
  }

  const searchCareGiver = () => {
    let search = document.getElementById('caregiver_search').value
    setSearchCareGivers(search)
  }


  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={handleShow}>Add Caregiver</Button>
        </Col>
        <Col>
          {selectedCareGiver !== null && <Button onClick={handleShowE}>{`Edit ${selectedCareGiver.full_name}'s Information`}</Button>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
          <Card.Header>List of Caregivers</Card.Header>
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
          </Card>
        </Col>
        
        <Col>
          <Card>
          <Card.Header>{selectedCareGiver !== null ? `${selectedCareGiver.full_name}'s Information` : "Select a Caregiver"}</Card.Header>
            <ListGroup>
              <ListGroup.Item>First Name: {selectedCareGiver !== null ? selectedCareGiver.first_name : null}</ListGroup.Item>
              <ListGroup.Item>Last Name: {selectedCareGiver !== null ? selectedCareGiver.last_name : null}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {selectedCareGiver !== null ? selectedCareGiver.phone_number : null}</ListGroup.Item>
            </ListGroup>
              {selectedCareGiver !== null && 
              <Button onClick={() => navigate(`/caregivers/${selectedCareGiver.pk}`)}>
              {`View ${selectedCareGiver.full_name}'s Timestamps`}
              </Button>}
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
          <Modal.Title>Add Caregiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCareGiver handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showE}
        onHide={handleCloseE}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Caregiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCareGiver handleCloseE={handleCloseE} selectedCareGiver={selectedCareGiver}/>
        </Modal.Body>
      </Modal>

    </Container>
  )
}

export default Caregivers