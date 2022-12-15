import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const TimeStampContext = createContext()

export default TimeStampContext

export const TimeStampProvider = ({children}) => {

  let {authTokens, user, logoutUser} = useContext(AuthContext)
  let [timeStamps, setTimeStamps] = useState([])
  let [updating, setUpdating] = useState(false)

  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(10)

  // `${ServerAddress}/api/timestamp/?p=${pageNum}&page_size=${pageSize}`

  let getTimeStamps = async () => {
    let response = await fetch(`${ServerAddress}/api/timestamp/?p=${pageNum}&page_size=${pageSize}`, {
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
      // logoutUser()
      alert('page not found')
    }
  }

  useEffect(() => {
    setUpdating(false)
    if (user) {
      getTimeStamps()
    }
    // eslint-disable-next-line 
  }, [updating])

  let contextData = {
    timeStamps: timeStamps,
    setUpdating: setUpdating,
    setPageNum: setPageNum,
    setPageSize: setPageSize,
  }

  return (
    <TimeStampContext.Provider value={contextData}>
      {children}
    </TimeStampContext.Provider>
  )

}