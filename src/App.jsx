import axios from "axios"
import { useState } from "react"

const App = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6d85ab652a5b622bcc58ba4beef36b8a`

  const searchLocaion = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocaion}
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>
              {data.name}
            </p>
            <div className="temp">
              {data.main ? <h1>{data.main.temp}°F </h1> : null}
            </div>
            <div className="description">
              {
                data.weather ? <p className="bold">{data.weather[0].main}</p> : null
              }
            </div>
          </div>
        </div>
        {
          data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {
                data.main ? <p className="bold">{data.main.humidity}%</p> : null
              }
              <p>Humidity</p>
            </div>
            <div className="wind">
              {
                data.wind ? <p>{data.wind.speed.toFixed()}MPH</p> : null
              }
              <p>Winds</p>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default App