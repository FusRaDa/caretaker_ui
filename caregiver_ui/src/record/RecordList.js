import { useContext, useState } from "react"
import RecordContext from "../context/RecordContext"

//styles
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"


const RecordList = () => {

  let {records, setUpdatingRecords, setPageSize, setPageNum} = useContext(RecordContext)

  let [data, setData] = useState([])
  let [allResults, setAllResults] = useState(0)

  //pagination
  let [totalPages, setTotalPages] = useState(0)
  let [loading, setLoading] = useState(0)

  let changePage = (pageIndex, pageSize) => {
    setPageNum(pageIndex + 1) //pageIndex starts at 0 by default
    setPageSize(pageSize)
    setUpdatingTimeStamps(true)
  }

  let fetchData = useCallback(() => {

    setLoading(true)

    if (Object.keys(records).length !== 0) {
      setData(records.results)
      setAllResults(records.count)
      setTotalPages(records.total_pages)
      setLoading(false)
    }

  }, [records])

  const columns = [
    {
      Header: 'Date Created',
      accessor: 'date_created',
      Cell: props => <div>{`${new Date(props.value).toLocaleDateString('en-US', {weekday: 'long'})} ${props.value}`}</div>
    },
    {
      Header: 'Caregiver',
      accessor: 'caregiver.full_name',
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

          React Table 

        </Col>
      </Row>
    </Container>
  )
}

export default RecordList