import React from 'react'
import styled from 'styled-components'
import { LocationOnSharp, SearchOutlined } from "@material-ui/icons"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

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
let Bounce = styled.div`
    width : 95%;
    height : 40px;
    margin :auto;
    border-radius : 0px 3px;
    display : flex;
    justify-content: center;
    align-items  : center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

let id;
let getdata
function Searchbar() {
    const [city, SetCity ] = useState("")
    const [citydata, SetCityData] = useState([])

    const getdata = async(e)=>{
        try{
            SetCity(e)
            // if(city.length <= 1){
            //     return false
            // }
          getdata = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=05631925d6aa0d3b6f7169ec271c626d`)
          .then((res)=>{
              SetCityData([res.data])
            })
        }
        catch(err){
            console.log(err)
        }
    }

    function debounce(func, delay){
        if(id){
            clearTimeout(id)
        }
        id = setTimeout(()=>{
            func()
        },delay)
    }
    
    console.log("citydata",citydata)
    
    return (
        <div>
            <div>
                <InputDiv>
                    <LocationOnSharp style={{fontSize : "30px"}}/>
                    <Input type="text" 
                       onInput = {(e) => debounce(() => (getdata(e.target.value),1000))}
                       />
                    <SearchOutlined style={{fontSize : "32px"}}/>
                </InputDiv>
            </div>
                        
             
                {citydata.map((e) => (
                    <Bounce ke={e.id}>{e.name}</Bounce>
                ))}
            
            
            <div>
                {citydata.map((ele) => (
                    <div key={ele.id}>
                       <h2>City : {ele.name}</h2>
                       <h2>Temp : {ele.main.temp}</h2>
                       <h3>Desc : {ele.weather[0].description}</h3>
                       <p>Wind Speed : {ele.wind.speed}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Searchbar