import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const TimeStampContext = createContext()

export default TimeStampContext

export const TimeStampProvider = ({children}) => {

  //all timestamps
  let {authTokens, user} = useContext(AuthContext)
  let [timeStamps, setTimeStamps] = useState([])
  let [updatingTimeStamps, setUpdatingTimeStamps] = useState(false)

  //pageNume defaults to 1, index starts at 0 but page query starts at 1
  let [pageNum, setPageNum] = useState(localStorage.getItem('currentPageIndex') !== null ? 1 + +localStorage.getItem('currentPageIndex') : 1)
  let [pageSize, setPageSize] = useState(localStorage.getItem('currentPageSize') !== null ? +localStorage.getItem('currentPageSize'): 10)

  let [status, setStatus] = useState("IN_PROCESS")
  let [pageNotFound, setPageNotFound] = useState(false)

  let getTimeStamps = async () => {
    let response = await fetch(`${ServerAddress}/api/timestamp/status/${status}/?p=${pageNum}&page_size=${pageSize}`, {
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
      setTimeStamps(data)
    } 

    if (response.status === 404) {
      setPageNotFound(true)
    }
    
  }

  useEffect(() => {
    setUpdatingTimeStamps(false)
    if (user) {
      getTimeStamps()
    }
    // eslint-disable-next-line 
  }, [updatingTimeStamps])


  let contextData = {
    timeStamps: timeStamps,
    setUpdatingTimeStamps: setUpdatingTimeStamps,
    setPageNum: setPageNum,
    setPageSize: setPageSize,
    status: status,
    setStatus: setStatus,
    pageNotFound: pageNotFound,
    setPageNotFound: setPageNotFound,
  }

  return (
    <TimeStampContext.Provider value={contextData}>
      {children}
    </TimeStampContext.Provider>
  )
}
