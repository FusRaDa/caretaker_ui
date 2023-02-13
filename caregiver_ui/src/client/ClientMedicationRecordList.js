import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import ServerAddress from "../utils/ServerAddress"
import { useLocation, useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import ClientMedicationListStyles from "./ClientMedicationStyles"
import AddClientMedicationRecord from "./AddClientMedicationRecord"
import EditClientMedicationRecord from "./EditClientMedicationRecord"



const ClientMedicationRecordList = () => {

  let {authTokens} = useContext(AuthContext)

  let {pk} = useParams()

  const {state} = useLocation()

  let [list, setList] = useState([])

  let [pageNum, setPageNum] = useState(localStorage.getItem('clientListPage') !== null ? localStorage.getItem('clientListPage') : 1)
  let [pageSize, setPageSize] = useState(localStorage.getItem('clientListSize') !== null ? localStorage.getItem('clientListSize') : 10)
  let [totalPages, setTotalPages] = useState(null)
  let [previous, setPrevious] = useState(null)
  let [next, setNext] = useState(null)

  let [updating, setUpdating] = useState(false)

  let [selectedMedRecord, setSelectedMedRecord] = useState(null)

  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  let [showE, setShowE] = useState(false);
  let handleCloseE = () => setShowE(false);
  let handleShowE = () => setShowE(true);


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
    setUpdating(false)
    // eslint-disable-next-line
  }, [pageNum, pageSize, updating])

  let getMonthName = (year, month) => {
    let date = new Date(year, month, 1);
    return date.toLocaleString('en-us', { month: 'long' })
  }

  let getFirstDayOfWeek = (w, y) => {
    let date = new Date(y, 0, (1 + (w-1) * 7)); // 1st of January + 7 days for each week
    let options = { month: 'short', day: 'numeric' }
    let sunday = new Date(date.setDate(date.getDate() + (0 - date.getDay()))).toLocaleDateString('en-US', options)
    return sunday
  }

  let getLastDayOfWeek = (w, y) => {
    let date = new Date(y, 0, (1 + (w-1) * 7)); // 1st of January + 7 days for each week
    let options = { month: 'short', day: 'numeric' }
    let saturday = new Date(date.setDate(date.getDate() + (0 - date.getDay()) + 6)).toLocaleDateString('en-US', options)
    return saturday
  }

  let editMedicationRecord = (medRecord) => {
    console.log(medRecord)
    setSelectedMedRecord(medRecord)
    handleShowE()
  }


  return (
    <ClientMedicationListStyles>
      <Container>
        <Row>
          <Col>
            <h3>{`${state.data.full_name}'s Medication Records`}</h3>
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
                  <tr key={t.pk} onClick={() => editMedicationRecord(t)}>
                    <td>
                      <Row>
                        <Col>
                          {
                          t.week_of_month_number === 1 ? 
                          `${getFirstDayOfWeek(t.week_number, t.year_number)} - ${getLastDayOfWeek(t.week_number, t.year_number)}` : 
                          
                          t.week_of_month_number === 2 ? 
                          `${getFirstDayOfWeek(t.week_number, t.year_number)} - ${getLastDayOfWeek(t.week_number, t.year_number)}` :

                          t.week_of_month_number === 3 ? 
                          `${getFirstDayOfWeek(t.week_number, t.year_number)} - ${getLastDayOfWeek(t.week_number, t.year_number)}` :

                          t.week_of_month_number === 4 ? 
                          `${getFirstDayOfWeek(t.week_number, t.year_number)} - ${getLastDayOfWeek(t.week_number, t.year_number)}` :

                          t.week_of_month_number === 5 ? 
                          `${getFirstDayOfWeek(t.week_number, t.year_number)} - ${getLastDayOfWeek(t.week_number, t.year_number)}` :

                          `${getFirstDayOfWeek(t.week_number, t.year_number)} - ${getLastDayOfWeek(t.week_number, t.year_number)}`
                          }
                        </Col>

                        <Col>
                          {
                          t.week_of_month_number === 1 ? 
                          `1st Week of ${getMonthName(t.year_number, t.month_number)} ${t.year_number}` : 
                          
                          t.week_of_month_number === 2 ? 
                          `2nd Week of ${getMonthName(t.year_number, t.month_number)} ${t.year_number}` :

                          t.week_of_month_number === 3 ? 
                          `3rd Week of ${getMonthName(t.year_number, t.month_number)} ${t.year_number}` :

                          t.week_of_month_number === 4 ? 
                          `4th Week of ${getMonthName(t.year_number, t.month_number)} ${t.year_number}` :

                          t.week_of_month_number === 5 ? 
                          `5th Week of ${getMonthName(t.year_number, t.month_number)} ${t.year_number}` :

                          `6th Week of ${getMonthName(t.year_number, t.month_number)} ${t.year_number}`
                          }
                        </Col>
                      </Row>
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
          fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Weekly Medication Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddClientMedicationRecord 
              client={state.data} 
              handleClose={handleClose} 
              setUpdating={setUpdating}/>
          </Modal.Body>
        </Modal>

        <Modal
          show={showE}
          onHide={handleCloseE}
          onExited={() => setSelectedMedRecord(null)}
          backdrop="static"
          fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Weekly Medication Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditClientMedicationRecord 
              client={state.data} 
              selectedMedRecord={selectedMedRecord}
              handleClose={handleCloseE} 
              setUpdating={setUpdating}/>
          </Modal.Body>
        </Modal>

      </Container>
    </ClientMedicationListStyles>
  )
}

export default ClientMedicationRecordList