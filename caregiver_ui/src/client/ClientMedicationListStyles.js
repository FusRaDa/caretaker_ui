import styled from "styled-components";


const ClientMedicationListStyles = styled.div
`
  .add_button {
    float: right;
  }
  
  table, th, td {
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    width: 10%;
    padding: 10px;
    text-align: center;
  }

  .medication {
    width: 30%;
    text-align: left;
  }
`

export default ClientMedicationListStyles