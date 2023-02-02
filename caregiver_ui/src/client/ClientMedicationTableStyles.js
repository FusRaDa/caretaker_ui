import styled from "styled-components";


const ClientMedicationTableStyles = styled.div
`
  .week_month {
    text-align: center;
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

  .checkbox {
    width: 50px;
    height: 25px;
  }

  .move_up, .move_down {
    font-size: 18px;
    width: 30px;
    padding: 0;
  }

  .med_input {
    width: 75%;
  }

  .med_col {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .med_col_check {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 13px;
  }

  .edit, .delete {
    font-size: 10px;
    text-align: center;
    margin-bottom: 5px;
  }

  .medication_header {
    width: 44%;
  }

  .add_button, .add_label {
    float: right;
    margin-left: 5px;
  }



`

export default ClientMedicationTableStyles