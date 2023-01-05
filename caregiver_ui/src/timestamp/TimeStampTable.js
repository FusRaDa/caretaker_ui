import { useContext, useEffect, useMemo, useState } from 'react'
import { useTable, useFilters, usePagination, useSortBy } from 'react-table'

import TimeStampContext from '../context/TimeStampContext';
import EditTimeStamp from './EditTimeStamp';

//filters
import SelectColumnFilter from './SelectColumnFilter'

//styles
import Modal from 'react-bootstrap/Modal';
import TimeStampTableStyles from './TimeStampTableStyles'


const TimeStampTable = ({columns, data, fetchData, changePage, loading, totalPages, allResults, resetPage, setResetPage, status}) => {

  let {pageNotFound, setPageNotFound} = useContext(TimeStampContext)

  //modal
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  let [selectedRow, setSelectedRow] = useState(null)

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
        hiddenColumns: ['pk'],
        pageIndex: localStorage.getItem('currentPageIndex') !== null ? +localStorage.getItem('currentPageIndex') : 0,
        pageSize: localStorage.getItem('currentPageSize') !== null ? +localStorage.getItem('currentPageSize'): 10,
      },
    columns,
    data,
    defaultColumn,
    pageCount: totalPages,
    manualPagination: true,
    autoResetPage: false,
    },
    useFilters,
    useSortBy,
    usePagination,
  )

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [fetchData])

  //if table is empty due to wrong pageIndex fetch, go back to first page if awaiting timestamps
  useEffect(() => {
    if (pageNotFound) {
      //go back to first page
      gotoPage(0)

      setPageNotFound(false)
    }
    // eslint-disable-next-line
  }, [pageNotFound])

  useEffect(() => {
    changePage(pageIndex, pageSize)
    localStorage.setItem("currentPageIndex", pageIndex)
    localStorage.setItem("currentPageSize", pageSize)
    // eslint-disable-next-line 
  }, [pageIndex, pageSize])

  //when changing status always revert to first page of results
  useEffect(() => {
    if (resetPage) {
      //go back to first page and set pageIndex to 0
      gotoPage(0)

      setResetPage(false)
    }
    // eslint-disable-next-line
  }, [status])


  let editRow = (row) => {
    setSelectedRow(row.original)
    handleShow()
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
                <tr {...row.getRowProps()} onDoubleClick={() => editRow(row)} 
                  style={{backgroundColor: row.original.status === "IN_PROCESS" ? 'lightyellow' : 'lightgreen'}}
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
                  Showing {page.length} of {allResults}{' '}results
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
            <EditTimeStamp data={selectedRow} handleClose={handleClose}/>
          </Modal.Body>
        </Modal>

      </div>
    </TimeStampTableStyles>
  )
}

export default TimeStampTable
 