import { useCallback, useContext, useEffect, useState } from "react"

import TimeStampContext from "../context/TimeStampContext"
import TimeStampTable from "./TimeStampTable"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"


const TimeStamps = () => {

  let {timeStamps, setUpdating} = useContext(TimeStampContext)
  let [data, setData] = useState([])

  let fetchData = useCallback(() => {

    if (Object.keys(timeStamps).length !== 0) {
      setData(timeStamps.results)
    }

  }, [timeStamps])

  const columns = [
    {
      Header: 'Caregiver',
      accessor: 'caregiver.full_name',
    },
    {
      Header: 'Client',
      accessor: 'client.full_name',
    },
    {
      Header: 'Start Time',
      accessor: 'start_time',
    },
    {
      Header: 'End Time',
      accessor: 'end_time',
    },
    {
      Header: 'Total Hours',
      accessor: 'total_hours',
    },
    {
      Header: 'Hourly Rate',
      accessor: 'hourly_rate',
    },
    {
      Header: 'Compensation',
      accessor: 'compensation',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
          />
        </Col>
      </Row>
    </Container>
   
  )
}

export default TimeStamps