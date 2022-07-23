import React from 'react'
import styled from 'styled-components'
import { CloudOutlined, LocationOnSharp, SearchOutlined, } from "@material-ui/icons"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react';
import {cities}from "../db"

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
    background-color : white;
    border : 2px solid skyblue;

    `
let Input = styled.input`
    width : 95%;
    height : 40px;
    border-radius : 10px;
    border : none;
    outline : none;
    font-weight : bold;
    font-size : 15px;
    
`
let Bounce = styled.div`
    /* width : 90%; */
    height : 50px;
    margin :auto;
    border-radius : 1px ;
    display : flex;
    justify-content: space-between;
    align-items  : center;
    border-bottom : 0.5px solid lightgrey;
    padding : 0px 10px;
    background-color : white;
    cursor: pointer;
    
`
let Bdiv = styled.div`
    width : 10%;
    display : flex;
    justify-content: space-around;
`
let Img = styled.img`
    width : 40px;
    height :40px;
    padding :15px 0px;
`
let Days = styled.div`
    width : 90%;
    margin :auto;
    background-color : #e6f2fa;
    border-radius : 3px;
    .weeks{
        display : flex;
        width:100%;
        .day{
            width : 20%;
            display : flex;
            align-items  :center;
            justify-content: center;
           
        }
    }
    .fcast{
        display : flex;
        margin-top : -10px;
        padding-bottom : 10px 20px;
        .fdata{
            width : 20%;
            transition : all 0.5s ease;
            border-radius : 2px;
            cursor: pointer;
            &:hover{
                background-color  : #d7f2f7;
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
            }
        }
    }
     
     
`
let Wraper = styled.div`
    width : 100%;
    margin : auto;
    margin-top : 50px;
    
    #data{
        width : 90%;
        margin : auto;
        .weather_details{
            width : 100%;
            display : flex;
            justify-content: space-around;
            h3{
                background-color : #e6f2fa;
                padding : 20px 50px;
                border-radius : 5px;
            }
        }
    }
    #map{
        width : 100%;
    }
    
` 

let count = 0
let id;
 
function Searchbar() {
    const [city, SetCity ] = useState("Kadapa, Andhra Pradesh")
    const [citydata, SetCityData] = useState([])

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    const [forecast, SetForecast] = useState([]);
    const [debounceArr, SetDebounceArr] = useState([])
    const [cityforecast, SetCityForecast] = useState("kadapa")
    

    useEffect(() => {
        getforcast()
    },[cityforecast])

    useEffect(() => {
       Filterfun()
    },[city])
    
    const getLocation = () => {
        if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
        } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        }, () => {
            setStatus('Unable to retrieve your location');
        });
        }
    }

    const getforcast = async()=>{
        try{
             
            let getfor = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityforecast}&units=metric&appid=0e91ea9816665abc67fcec0febec0f7b`)
             
            SetForecast(getfor.data.list)
            SetCityData([getfor.data.list[0]])
            //console.log("forcast",forecast)
        }
        catch(err){
            console.log(err)
        }
    }

    const Filterfun = () => {
        if(id){
            clearTimeout(id)
        }
        id = setTimeout(function(){
             
            let res = cities.filter((ele) => {
                let length = city.length
                return ((ele.slice(0, length).toLowerCase() === city) || (ele.slice(0, length) === city))
            })
            SetDebounceArr(res)
        },1000)
    }
    
    const handleInput = (ele) => {
        SetCity(ele)
        count = 0
    }
    
    let sevendays = []
    forecast.map((e,i,arr) => {
        if(i === 0 || i === 8 || i === 12 || i === 16 || i === 24 || i === 32 || i === 39){
            sevendays.push(e)
        }
    })
    
    let week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    //console.log("setcity", cityforecast)
    
    const handledisplay = () =>{
        count = 1
    }

    //console.log("City", city)  
    //console.log("citydata",citydata)
    
    return (
        <div style={{paddingTop : "20px", width : "100%", margin : "auto" }}>
            <div>
                <InputDiv>
                    <LocationOnSharp style={{fontSize : "30px"}}/>
                    <Input type="text" 
                       placeholder='Type your city'
                       onInput={(e) => handleInput(e.target.value)} 
                       value = {city}
                       />
                    <SearchOutlined style={{fontSize : "32px"}}/>
                </InputDiv>
            </div>
            
            {count === 0 &&
                <div style={{ height : "200px", width : "91%", overflow : "auto", margin : "auto"}}>
                    {debounceArr.map((e) => (   
                        <Bounce onClick = {() => (SetCityForecast(e), SetCity(e), handledisplay())}>
                        <p>{e}</p>
                        <Bdiv>
                        <LocationOnSharp style={{fontSize : "20px"}}/>
                        </Bdiv>     
                        </Bounce>    
                    ))}
                </div>
            }
            <br />
            <Days>
                <div className='weeks'>
                    {week.map((e) => (
                        <div className='day'>
                            <p>{e}</p>
                        </div>
                    ))}
                </div>
                <div className='fcast'>
                    {sevendays.map((ele,i,arr) => (
                        <div key={ele.id} className= "fdata">
                            <p>{ele.main.temp}°C</p>   
                            <p>{
                                ele.weather[0].main === "Rain" ? (<Img src="https://cdn-icons-png.flaticon.com/128/4551/4551693.png" />)
                                : (<Img src = "https://cdn-icons-png.flaticon.com/128/1163/1163573.png"/>)
                               }
                            </p>
                            <p style={{marginTop:"-30px"}}>{ele.weather[0].main}</p>
                        </div>
                    ))}
                </div>
            </Days>

            <Wraper>
                <div id = "map">
                    <iframe
                        src={`https://maps.google.com/maps?q=${cityforecast}=&z=13&ie=UTF8&iwloc=&output=embed`}
                        border="0" 
                        width="90%" 
                        height="450" 
                        style={{border:"0"}}
                    ></iframe>
                </div>
                <div id="data">
                    <div>
                        {citydata.map((e)=> (
                            <div className='weather_details'>
                                <h3>Temp : {e.main.temp}°C</h3>
                                <h3>Pressure : {e.main.pressure} hpa</h3>
                                <h3>Humidity : {e.main.humidity}%</h3>
                            </div>
                        ))} 
                    </div>
                    <br />
                    <div>
                        <button onClick={getLocation} style={{padding  :"5px"}}>Show my location</button>
                        <p>{status}</p>
                        {lat && <p>Latitude: {lat}</p>}
                        {lng && <p>Longitude: {lng}</p>}
                    </div>
                </div>
            </Wraper>

        </div>
    )
}

export default Searchbar

