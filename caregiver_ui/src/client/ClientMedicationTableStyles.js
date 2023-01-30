import styled from "styled-components";


const ClientMedicationTableStyles = styled.div
`
  .week_month {
    text-align: center;
  }

  .medication_list {
    float: right;
  }

  table, th, td {
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
    margin-bottom: 5px;
  }

  th, td {
    font-size: 15px;
    text-align: center;
    width: 8%;
  }

  .medication_header {
    width: 44%;
  }

  .add_button {
    float: right;
  }



`

export default ClientMedicationTableStyles