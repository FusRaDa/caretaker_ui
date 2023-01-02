import styled from "styled-components";


const RecordPageStyles = styled.div
`
  .container {
    margin-top: 20px;
    width: 1000px;
    border-style: solid;
    border-width: 1px;
  }

  .title {
    text-align: center;
  }

  .info {
    margin-top: 20px;
  }

  .client_header {
    text-align: right;
  }

  table {
    margin-top: 20px;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  .totals {
    margin-top: 20px;
  }

  .total_hours_header, .compensation_header {
    font-weight: bold;
    text-align: right;
  }

  .service_textbox {
    margin-top: 20px;
  }

  .textbox {
    background-color: white;
  }

  .first_row_check {
    margin-top: 20px;
  }

  .third_row_check {
    margin-bottom: 20px;
  }
`

export default RecordPageStyles