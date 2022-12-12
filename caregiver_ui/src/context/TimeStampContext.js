import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const TimeStampContext = createContext()

export default TimeStampContext

export const TimeStampProvider = ({children}) => {

  let {authTokens, user} = useContext(AuthContext)
  let [timeStamps, setTimeStamps] = useState([])
  let [updating, setUpdating] = useState(false)
  
  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(10)

  // `${ServerAddress}/api/timestamp/?p=${pageNum}&page_size=${pageSize}`

  let getTimeStamps = async () => {
    let response = await fetch(`${ServerAddress}/api/timestamp/`, {
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
      alert('error')
    }
  }

  useEffect(() => {
    setUpdating(false)
    if (user) {
      getTimeStamps()
    }
  }, [updating, user])

  let contextData = {
    timeStamps: timeStamps,
    setUpdating: setUpdating,
  }

  return (
    <TimeStampContext.Provider value={contextData}>
      {children}
    </TimeStampContext.Provider>
  )

}