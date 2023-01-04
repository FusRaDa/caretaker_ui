import { createContext, useContext, useEffect, useState } from "react";
import ServerAddress from "../utils/ServerAddress";
import AuthContext from "./AuthContext";

const ClientContext = createContext()

export default ClientContext

export const ClientProvider = ({children}) => {

  let {authTokens, user} = useContext(AuthContext)
  let [clients, setClients] = useState([])
  let [updatingClients, setUpdatingClients] = useState(false)

  let getClients = async () => {
    let response = await fetch(`${ServerAddress}/api/client/`, {
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
      setClients(data)
      console.log(data)
    } else {
      console.log('initialize')
    }
  }

  useEffect(() => {
    setUpdatingClients(false)
    if (user) {
      getClients()
    }
    // eslint-disable-next-line
  }, [updatingClients])

  let contextData = {
    clients: clients,
    setUpdatingClients: setUpdatingClients,
  }

  return (
    <ClientContext.Provider value={contextData}>
      {children}
    </ClientContext.Provider>
  )

}