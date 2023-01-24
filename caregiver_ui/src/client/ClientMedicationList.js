import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import ServerAddress from "../utils/ServerAddress"
import { useLocation, useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ClientMedicationListStyles from "./ClientMedicationListStyles"


const ClientMedicationList = () => {

  let {authTokens} = useContext(AuthContext)

  let {pk} = useParams()

  const {state} = useLocation()

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
    // eslint-disable-next-line
  }, [])


  return (
    <ClientMedicationListStyles>
      <Container>
        <Row>
          <Col>
            <h2>{`${state.data}'s Medication Records`}</h2>
          </Col>
          <Col>
            <Button className="add_button">Add Medication Record</Button>
          </Col>
        </Row>

        <Row>
          <Col>

            <table>
              <thead>
                <tr>
                  <th>Weekly Medication Record</th>
                </tr>
              </thead>

              <tbody>

                {list.map(t => (
                  <tr key={t.pk}>
                    <td>
                    {
                      t.week_number === 1 ? `1st Week of ${t.month_name}-${t.year_name}` : 
                      t.week_number === 2 ? `2nd Week of ${t.month_name}-${t.year_name}` :
                      t.week_number === 3 ? `3rd Week of ${t.month_name}-${t.year_name}` :
                      `4th week of ${t.month_name}-${t.year_name}` 
                    }
                    </td>
                  </tr>
                ))}

              </tbody>

              
            
            </table>
          </Col>
        </Row>
      </Container>
    </ClientMedicationListStyles>
  )
}

export default ClientMedicationList