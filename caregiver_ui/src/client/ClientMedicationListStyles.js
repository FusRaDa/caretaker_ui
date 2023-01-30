import styled from "styled-components";


const ClientMedicationListStyles = styled.div
`
  .med_input {
    width: 70%;
  }

  .add_med {
    width: 30%
  }

  table, th, td {
    margin-top: 10px;
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
    margin-bottom: 5px;
  }

  .title {
    text-align: center;
  }

  th, td {
    font-size: 15px;
    width: 8%;
  }

  .mod_button {
    font-size: 10px;
    float: right;
  }
`

export default ClientMedicationListStyles