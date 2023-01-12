
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import './welcome.css'
import ProjectDisplay from "./ProjectDisplay"
import WelcomStyles from "./WelcomeStyles"

const Welcome = () => {
  return (
    <Container>

      <WelcomStyles>
        <Row>
          <Col>
            <h1>Caregiver Timestamps Project</h1>
            <h5>By: Matthew Rada</h5>
          </Col>
        </Row>

        <Row className="project_goal">
          <Col>
            <h6>Goal of Project</h6>
          </Col>
        </Row>

        <Row>
          <Col className="para">
            <p>
              I made this project with the purpose of helping my mom manage her caregiving duties.
              This web application assists with keeping track of work hours done by caregivers who work with my mom. 
              The final result is to create a record of weekly activities and to calculate the total compensation.
            </p>
          </Col>
        </Row>
      </WelcomStyles>

      <ProjectDisplay/>

      
    </Container>
  )
}

export default Welcome