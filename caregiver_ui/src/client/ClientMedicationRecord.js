import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import ServerAddress from "../utils/ServerAddress"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ClientMedicationRecordStyles from "./ClientMedicationRecordStyles"
import Button from "react-bootstrap/Button"


const ClientMedicationRecord = () => {

  let {authTokens} = useContext(AuthContext)

  let [list, setList] = useState([])

  let getClientMeds = async () => {
    let response = await fetch(`${ServerAddress}/api/client_medication/${pk}/`, {
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
      setList(data)
    } else {
      console.log('initialize')
    }
  }

  useEffect(() => {
    getClientMeds()
    console.log('hi')
  }, [])

  return (
    <ClientMedicationRecordStyles>
      <Container className="container">
        <Row>
          <Col>
            <h2>{`${state.data}'s Medication Records`}</h2>
          </Col>
          <Col>
            <Button className="add_button">adsf</Button>
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

                {list.map(t => (
                  <tr key={t.pk}>
                    <th className="medication"></th>
                    <td><input type="checkbox"/></td>
                    <td><input type="checkbox"/></td>
                    <td><input type="checkbox"/></td>
                    <td><input type="checkbox"/></td>
                    <td><input type="checkbox"/></td>
                    <td><input type="checkbox"/></td>
                    <td><input type="checkbox"/></td>
                  </tr>
                ))}

              </tbody>

              
            
            </table>
          </Col>
        </Row>

      </Container>
    </ClientMedicationRecordStyles>
  )
}

export default ClientMedicationRecord