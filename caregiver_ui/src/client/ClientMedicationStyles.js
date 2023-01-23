import styled from "styled-components";


const ClientMedicationStyles = styled.div
`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    padding: 5px;
    text-align: center;
  }

  .medication {
    width: 400px;
    text-align: left;
  }
`

export default ClientMedicationStyles