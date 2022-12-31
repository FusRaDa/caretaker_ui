import { useEffect, useMemo, useState } from 'react'
import { useTable, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import TimeStampTableStyles from '../timestamp/TimeStampTableStyles'

//filters
import SelectColumnFilter from '../timestamp/SelectColumnFilter'

//components
import EditCareGiverTimeStamp from './EditCareGiverTimeStamp'
import PreviewTimeStamps from './PreviewTimeStamps'

//styles
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


const CareGiverTimeStampTable = ({columns, data, fetchData, changePage, loading, totalPages, pk, updateData, careGiver}) => {

  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  let [showP, setShowP] = useState(false);
  let handleCloseP = () => setShowP(false);
  let handleShowP = () => setShowP(true);

  let [selectedRow, setSelectedRow] = useState(null) //edit timestamp

  let [selectedTimeStamps, setSelectedTimeStamps] = useState([]) //select timestamps to process 

  let [record, setRecord] = useState({})

  const defaultColumn = useMemo(() => ({
    Filter: SelectColumnFilter,
  }), []) 

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
   
    //pagination
    page,
    canPreviousPage, 
    canNextPage, 
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      initialState: {
        hiddenColumns: ['pk','caregiver.full_name'],
        pageIndex: localStorage.getItem(`caregiverPageIndex/${pk}`) !== null ? +localStorage.getItem(`caregiverPageIndex/${pk}`) : 0,
        pageSize: localStorage.getItem(`caregiverPageSize/${pk}`) !== null ? +localStorage.getItem(`caregiverPageSize/${pk}`): 10,
      },
    columns,
    data,
    defaultColumn,
    pageCount: totalPages,
    manualPagination: true,
    autoResetPage: false
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
  )

  useEffect(() => {
    fetchData()
    setSelectedTimeStamps([])
  }, [fetchData])

  useEffect(() => {
    changePage(pageIndex, pageSize)
    localStorage.setItem(`caregiverPageIndex/${pk}`, pageIndex)
    localStorage.setItem(`caregiverPageSize/${pk}`, pageSize)
    setSelectedTimeStamps([])
    // eslint-disable-next-line 
  }, [pageIndex, pageSize])

  let editRow = (row) => {
    setSelectedRow(row.original)
    handleShow()
  }

  let selectTimeStamps = (row) => {
    row.toggleRowSelected()
    if (!row.isSelected) {
      //add
      setSelectedTimeStamps(selectedTimeStamps => [...selectedTimeStamps, row.original])
    }
    if (row.isSelected) {
      //remove
      setSelectedTimeStamps(selectedTimeStamps => selectedTimeStamps.filter(s => s !== row.original))
    }
  }

  let processTimeStamps = () => {
    console.log(selectedTimeStamps)

    if (selectedTimeStamps.length < 1) {
      alert('Please select at least 1 timestamp to record')
      return
    }

    let date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()

    let today = `${month}/${day}/${year}`

    let data = [
      {date_created: today},
      {caregiver: careGiver},
      {timestamps: selectedTimeStamps},
    ]

    setRecord(data)
    handleShowP()
  }

  return (
    <TimeStampTableStyles>
      <div className='table_wrap'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                
                    <div>{column.canFilter ? column.render('Filter') : null}</div>

                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
      
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} 
                  onDoubleClick={() => editRow(row)} 
                  onClick={() => selectTimeStamps(row)} 
                  style={{backgroundColor: row.isSelected === true ? 'lightblue' : 
                    row.original.status === "IN_PROCESS" ? 'lightyellow' : 'lightgreen'}}
                >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}

            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                <td colSpan="10000">
                  Showing {page.length} of ~{pageCount * pageSize}{' '}
                  results
                </td>
              )}
            </tr>

          </tbody>
        </table>

        <div className='pagination'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page {' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
          </span>{' '}

          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Timestamp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditCareGiverTimeStamp data={selectedRow} handleClose={handleClose} updateData={updateData}/>
          </Modal.Body>
        </Modal>

        <Modal
          show={showP}
          onHide={handleCloseP}
          backdrop="static"
          keyboard={false}
          fullscreen={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Timestamps</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewTimeStamps record={record} handleCloseP={handleCloseP} />
          </Modal.Body>
        </Modal>

      </div>

      <Button onClick={() => processTimeStamps()}>Process</Button>

    </TimeStampTableStyles>
  )
}

export default CareGiverTimeStampTable