import { useEffect, useMemo } from 'react'
import { useTable, useFilters, usePagination, useSortBy } from 'react-table'
import TimeStampTableStyles from '../timestamp/TimeStampTableStyles'

//filters
import SelectColumnFilter from '../timestamp/SelectColumnFilter'

const CareGiverTimeStampTable = ({columns, data, fetchData, changePage, loading, totalPages}) => {

  const defaultColumn = useMemo(() => ({
    Filter: SelectColumnFilter,
    // EditCell : EditableCell,
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
        pageIndex: localStorage.getItem('caregiverPageIndex') !== null ? +localStorage.getItem('currentPageIndex') : 0,
        pageSize: localStorage.getItem('caregiverPageSize') !== null ? +localStorage.getItem('currentPageSize'): 10,
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
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    changePage(pageIndex, pageSize)
    localStorage.setItem("currentPageIndex", pageIndex)
    localStorage.setItem("currentPageSize", pageSize)
    // eslint-disable-next-line 
  }, [pageIndex, pageSize])
  
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
                <tr {...row.getRowProps()}>
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

      </div>
    </TimeStampTableStyles>
  )
}

export default CareGiverTimeStampTable