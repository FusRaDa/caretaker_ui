import { useCallback, useContext, useState } from "react"
import { useParams } from "react-router-dom"

//styles
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';

//table components
import SelectColumnFilter from "../timestamp/SelectColumnFilter"
import CareGiverTimeStampTable from "./CareGiverTimeStampTable"
import ServerAddress from "../utils/ServerAddress"
import AuthContext from "../context/AuthContext"


const CareGiverTimeStamps = () => {

  let {pk} = useParams()
  let {authTokens} = useContext(AuthContext)

  let [data, setData] = useState([])
 
  let [careGiverTimeStamps, setCareGiverTimeStamps] = useState([])

  //pagination
  let [totalPages, setTotalPages] = useState(0)
  let [loading, setLoading] = useState(0)

  //modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  let getCareGiverTimeStamps = async (pk, index, size) => {

    if (index === null) {
      index = 1
    }
    if (size === null) {
      size = 50
    }

    let response = await fetch(`${ServerAddress}/api/timestamp/${pk}/?p=${index + 1}&page_size=${size}/`, {
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
      setCareGiverTimeStamps(data)
    }
  }

  let changePage = (pageIndex, pageSize) => {
    getCareGiverTimeStamps(pk, pageIndex, pageSize)
  }

  let fetchData = useCallback(() => {

    setLoading(true)

    if (Object.keys(careGiverTimeStamps).length !== 0) {
      setData(careGiverTimeStamps.results)
      setTotalPages(careGiverTimeStamps.total_pages)
      setLoading(false)
    }

  }, [careGiverTimeStamps])

  const columns = [
    {
      Header: 'Caregiver',
      accessor: 'caregiver.full_name',
      Filter: SelectColumnFilter,
      filter: 'includes',
      disableSortBy: true,
    },
    {
      Header: 'Client',
      accessor: 'client.full_name',
      Filter: SelectColumnFilter,
      filter: 'includes',
      disableSortBy: true,
    },
    {
      Header: 'Start Time',
      accessor: 'start_time',
      disableFilters: true,
    },
    {
      Header: 'End Time',
      accessor: 'end_time',
      disableFilters: true,
    },
    {
      Header: 'Total Hours',
      accessor: 'total_hours',
      disableFilters: true,
    },
    {
      Header: 'Hourly Rate',
      accessor: 'hourly_rate',
      disableFilters: true,
    },
    {
      Header: 'Compensation',
      accessor: 'compensation',
      disableFilters: true,
    },
    {
      Header: 'Status',
      accessor: 'status',
      Filter: SelectColumnFilter,
      filter: 'includes',
      disableSortBy: true,
    },
    {
      Header: 'pk',
      accessor: 'pk',
    },
  ]
 
  return (
    <Container>

      <Row>
        <Col>
          <Button onClick={handleShow}>Add Timestamp</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <CareGiverTimeStampTable 
          columns={columns}
          data={data}
          fetchData={fetchData}
          changePage={changePage}
          loading={loading}
          totalPages={totalPages}
          />
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Timestamp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          create a timestamp for care giver!
        </Modal.Body>
      </Modal>

    </Container>
   
  )
}

export default CareGiverTimeStamps