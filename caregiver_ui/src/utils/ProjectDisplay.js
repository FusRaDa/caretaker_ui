import { useState } from "react"

import step1 from "../images/step1.PNG"
import step2 from "../images/step2.PNG"
import step3 from "../images/step3.PNG"
import step4 from "../images/step4.PNG"
import step5 from "../images/step5.PNG"
import step6 from "../images/step6.PNG"
import step7 from "../images/step7.PNG"
import step8 from "../images/step8.PNG"
import step9 from "../images/step9.PNG"
import step10 from "../images/step10.PNG"
import step11 from "../images/step11.PNG"
import step12 from "../images/step12.PNG"
import step13 from "../images/step13.PNG"

import ProjectDisplayStyles from "./ProjectDisplayStyles"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel';


const ProjectDisplay = () => {

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <ProjectDisplayStyles>
      <Container>

        <Card>

          {index === 0 && <Card.Body>
            <Card.Title>Step 1: Home Page </Card.Title>
            <Card.Text>
              The home page allows the user to view a list of caregivers, clients, and timestamps.
            </Card.Text>
          </Card.Body>}

          {index === 1 && <Card.Body>
            <Card.Title>Step 2: View Clients</Card.Title>
            <Card.Text>
              User may add a client, edit a client's info, and view further details. This same process applies to caregivers.
            </Card.Text>
          </Card.Body>}

          {index === 2 && <Card.Body>
            <Card.Title>Step 3: View Caregivers</Card.Title>
            <Card.Text>
              When viewing caregivers, the user may view their hours as well as add and modify them. In this case we are viewing Melissa Yulo's timestamps.
            </Card.Text>
          </Card.Body>}

          {index === 3 && <Card.Body>
            <Card.Title>Step 4: Add Timestamp</Card.Title>
            <Card.Text>
              User can then add a timestamp indicating who the client is, time in/out, and hourly rate charged.
            </Card.Text>
          </Card.Body>}

          {index === 4 && <Card.Body>
            <Card.Title>Step 5: Process Timestamps</Card.Title>
            <Card.Text>
              User can make as many records as needed for the week.
            </Card.Text>
          </Card.Body>}

          {index === 5 && <Card.Body>
            <Card.Title>Step 6: Process Timestamps</Card.Title>
            <Card.Text>
              User can then select timestamps to process.
            </Card.Text>
          </Card.Body>}

          {index === 6 && <Card.Body>
            <Card.Title>Step 7: Preview and Confirm</Card.Title>
            <Card.Text>
              A preview is created and confirmation is needed.
            </Card.Text>
          </Card.Body>}

          {index === 7 && <Card.Body>
            <Card.Title>Step 8: Additional Information</Card.Title>
            <Card.Text>
              User can then add additional information and after confirming results, a record is created. 
            </Card.Text>
          </Card.Body>}

          {index === 8 && <Card.Body>
            <Card.Title>Step 9: View Records</Card.Title>
            <Card.Text>
              After creating a record, it is added to a list to identify if compensation was recieved.
            </Card.Text>
          </Card.Body>}

          {index === 9 && <Card.Body>
            <Card.Title>Step 10: View a Record</Card.Title>
            <Card.Text>
              User can then access the created record.
            </Card.Text>
          </Card.Body>}

          {index === 10 && <Card.Body>
            <Card.Title>Step 11: Update Record</Card.Title>
            <Card.Text>
              User can then update that compensation has been recieved as well as print the document if needed.
            </Card.Text>
          </Card.Body>}

          {index === 11 && <Card.Body>
            <Card.Title>Step 12: Record Updated</Card.Title>
            <Card.Text>
              Compensation has been recieved, user can then update the record.
            </Card.Text>
          </Card.Body>}

          {index === 12 && <Card.Body>
            <Card.Title>Step 13: View All Timestamps</Card.Title>
            <Card.Text>
              All timestamps can be viewed and reviewed for the convenience of the user.
            </Card.Text>
          </Card.Body>}

          <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" interval={null}>

            <Carousel.Item>
              <img
                className="image"
                src={step1}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step2}
                alt="Second slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step3}
                alt="Third slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step4}
                alt="TFourth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step5}
                alt="Fifth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step6}
                alt="Sixth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step7}
                alt="Seventh slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step8}
                alt="Eighth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step9}
                alt="Ninth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step10}
                alt="Tenth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step11}
                alt="Eleventh slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step12}
                alt="Twelvth slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="image"
                src={step13}
                alt="Thirteenth slide"
              />
            </Carousel.Item>

          </Carousel>

        </Card>

      </Container>
    </ProjectDisplayStyles>
  )

}

export default ProjectDisplay