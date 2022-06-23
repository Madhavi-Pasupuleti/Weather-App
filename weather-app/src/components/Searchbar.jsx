import React from 'react'
import styled from 'styled-components'
import { LocationOnSharp, SearchOutlined } from "@material-ui/icons"

let InputDiv = styled.div`
    width : 90%;
    height : 50px;
    border : 1px solid lightgrey;
    border-radius : 10px;
    display : flex;
    align-items : center;
    padding : 0px 10px;
    margin : auto;
    justify-content : space-evenly;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    &:hover{
        border : 2px solid skyblue
    }
    `
let Input = styled.input`
    width : 80%;
    height : 40px;
    border-radius : 10px;
    border : none;
    outline : none;
`
function Searchbar() {
  return (
    <div>
        <InputDiv>
            <LocationOnSharp style={{fontSize : "30px"}}/>
            <Input type="text" />
            <SearchOutlined style={{fontSize : "32px"}}/>
        </InputDiv>
    </div>
  )
}

export default Searchbar