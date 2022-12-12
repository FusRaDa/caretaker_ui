import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";
import TimeStampContext from "./TimeStampContext";

const CareGiverContext = createContext()

export default CareGiverContext

export const CareGiverProvider = ({children}) => {

  let {authTokens, user} = useContext(AuthContext)
  let [careGivers, setCareGivers] = useState([])
  let [updating, setUpdating] = useState(false)

  let getCareGivers = async () => {
    let response = await fetch(`${ServerAddress}/api/caregiver/`, {
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
      setCareGivers(data)
    } else {
      alert('error')
    }
  }

  useEffect(() => {
    setUpdating(false)
    if (user) {
      getCareGivers()
    }
  }, [updating, user])

  let contextData = {
    careGivers: careGivers,
    setUpdating: setUpdating,
  }

  return (
    <TimeStampContext.Provider value={contextData}>
      {children}
    </TimeStampContext.Provider>
  )

}