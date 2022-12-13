import { useEffect, useMemo } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import TimeStampTableStyles from './TimeStampTableStyles'

//filters
import DefaultColumnFilter from './DefaultColumnFilter'


const TimeStampTable = ({columns, data, fetchData}) => {

  const defaultColumn = useMemo(() => ({
    Filter: DefaultColumnFilter,
    // EditCell : EditableCell,
  }), []) 

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
   
    //pagination
    rows,
    // canPreviousPage, 
    // canNextPage, 
    // pageOptions,
    // pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    // state: { pageIndex, pageSize },
  } = useTable(
    {
      initialState: {
        hiddenColumns: ['pk'],
        // pageIndex: localStorage.getItem('currentPageIndex') !== null ? +localStorage.getItem('currentPageIndex') : 1,
        // pageSize: localStorage.getItem('currentPageSize') !== null ? +localStorage.getItem('currentPageSize'): 10,
      },
    columns,
    data,
    defaultColumn,
    
    // manualPagination: true,
    // pageCount: controlledPageCount,
    // autoResetPage: false
    },
    useFilters,
    // usePagination,
   
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return (
    <TimeStampTableStyles>
      <div className='table_wrap'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
      
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
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

          </tbody>
        </table>

        {/* <div className='pagination'>
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
        </div> */}

      </div>
    </TimeStampTableStyles>
  )
}

export default TimeStampTable
 