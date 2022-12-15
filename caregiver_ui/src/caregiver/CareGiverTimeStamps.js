import { useCallback, useContext, useState } from "react"

//styles
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"

//context
import TimeStampContext from "../context/TimeStampContext"

//table components
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';
import CareGiverTimeStampTable from "../timestamp/CareGiverTimeStampTable"
import SelectColumnFilter from "../timestamp/SelectColumnFilter"


const CareGiverTimeStamps = () => {

  let [data, setData] = useState([])
  let {getCareGiverTimeStamps, careGiverTimeStamps} = useContext(TimeStampContext)

  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(10)

  //pagination
  let [totalPages, setTotalPages] = useState(0)
  let [loading, setLoading] = useState(0)

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let changePage = (pageIndex, pageSize) => {
    setPageNum(pageIndex + 1) //pageIndex starts at 0 by default
    setPageSize(pageSize)
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