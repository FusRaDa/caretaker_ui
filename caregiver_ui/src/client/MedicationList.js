import { useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import ClientContext from "../context/ClientContext"
import ServerAddress from "../utils/ServerAddress"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/Row"
import MedicationListStyles from "./MedicationListStyles"
import Button from "react-bootstrap/esm/Button"



const MedicationList = ({medications, client}) => {
  
  let {setUpdatingClients} = useContext(ClientContext)
  let {authTokens} = useContext(AuthContext)

  let [list, setList] = useState([...medications])
  let [updating, setUpdating] = useState(false)

  let [editing, setEditing] = useState(false)
  let [selectEdit, setSelectEdit] = useState(null)


  const updateClientMedicationList = async () => {

    return

    let response = await fetch(`${ServerAddress}/api/client/${client.pk}/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        'medication_list': list
      })
    })
    .catch(() => {
      alert('server response failed!')
    })

    if (response.status === 200) {
      

    } else {
      alert('something went wrong!')
    }
  } 

  let addMedication = (e) => {
    e.preventDefault()
    setUpdating(true)

    let medication = e.target.add_medication.value
    if (list.includes(medication)) {
      alert('Medication has already been listed.')
      return
    }

    setList(list => [...list, medication])

    document.getElementById('add_medication').value = ""
  }

  let updateMedication = (e) => {
    e.preventDefault()

    let value = e.target.edit_medication.value

    if (value === selectEdit) {
      setEditing(false)
      setSelectEdit(null)
      return
    }

    setUpdating(true)

    let index = list.indexOf(selectEdit)

    list[index] = value
    setList([...list])

    setEditing(false)
    setSelectEdit(null)
  }

  let editMedication = (medication) => {
    setEditing(true)
    setSelectEdit(medication)
  }

  let removeMedication = (medication) => {
    setUpdating(true)
    setList(list => list.filter(l => l !== medication))

    setEditing(false)
    setSelectEdit(null)
  }

  useEffect(() => {
    console.log(client)
    if (updating) {
      updateClientMedicationList()
      
    }
    setUpdating(false)
    // eslint-disable-next-line
  }, [list])


  return (
    <MedicationListStyles>
      <Container>

        <Row>
          <Col>
            {!editing &&
            <form onSubmit={addMedication}>
                <input 
                  className="med_input" 
                  id="add_medication"
                  name="add_medication" 
                  required 
                  type="text" 
                  placeholder="Enter name of medication."
                />
              <button className="add_med" type="submit">Add Medication</button>
            </form>
            }

            {editing &&
              <form onSubmit={updateMedication}>
                <input 
                  key={selectEdit} //allows defaultValue to update with state
                  defaultValue={selectEdit}
                  className="med_input" 
                  id="edit_medication" 
                  name="edit_medication" 
                  required 
                  type="text" 
                  placeholder="Edit name of medication."
                />
              <button className="add_med" type="submit">Edit Medication</button>
            </form>
            }
          </Col>
        </Row>

        <Row>
          <Col>
            <table>

              <thead>
                <tr>
                  <th className="title">Medication List of Current Record</th>
                </tr>
              </thead>

              <tbody>
                {list.map(l => (
                  <tr key={list.indexOf(l)} style={{backgroundColor: `${l === selectEdit ? "pink" : ""}`}}> 
                    <td>
                      {l === selectEdit ? `${l} (editing)` : l}
                      <button className="mod_button" onClick={() => removeMedication(l)}>X</button>
                      <button className="mod_button" onClick={() => editMedication(l)}>E</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </Col>
        </Row>

      </Container>
    </MedicationListStyles>
  )

}

export default MedicationList