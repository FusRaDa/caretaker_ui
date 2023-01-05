import { useNavigate } from "react-router-dom"

import caregiverImage from "./images/caregiver_image.jpg"
import clientImage from "./images/client.png"
import timestampImage from "./images/timestamp.jpg"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import HomeStyles from "./HomeStyles"


const Home = () => {

  const navigate = useNavigate()

  return (
    <HomeStyles>
      <Container className="container">

        <Row>
          <Col className="title">
            <h3>Caregiver Project Home</h3>
          </Col>
        </Row>

        <Row className="headers">
          <Col>
            <h4>Caregivers</h4>
          </Col>

          <Col>
            <h4>Clients</h4>
          </Col>

          <Col>
            <h4>All Timestamps</h4>
          </Col>
        </Row>

        <Row>
          <Col>
            <img onClick={() => navigate('/caregivers')} className="home_images1" alt="caregiver_img" src={caregiverImage}/>
          </Col>

          <Col>
            <img onClick={() => navigate('/clients')} className="home_images2" alt="client_img" src={clientImage}/>
          </Col>

          <Col>
            <img onClick={() => navigate('/timestamps')} className="home_images3" alt="timestamp_img" src={timestampImage}/>
          </Col>
        </Row>

      </Container>
    </HomeStyles>
  )
}

export default Home