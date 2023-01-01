import { useContext } from "react";
import ServerAddress from "../utils/ServerAddress";

//styles
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

//contexts
import AuthContext from "../context/AuthContext";
import CareGiverContext from "../context/CareGiverContext";


const DeleteCareGiver = ({pk, handleClose, handleCloseE, setSelectedCareGiver}) => {

  let {authTokens} = useContext(AuthContext)
  let {setUpdatingCareGivers} = useContext(CareGiverContext)

  let deleteCareGiver = async (e) => {
    e.preventDefault()

    let text = e.target.confirm_delete.value

    if (text === "permanently delete") {

      let response = await fetch(`${ServerAddress}/api/caregiver/${pk}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
      })
      .catch(() => {
        alert('server response failed!')
      })
  
      if (response.status === 204) {
        setUpdatingCareGivers(true)
        handleClose()
        handleCloseE()
        setSelectedCareGiver(null)
      } else {
        alert('something went wrong!')
      }
    } else {
      alert('confirmation required')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={deleteCareGiver}>
            <Form.Group>
              <Form.Label>Are you sure?</Form.Label>
              <Form.Control name="confirm_delete" type='text' placeholder="Confirm this deletion" autoComplete="off"/>
              <Form.Text>Type "permanently delete" and confirm</Form.Text>
            </Form.Group>
           
            <Button variant="danger" type="submit">Confirm</Button>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default DeleteCareGiver