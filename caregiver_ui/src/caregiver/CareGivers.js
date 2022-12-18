import { useContext, useState } from "react"
import CareGiverContext from "../context/CareGiverContext"

//styles
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const Caregivers = () => {

  let {careGivers} = useContext(CareGiverContext)

  let [searchCareGivers, setSearchCareGivers] = useState(null)
  let [selectedCareGiver, setSelectedCareGiver] = useState(null)

  let chooseCareGiver = () => {
    let data = careGivers.results.find(cg => cg.pk === pk)
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
              {careGivers.results
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
          <Card.Header>{`${selectedCareGiver.full_name}'s Information`}</Card.Header>
            <ListGroup>
              <ListGroup.Item>First Name: {selectedCareGiver.first_name}</ListGroup.Item>
              <ListGroup.Item>Last Name: {selectedCareGiver.last_name}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {selectedCareGiver.phone_number}</ListGroup.Item>
            </ListGroup>
            <Button>{`View ${selectedCareGiver.full_name}'s Timestamps`}</Button>
          </Card>
        </Col>

      </Row>
    </Container>
  )

  

}

export default Caregivers