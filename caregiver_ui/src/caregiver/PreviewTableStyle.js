import styled from "styled-components";


const PreviewTableStyle = styled.div
`
  table {
    margin-top: 10px;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid black;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .total_hours, .compensation {
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: center;
  }

  .services, .activities {
    margin-bottom: 10px;
  }
`

export default PreviewTableStyle