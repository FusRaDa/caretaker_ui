import { useCallback, useContext, useState } from "react"

import TimeStampContext from "../context/TimeStampContext"
import TimeStampTable from "./TimeStampTable"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"

//table components
import SelectColumnFilter from "./SelectColumnFilter"


const TimeStamps = () => {

  let {timeStamps, setUpdating, setPageNum, setPageSize} = useContext(TimeStampContext)
  let [data, setData] = useState([])
  let [totalPages, setTotalPages] = useState(0)

  let [loading, setLoading] = useState(0)

  let changePage = (pageIndex, pageSize) => {
    setPageNum(pageIndex + 1)
    setPageSize(pageSize)
    setUpdating(true)
  }

  let fetchData = useCallback(() => {

    setLoading(true)

    if (Object.keys(timeStamps).length !== 0) {
      setData(timeStamps.results)
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
          <TimeStampTable 
          columns={columns}
          data={data}
          fetchData={fetchData}
          changePage={changePage}
          loading={loading}
          totalPages={totalPages}
          />
        </Col>
      </Row>
    </Container>
   
  )
}

export default TimeStamps