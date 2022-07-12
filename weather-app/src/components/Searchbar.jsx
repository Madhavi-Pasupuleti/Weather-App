import React from 'react'
import styled from 'styled-components'
import { LocationOnSharp, SearchOutlined } from "@material-ui/icons"
import axios from "axios"
import { useState } from 'react'

let InputDiv = styled.div`
    width : 90%;
    height : 50px;
    border : 1px solid lightgrey;
    border-radius : 10px;
    display : flex;
    align-items : center;
    padding : 0px 10px;
    margin : auto;
    justify-content : space-between;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    &:hover{
        border : 2px solid skyblue
    }
    `
let Input = styled.input`
    width : 95%;
    height : 40px;
    border-radius : 10px;
    border : none;
    outline : none;
`
let Bounce = styled.div`
    width : 90%;
    height : 50px;
    margin :auto;
    border-radius : 10px;
    display : flex;
    justify-content: space-between;
    align-items  : center;
    padding : 0px 10px;
    box-shadow: rgba(79, 55, 55, 0.24) 0px 3px 8px;
`
let Bdiv = styled.div`
    width : 20%;
    display : flex;
    justify-content: space-around;
`
let Img = styled.img`
    width : 40px;
    height :40px;
    padding :15px 0px;
`
let Wraper = styled.div`
    display : flex;
    width : 90%;
    margin : auto;
    margin-top : 50px;
    #data{
        width : 50%;
    }
    #map{
        width : 50%;
    }
    
` 


let id;
 
function Searchbar() {
    const [city, SetCity ] = useState("")
    const [citydata, SetCityData] = useState([])

    
    const getdata = async(e)=>{
        try{
            SetCity(e)
             
            let getdata = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=05631925d6aa0d3b6f7169ec271c626d
            `)
           
            SetCityData([getdata.data])
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
                    <Bounce key={e.id}>
                        <h4>{e.name}</h4>
                        <Bdiv>
                            <p>{e.main.temp} <br/>{e.weather[0].main}</p>
                            <Img src="https://cdn-icons-png.flaticon.com/128/1146/1146869.png" alt=""/>
                        </Bdiv>
                    </Bounce>
                ))}
            <Wraper>
                <div id="data">
                    {citydata.map((ele) => (
                        <div key={ele.id}>
                        <h2>Temp : {ele.main.temp}</h2>
                        <h3>Pressure : {ele.main.pressure} hpa</h3>
                        <h3>Humidity : {ele.main.humidity}%</h3>
                        <h3>Sunrise : {ele.sys.sunrise}</h3>
                        <h3>Sunset : {ele.sys.sunset}</h3>
                        </div>
                    ))}
                </div>
                <div id = "map">
                    <iframe
                    src={`https://maps.google.com/maps?q=${city}=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameborder="0" 
                    width="100%" 
                    height="450" 
                    style={{border:"0"}}
                    >
                    </iframe>
                </div>
            </Wraper>
        </div>
    )
}

export default Searchbar

 