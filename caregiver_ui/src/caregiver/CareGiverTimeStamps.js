import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

//styles
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

//table components
import SelectColumnFilter from "../timestamp/SelectColumnFilter"
import CareGiverTimeStampTable from "./CareGiverTimeStampTable"
import ServerAddress from "../utils/ServerAddress"
import AuthContext from "../context/AuthContext"
import CreateCareGiverTimeStamp from "./CreateCareGiverTimeStamp"


const CareGiverTimeStamps = () => {

  const navigate = useNavigate()

  let {pk} = useParams()
  let {authTokens} = useContext(AuthContext)

  let [data, setData] = useState([])
  let [careGiver, setCareGiver] = useState([])
  let [careGiverTimeStamps, setCareGiverTimeStamps] = useState([])
  let [status, setStatus] = useState("IN_PROCESS")
  let [pageNotFound, setPageNotFound] = useState(false)
  let [resetPage, setResetPage] = useState(false)

  let [currentPageIndex, setCurrentPageIndex] = useState(localStorage.getItem(`caregiverPageIndex/${pk}`) !== null ? +localStorage.getItem(`caregiverPageIndex/${pk}`) : 0)
  let [currentPageSize, setCurrentPageSize] = useState(localStorage.getItem(`caregiverPageSize/${pk}`) !== null ? +localStorage.getItem(`caregiverPageSize/${pk}`): 10)

  //pagination
  let [totalPages, setTotalPages] = useState(0)
  let [loading, setLoading] = useState(0)
  let [count, setCount] = useState(0)

  //modal
  let [show, setShow] = useState(false)
  let handleClose = () => setShow(false)
  let handleShow = () => setShow(true)

  let getCareGiverTimeStamps = async (index, size) => {

    let response = await fetch(`${ServerAddress}/api/timestamp/caregiver/${pk}/${status}/?p=${index + 1}&page_size=${size}`, {
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
      setCareGiverTimeStamps(data)
    }
    
    // if page is not found just go to first page
    if (response.status === 404) {
      setPageNotFound(true)
    }
  }

  let getCareGiver = async () => {
    let response = await fetch(`${ServerAddress}/api/caregiver/${pk}/`, {
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
      setCareGiver(data)
    }
  }

  useEffect(() => {
    getCareGiver()
    // eslint-disable-next-line
  }, [])

  //get data when status changes
  useEffect(() => {
    getCareGiverTimeStamps(0, currentPageSize)
    setCurrentPageIndex(0)
    // eslint-disable-next-line
  }, [status])

  let changeStatus = (e) => {
    setResetPage(true)
    setStatus(e.target.value)
  }

  // function updates table when data/row is edited
  let updateData = () => {
    getCareGiverTimeStamps(currentPageIndex, currentPageSize)
  }

  //get data when page/page size changes
  let changePage = (pageIndex, pageSize) => {
    getCareGiverTimeStamps(pageIndex, pageSize)
    setCurrentPageIndex(pageIndex)
    setCurrentPageSize(pageSize)
  }

  let fetchData = useCallback(() => {

    setLoading(true)

    if (Object.keys(careGiverTimeStamps).length !== 0) {
      setData(careGiverTimeStamps.results)
      setTotalPages(careGiverTimeStamps.total_pages)
      setCount(careGiverTimeStamps.count)
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
      Cell: props => <div>{`${new Date(props.value).toLocaleDateString('en-US', {weekday: 'long'})} ${props.value}`}</div>
    },
    {
      Header: 'End Time',
      accessor: 'end_time',
      disableFilters: true,
      Cell: props => <div>{`${new Date(props.value).toLocaleDateString('en-US', {weekday: 'long'})} ${props.value}`}</div>
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
      Cell: props => <div>{`$${props.value}`}</div>
    },
    {
      Header: 'Compensation',
      accessor: 'compensation',
      disableFilters: true,
      Cell: props => <div>{`$${props.value}`}</div>
    },
    {
      Header: 'Status',
      accessor: 'status',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'pk',
      accessor: 'pk',
    },
  ]

  let addTimestamp = () => {
    handleShow()
  }


  return (
    <Container>

      <Row>
        <Col>
          <h3>{`${careGiver.full_name}'s Timestamps`}</h3>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="warning" onClick={() => navigate('/caregivers')}>View Caregivers</Button>
        </Col>

        <Col>
          <Form.Select onChange={(e) => changeStatus(e)}>
            <option value='IN_PROCESS'>Viewing Awaiting Timestamps</option>
            <option value='ALL'>Viewing All Timestamps</option>
            <option value='PROCESSED'>Viewing Processed Timestamps</option>
          </Form.Select>
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
          pk={pk}
          updateData={updateData}
          careGiver={careGiver}
          addTimestamp={addTimestamp}
          count={count}
          status={status}
          pageNotFound={pageNotFound}
          setPageNotFound={setPageNotFound}
          resetPage={resetPage}
          setResetPage={setResetPage}
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
          <CreateCareGiverTimeStamp handleClose={handleClose} careGiver={careGiver} updateData={updateData}/>
        </Modal.Body>
      </Modal>

    </Container>
  )
}

export default CareGiverTimeStamps