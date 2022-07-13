import React from 'react'
import styled from 'styled-components'
import { Fireplace, LocationOnSharp, SearchOutlined, ThumbDown, Tune } from "@material-ui/icons"
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
let Days = styled.div`
    width : 80%;
    margin :auto;
    /* border : 1px solid red; */
    .weeks{
        display : flex;
        /* border : 1px solid pink; */
        width:100%;
        .day{
            width : 20%;
            /* border : 1px solid green; */
            display : flex;
            align-items  :center;
            justify-content: center;
           
        }
    }
    .fcast{
        display : flex;
        margin-top : -20px;
        .fdata{
            width : 20%;
            /* border : 1px solid blue */
        }
    }
     
     
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
    const [city, SetCity ] = useState("kadapa")
    const [citydata, SetCityData] = useState([])

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    const [forecast, SetForecast] = useState([]);
    

    useEffect(() => {
        getforcast()
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

    const getforcast = async()=>{
        try{
             
            let getfor = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=05631925d6aa0d3b6f7169ec271c626d`)
            
            //console.log("getcity", getfor.data.city.name)
            SetForecast(getfor.data.list)
            console.log("forcast",forecast)
            
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

    let sevendays = []
    forecast.map((e,i,arr) => {
        if(i === 0 || i === 8 || i === 12 || i === 16 || i === 24 || i === 32 || i === 39){
            sevendays.push(e)
        }
    })
    console.log("days",sevendays)
    let week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
     
    return (
        <div>
            <div>
                <InputDiv>
                    <LocationOnSharp style={{fontSize : "30px"}}/>
                    <Input type="text" 
                       placeholder='Type your city'
                       onInput = {(e) => debounce(() => (getdata(e.target.value),3000))}
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
                                <p>Temp : {ele.main.temp}</p>
                                <p>day : {ele.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </Days>
            <Wraper>
                <div id="data">
                    <br />
                    <button onClick={getLocation}>Show my location</button>
                    <h2>Coordinates</h2>
                    <p>{status}</p>
                    {lat && <p>Latitude: {lat}</p>}
                    {lng && <p>Longitude: {lng}</p>}
                </div>
                <div id = "map">
                    <iframe
                    src={`https://maps.google.com/maps?q=${city}=&z=13&ie=UTF8&iwloc=&output=embed`}
                    border="0" 
                    width="100%" 
                    height="400" 
                    style={{border:"0"}}
                    >
                    </iframe>
                </div>
            </Wraper>
        </div>
    )
}

export default Searchbar

 