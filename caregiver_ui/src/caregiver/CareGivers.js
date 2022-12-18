import { useContext, useEffect, useState } from "react"
import CareGiverContext from "../context/CareGiverContext"

//styles
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


const Caregivers = () => {

  const navigate = useNavigate()

  let {careGivers} = useContext(CareGiverContext)

  let [searchCareGivers, setSearchCareGivers] = useState(null)
  let [selectedCareGiver, setSelectedCareGiver] = useState(null)

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
    </Container>
  )
}

export default Caregivers