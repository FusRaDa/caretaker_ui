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

  //caregivertimestamps
  let [careGiverTimeStamps, setCareGiverTimeStamps] = useState([])

  let getTimeStamps = async () => {
    let response = await fetch(`${ServerAddress}/api/timestamp/?p=${pageNum}&page_size=${pageSize}/`, {
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
      console.log(data)
    } else {
      logoutUser()
      alert('page not found')
    }
  }

  let getCareGiverTimeStamps = async (pk, index, size) => {

    if (index === null) {
      index = 1
    }
    if (size === null) {
      size = 50
    }

    let response = await fetch(`${ServerAddress}/api/timestamp/${pk}/?p=${index}&page_size=${size}/`, {
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
      setCareGiverTimeStamps(data)
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
    getCareGiverTimeStamps: getCareGiverTimeStamps,
    careGiverTimeStamps: careGiverTimeStamps,
  }

  return (
    <TimeStampContext.Provider value={contextData}>
      {children}
    </TimeStampContext.Provider>
  )
}
