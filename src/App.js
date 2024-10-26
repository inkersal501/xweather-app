import { useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './WeatherCard';

function App() {

  const api = `https://api.weatherapi.com/v1/current.json`;
  const [cityname, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [showWeather, setShowWeather] = useState(false);

  const getData = async ()=>{
    try {
        const data = await axios.get(api, {
          params: {
            key: "46509d9b9e674da585c162006242610",
            q: cityname,
          }
        }); 
        return data.data;
        
    } catch (error) {
      alert("Failed to fetch weather data");
    }
  };
  const handleForm = async (e)=>{
    e.preventDefault();
    if(cityname!==""){
      setShowWeather(false); 
      setLoading(true);
      const data =await getData();
      setApiResponse(data);
      setShowWeather(true); 
      setLoading(false);
    }
      
  }

  return (
    <div className="App">

        <form onSubmit={handleForm}> 
          <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", padding:"20px"}}>
            <input required className='input' type="text" id="cityname" value={cityname} onChange={(e)=>setCityName(e.target.value)} placeholder='Enter city name'/>
            <div>
              <button type="submit" className='btn'>Search</button>
            </div>
          </div>
          
        </form>
        {loading && <p>Loading data...</p>}

        {showWeather && <div className='weather-cards'>
          <WeatherCard title={"Temperature"} value={apiResponse.current.temp_c} />
          <WeatherCard title={"Humidity"} value={apiResponse.current.humidity+"%"}/>
          <WeatherCard title={"Condition"} value={apiResponse.current.condition.text}/>
          <WeatherCard title={"Wind Speed"} value={apiResponse.current.wind_kph+ " kph"}/>
        </div>}

    </div>
  );
}

export default App;
