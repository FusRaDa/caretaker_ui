import styled from "styled-components";


const TimeStampsStyles = styled.div
`
  .menu {
    margin-right: 10px;
    position: fixed;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }

  .menu_title {
    text-align: center;
  }

  .status {
    padding: 10px;
  }

  .legend {
    padding: 10px;
  }

  .legend_status {
    display: flex;
    flex-direction: row;
  }

  .box_lightgreen {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, .2);
    background: lightgreen;
  }

  .box_lightyellow {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, .2);
    background: lightyellow;
  }

  .guide {
    text-align: center;
    font-size: 10px
  }

  .add_button {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }


`

export default TimeStampsStyles