import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import ServerAddress from "../utils/ServerAddress"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ClientMedicationStyles from "./ClientMedicationStyles"
import { useParams } from "react-router-dom"


const ClientMedication = () => {

  let {authTokens} = useContext(AuthContext)

  let {pk} = useParams()

  let getClientMeds = async () => {
    let response = await fetch(`${ServerAddress}/api/client/`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    .catch(() => {
      console.log('server failed')
    })

    let data = await response.json()
    if (response.status === 200) {
      console.log(data)
    } else {
      console.log('initialize')
    }
  }


  return (
    <ClientMedicationStyles>
      <Container className="container">
        <Row>
          <Col>
            <h2></h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <table>
              <thead>
                <tr>
                  <th className="medication">Medication</th>
                  <th>Sunday</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <th className="medication">Med 1</th>
                  <td><input type="checkbox"/></td>
                  <td><input type="checkbox"/></td>
                  <td><input type="checkbox"/></td>
                  <td><input type="checkbox"/></td>
                  <td><input type="checkbox"/></td>
                  <td><input type="checkbox"/></td>
                  <td><input type="checkbox"/></td>
                </tr>

              </tbody>
            
            </table>
          </Col>
        </Row>

      </Container>
    </ClientMedicationStyles>
  )
}

export default ClientMedication