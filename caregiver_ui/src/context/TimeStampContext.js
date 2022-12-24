import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const TimeStampContext = createContext()

export default TimeStampContext

export const TimeStampProvider = ({children}) => {

  //all timestamps
  let {authTokens, user, logoutUser} = useContext(AuthContext)
  let [timeStamps, setTimeStamps] = useState([])
  let [updatingTimeStamps, setUpdatingTimeStamps] = useState(false)

  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(10)

  let [status, setStatus] = useState("IN_PROCESS")

  let getTimeStamps = async () => {
    let response = await fetch(`${ServerAddress}/api/timestamp/${status}/?p=${pageNum}&page_size=${pageSize}/`, {
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
    } else {
      alert('page not found')
    }
  }

  useEffect(() => {
    setUpdatingTimeStamps(false)
    if (user) {
      getTimeStamps()
    }
    // eslint-disable-next-line 
  }, [updatingTimeStamps])

  useEffect(() => {
    getTimeStamps()
  }, [status])

  let contextData = {
    timeStamps: timeStamps,
    setUpdatingTimeStamps: setUpdatingTimeStamps,
    setPageNum: setPageNum,
    setPageSize: setPageSize,
    setStatus: setStatus,
  }

  return (
    <TimeStampContext.Provider value={contextData}>
      {children}
    </TimeStampContext.Provider>
  )
}
