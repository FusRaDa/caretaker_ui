import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const RecordContext = createContext()

export default RecordContext

export const RecordProvider = ({children}) => {

  let {authTokens, user} = useContext(AuthContext)
  let [records, setRecords] = useState([])
  let [updatingRecords, setUpdatingRecords] = useState(false)

  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(10)

  let getRecords = async () => {
    let response = await fetch(`${ServerAddress}/api/record/?p=${pageNum}&page_size=${pageSize}/`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    .catch(() => {
      console.log('server failed')
    })

    let data = await response.json()
    if (response.status === 200) {
      setRecords(data)
    } else {
      console.log('initialize')
    }
  }

  useEffect(() => {
    setUpdatingRecords(false)
    if (user) {
      getRecords()
    }
    // eslint-disable-next-line 
  }, [updatingRecords])

  let contextData = {
    records: records,
    setUpdatingRecords: setUpdatingRecords,
    setPageNum: setPageNum,
    setPageSize: setPageSize,
  }

  return (
    <RecordContext.Provider value={contextData}>
      {children}
    </RecordContext.Provider>
  )
}