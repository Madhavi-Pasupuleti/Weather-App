import React from 'react'
import styled from 'styled-components'
import { CloudOutlined, LocationOnSharp, SearchOutlined, } from "@material-ui/icons"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react';
import {cities}from "../db"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
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
    border: 1px solid lightgrey;
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
    border-radius : 3px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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
            cursor: pointer;
            &:hover{
                border : 2px solid skyblue; 
                border-radius : 2px;
            }
        }
    }    
`
let Chart = styled.div`
    width : 90%;
    margin : auto;
    border-radius : 3px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`
let Temp = styled.div`
    display : flex;
    width : 90%;
    margin : auto;
    font-size : 20px;
    align-items : center;
    img{
        width : 70px;
        height : 70px;
        margin-left : 30px;
    }
`
let HP = styled.div`
   width : 90%;
   margin : auto;
   display : flex;
   justify-content: space-around;
   h3{
       background-color : rgb(233, 242, 252);
       padding : 10px;
       width : 40%;
       span{
        font-weight : lighter
       }
   }
`
let Wraper = styled.div`
    width : 100%;
    margin : auto;
    margin-top : 50px;
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
            console.log("forcast",forecast)
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

const data = [
    {
        name: '6am',
        Temp : 20,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '9am',
        Temp : 28,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '12pm',
        Temp : 29,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '3pm',
        Temp : 32,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '6pm',
        Temp : 27,
        pv: 4800,
        amt: 2181,
    },
    { 
        name: '9pm',
        Temp : 25,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '12am',
        Temp : 26,
        pv: 4300,
        amt: 2100,
    },
    {
        name: '3am',
        Temp : 20,
        pv: 4300,
        amt: 2100,
    },
];
    
    
    return (
        <div style={{paddingTop : "20px", width : "100%", margin : "auto" }}>
            {/* Input */}
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
            
            {/* Debouncing */}
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

            { /* Weekly forecast */ }
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
                                ele.weather[0].main === "Rain" ? (<Img src="https://cdn-icons-png.flaticon.com/128/826/826957.png" />)
                                : (<Img src = "https://cdn-icons-png.flaticon.com/128/1146/1146869.png"/>)
                               }
                            </p>
                            <p style={{marginTop:"-30px"}}>{ele.weather[0].main}</p>
                        </div>
                    ))}
                </div>
            </Days>
            <br />
            <br />
            <Chart>
                {citydata.map((e)=> (
                    <Temp>
                        <h1>{e.main.temp}°C</h1>
                        <img src="https://cdn-icons-png.flaticon.com/128/869/869767.png" />
                    </Temp>
                ))} 

                <ResponsiveContainer width="98%" height={400} >
                    <AreaChart
                        width="500px"
                        height="100px"
                        data={data}
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Temp" stroke="blue" fill="skyblue" />
                    </AreaChart>
                </ResponsiveContainer>
                <div>
                    {citydata.map((e)=> (
                    <HP>
                        <h3>Pressure <br /> <span>{e.main.pressure} hpa</span></h3>
                        <h3>Humidity <br /> <span>{e.main.humidity}%</span></h3>
                    </HP>
                    ))} 
                </div>
                <br />
            </Chart>


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
                <br />
                <div id="data">
                    <div>
                        <button onClick={getLocation} style={{padding  :"5px"}}>Show my location</button>
                        <p>{status}</p>
                        {lat && <p>Latitude: {lat}</p>}
                        {lng && <p>Longitude: {lng}</p>}
                    </div>
                </div>
            </Wraper>
            <br />
        </div>
    )
}

export default Searchbar

