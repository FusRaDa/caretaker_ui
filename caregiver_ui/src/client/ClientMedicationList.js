import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import ServerAddress from "../utils/ServerAddress"
import { useLocation, useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import ClientMedicationListStyles from "./ClientMedicationListStyles"
import AddClientMedicationRecord from "./AddClientMedicationRecord"


const ClientMedicationList = () => {

  let {authTokens} = useContext(AuthContext)

  let {pk} = useParams()

  const {state} = useLocation()

  let [list, setList] = useState([])

  let [pageNum, setPageNum] = useState(localStorage.getItem('clientListPage') !== null ? localStorage.getItem('clientListPage') : 1)
  let [pageSize, setPageSize] = useState(localStorage.getItem('clientListSize') !== null ? localStorage.getItem('clientListSize') : 10)
  let [totalPages, setTotalPages] = useState(null)
  let [previous, setPrevious] = useState(null)
  let [next, setNext] = useState(null)

  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  let getClientMeds = async () => {
    let response = await fetch(`${ServerAddress}/api/client_medication/${pk}/?p=${pageNum}&page_size=${pageSize}`, {
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
      setList(data.results)
      setTotalPages(data.total_pages)
      setPrevious(data.links.previous)
      setNext(data.links.next)
    } else {
      console.log('initialize')
    }
  }

  useEffect(() => {
    getClientMeds()
    // eslint-disable-next-line
  }, [pageNum, pageSize])

  let getMonthName = (monthNumber) => {
    let date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', { month: 'long' });
  }


  return (
    <ClientMedicationListStyles>
      <Container>
        <Row>
          <Col>
            <h2>{`${state.data}'s Medication Records`}</h2>
          </Col>
          <Col>
            <Button className="add_button" onClick={handleShow}>Add Medication Record</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <table>

              <thead>
                <tr>
                  <th>
                    <Row>
                      <Col>
                        Weekly Medication Records
                      </Col>
                      <Col>
                        <button 
                          className="page_button" 
                          disabled={previous !== "null" ? true : false} 
                          onClick={() => setPageNum(pageNum - 1)}>
                          {"<"}
                        </button>
                        {`Page ${pageNum} of ${totalPages}`}
                        <button 
                          className="page_button" 
                          disabled={next !== "null" ? true : false} 
                          onClick={() => setPageNum(pageNum + 1)}>
                          {">"}
                        </button>
                      </Col>
                      <Col>
                        Page Size: 
                        <select 
                          className="select_pagesize"
                          onChange={(e) => setPageSize(e.target.value)}>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                          <option value={40}>40</option>
                          <option value={50}>50</option>
                        </select>
                      </Col>
                    </Row>
                  </th>
                </tr>
              </thead>

              <tbody>
                {list.map(t => (
                  <tr key={t.pk}>
                    <td>
                    {
                      t.week_number === 1 ? `1st Week of ${getMonthName(t.month_number)}-${t.year_number}` : 
                      t.week_number === 2 ? `2nd Week of ${getMonthName(t.month_number)}-${t.year_number}` :
                      t.week_number === 3 ? `3rd Week of ${getMonthName(t.month_number)}-${t.year_number}` :
                      `4th week of ${getMonthName(t.month_number)}}-${t.year_name}` 
                    }
                    </td>
                  </tr>
                ))}
              </tbody>

        

            </table>
          </Col>
        </Row>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Weekly Medication Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddClientMedicationRecord/>
          </Modal.Body>
        </Modal>

      </Container>
    </ClientMedicationListStyles>
  )
}

export default ClientMedicationList