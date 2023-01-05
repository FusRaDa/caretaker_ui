import { useCallback, useContext, useState, useEffect } from "react"

import TimeStampContext from "../context/TimeStampContext"
import TimeStampTable from "./TimeStampTable"

import CreateTimeStamp from "./CreateTimeStamp"
import ClientContext from "../context/ClientContext"
import CareGiverContext from "../context/CareGiverContext"

//table components
import SelectColumnFilter from "./SelectColumnFilter"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form';


const TimeStamps = () => {

  let {timeStamps, setUpdatingTimeStamps, setPageNum, setPageSize, status, setStatus} = useContext(TimeStampContext)
  let [data, setData] = useState([])
  let [allResults, setAllResults] = useState(0)

  let [resetPage, setResetPage] = useState(false)

  let {setUpdatingClients} = useContext(ClientContext)
  let {setUpdatingCareGivers} = useContext(CareGiverContext)

  //pagination
  let [totalPages, setTotalPages] = useState(0)
  let [loading, setLoading] = useState(false)
  
  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  //initialize
  useEffect(() => {
    setUpdatingCareGivers(true)
    setUpdatingClients(true)
    // eslint-disable-next-line
  }, [])

  let changePage = (pageIndex, pageSize) => {
    setPageNum(pageIndex + 1) //pageIndex starts at 0 by default
    setPageSize(pageSize)
    setUpdatingTimeStamps(true)
  }

  let changeStatus = (e) => {
    setStatus(e.target.value)
    setPageNum(1)
    setUpdatingTimeStamps(true)
    setResetPage(true)
  }

  let fetchData = useCallback(() => {

    setLoading(true)

    if (Object.keys(timeStamps).length !== 0) {
      setData(timeStamps.results)
      setAllResults(timeStamps.count)
      setTotalPages(timeStamps.total_pages)
      setLoading(false)
    }

  }, [timeStamps])


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
      // Filter: SelectColumnFilter,
      // filter: 'includes',
      disableFilters: true,
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
          <h2>All Timestamps Records</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button onClick={handleShow}>Add Timestamp</Button>
        </Col>

        <Col>
          <Form.Select onChange={(e) => changeStatus(e)}>
      
            {status === 'IN_PROCESS' && <>
              <option value='IN_PROCESS'>Awaiting Timestamps</option>
              <option value='ALL'>All Timestamps</option>
              <option value='PROCESSED'>Processed Timestamps</option>
            </>}

            {status === 'PROCESSED' && <>
              <option value='PROCESSED'>Processed Timestamps</option>
              <option value='IN_PROCESS'>Awaiting Timestamps</option>
              <option value='ALL'>All Timestamps</option>
            </>}

            {status === 'ALL' && <>
              <option value='ALL'>All Timestamps</option>
              <option value='IN_PROCESS'>Awaiting Timestamps</option>
              <option value='PROCESSED'>Processed Timestamps</option>
            </>}

          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col>
          <TimeStampTable 
            columns={columns}
            data={data}
            fetchData={fetchData}
            changePage={changePage}
            loading={loading}
            totalPages={totalPages}
            allResults={allResults}
            resetPage={resetPage}
            setResetPage={setResetPage}
            status={status}
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
          <CreateTimeStamp handleClose={handleClose}/>
        </Modal.Body>
      </Modal>

    </Container>
   
  )
}

export default TimeStamps