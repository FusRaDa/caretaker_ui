import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const CareGiverContext = createContext()

export default CareGiverContext

export const CareGiverProvider = ({children}) => {

  let {authTokens, user, logoutUser} = useContext(AuthContext)
  let [careGivers, setCareGivers] = useState([])
  let [updatingCareGivers, setUpdatingCareGivers] = useState(false)

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
      console.log(data)
    } else {
      logoutUser()
    }
  }

  useEffect(() => {
    setUpdatingCareGivers(false)
    if (user) {
      getCareGivers()
    }
  }, [updatingCareGivers])

  let contextData = {
    careGivers: careGivers,
    setUpdatingCareGivers: setUpdatingCareGivers,
  }

  return (
    <CareGiverContext.Provider value={contextData}>
      {children}
    </CareGiverContext.Provider>
  )

}