import { usePagination, useTable } from "react-table"

const RecordTable = ({columns, data, fetchData, }) => {

  // //modal
  // let [show, setShow] = useState(false);
  // let handleClose = () => setShow(false);
  // let handleShow = () => setShow(true);

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
        pageIndex: localStorage.getItem('recordPageIndex') !== null ? +localStorage.getItem('recordPageIndex') : 0,
        pageSize: localStorage.getItem('recordPageSize') !== null ? +localStorage.getItem('recordPageSize'): 10,
      },
    columns,
    data,
    pageCount: totalPages,
    manualPagination: true,
    autoResetPage: false,
    },
    usePagination,
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    changePage(pageIndex, pageSize)
    localStorage.setItem("recordPageIndex", pageIndex)
    localStorage.setItem("recordPageSize", pageSize)
    // eslint-disable-next-line 
  }, [pageIndex, pageSize])


  return (
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
                <tr {...row.getRowProps()} onClick={() => console.log('view record')}>
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

      </div>
  )


}

export default RecordTable