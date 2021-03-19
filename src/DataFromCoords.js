import react, {useState} from 'react'
import axios from 'axios'

function DataFromCoords() {

  const [weatherData, setWeatherData] = useState({
    coordinates: '-33.86,151.2',
    temperature: 'x',
    rainfall: 'x'
  })
  const [coords, setCoords] = useState('-33.86,151.2')

  function getDataFromCoords(  ) {
    console.log(coords)
    const options = {
      method: 'GET',
      url: `https://dark-sky.p.rapidapi.com/${ coords }`,
      params: {lang: 'en', units: 'auto'},
      headers: {
        'x-rapidapi-key': 'b0d26c20fbmshec974ae629309a7p15f210jsnc05239d2e1ea',
        'x-rapidapi-host': 'dark-sky.p.rapidapi.com'
      }
    };
    makeAxiosRequest( options )
  }

  function makeAxiosRequest( options ) {    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setWeatherData({
        coordinates: `${response.data.latitude}, ${response.data.longitude}`,
        temperature: response.data.currently.temperature,
        rainfall: response.data.currently.precipIntensity
      })
    }).catch(function (error) {
      console.error(error);
    });
  }

  

  return (
    <div className="DataFromCoords">
        <h1>Data</h1>
        <div>
          <pre>Coordinates: { weatherData.coordinates }</pre>
          <pre>Temp: { weatherData.temperature }</pre>
          <pre>Rainfall: { weatherData.rainfall }</pre>
          <pre>Koppen-Geiger Class: ???</pre>
        </div>
        <h1>Request</h1>
        <div>
          <p>Put in coordinates:</p>
          <input onChange={(e)=>setCoords(e.target.value)} />
          <button type='submit' onClick={getDataFromCoords}>Submit</button>
        </div>
    </div>
  );
}

export default DataFromCoords;
