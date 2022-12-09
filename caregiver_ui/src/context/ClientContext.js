import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";


const ClientContext = createContext()

export default ClientContext

export const ClientProvider = ({children}) => {

  let {authTokens, user} = useContext(AuthContext)
  let [clients, setClients] = useState([])
  let [updating, setUpdating] = useState(false)

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
      alert('error')
    }
  }

  useEffect(() => {
    setUpdating(false)
    if (user) {
      getClients()
    }
  }, [updating, user])

  let contextData = {
    clients: clients,
    setUpdating: setUpdating,
  }

  return (
    <ClientContext.Provider value={contextData}>
      {children}
    </ClientContext.Provider>
  )

}