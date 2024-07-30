import './App.css';
import searchIcon from "./assets/search7.png";
import clearIcon from "./assets/sunny3.png";
import cloudIcon from "./assets/cloudy.jpg";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/windy.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humi.png";
// import propTypes from "prop-types";
import { useState,useEffect } from 'react';

const WeatherDetails = ({icon,temp,city,country,lat,long,humidity,wind})=>{
    return (
        <div>
            <div className='image'>
            <img src={icon} alt = "img" />
            </div>
            <div className='temp'>{temp} </div>
            <div className='location'>{city} </div>
            <div className='country'>{country} </div>
            
            <div className='cord'>    
                <div>
                        <span className='lat'>
                        latitude
                        </span>
                        <span>{lat}</span>
                </div>
                        <div>
                                <span className='long'>
                                     longitude
                                 </span>
                                    <span>{long}</span>
                         </div>
                
            </div>

            <div className='data-container'>
                    <div className='element'>
                    <img src={humidityIcon} alt='humidity' className='icon'/>
                            <div className="data">
                                <div className='humidity-percent'> 
                                   {humidity}
                                </div>

                                <div className="text">
                                    Humidity
                                </div>


                             </div>
                    </div>
                    <div className='element'>
                    <img src={windIcon} alt='wind' className='icon'/>
                            <div className="data">
                                <div className='humidity-percent'> 
                                {wind}
                                </div>

                                <div className="text">
                                    Wind Speed
                                </div>


                             </div>
                    </div>


            </div>



        </div>
    );

}

// WeatherDetails.propTypes={
//     icon: propTypes.string.isRequired,
//     temp: propTypes.number.isRequired,
//     city: propTypes.string.isRequired,
//     country: propTypes.string.isRequired,
//     humidity: propTypes.number.isRequired,
//     wind: propTypes.number.isRequired,
//     lat: propTypes.number.isRequired,
//     long: propTypes.number.isRequired,
// };


function App() {
let apikey="18cd8c8c09f82bd23b863b73bdf5f767"
const [Icon, setIcon] = useState(snowIcon)
const [temp, settemp] = useState()
const [city, setcity] = useState()
const [country, setcountry] = useState()
const [lat, setlat] = useState(0);
const [long, setlong] = useState(0);
const [wind, setWind] = useState(0);
const [humidity,setHumidity] = useState(0);
const [Text, setText] = useState('London');
const [cityNotFound, setcityNotFound] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)
const weatherIconMap ={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
};

const search = async ()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${Text}&appid=${apikey}&units=Metric`;
        try{

            let res = await fetch(url);
            let data = await res.json();
            if (data.cod === "404"){
                console.error("city not found");
                setcityNotFound(true);
                setLoading(false);
                return;
            }
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        settemp(Math.floor(data.main.temp));
        setcity(data.name);
        setcountry(data.sys.country);
        setlat(data.coord.lat);
        setlong(data.coord.lon);         
        const weatherIconCode = data.weather[0].icon; 
        setIcon(weatherIconMap[weatherIconCode] || clearIcon);
        setcityNotFound(false);
        console.log(Icon);
        }catch(error){
            console.error("An error occured:",error.message);
        setError("An Error occured while fetching Data.");

        }finally{
            setLoading(false);
        }
}



const handleCity = (e)=>{
setText(e.target.value);
}

const handleKeyDown=(e)=>{
if(e.key === "Enter"){
    search();

}
};


useEffect( function()  {
  search();

},[]);


  return (
    <div className="App">
             <div className= "container">
                 <div className =" input-container">
                        <input type='text' className='cityInput'placeholder='searchCity' onChange={handleCity} value={Text} onKeyDown={handleKeyDown}/> 
                
                                <div className='Search-icon' onClick={()=>search()}> <img src={searchIcon} alt='search'/> </div>
                    </div> 
                 
                    {loading&&<div className='loading-message'>Loading.........</div>}
                 {error&&<div className='error-message'>{error}</div>}
                {cityNotFound&&<div className='City-notfound'>City Not Found</div>}
                  {!loading&&!cityNotFound&&<WeatherDetails icon={Icon} alt="image"  temp={temp} city ={city} 
                            country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>}

                 
             </div>
               
                                                      
       
      <p className='copyright'>
        Designed by <span> Resivanth</span>
         </p>
    </div>
    
  );
}

export default App;
