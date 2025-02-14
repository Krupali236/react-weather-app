import { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const api_key = "f00c38e0279b7bc85480c3fe775d518c";
  const d = new Date();
  const handleCity = (e) => {
    setCity(e.target.value);
    console.log(city, "city");
  };

  const checkWheather = () => {
    if (!city.trim()) {
      alert("Please enter a city!");
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData([data]);
        console.log([data], "data");
        console.log(weatherData, "weatherData");
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <>
      <h1>Weather App</h1>
      <div className="grid">
        <div className="column-1">
          <input
            type="text"
            placeholder="Enter a City"
            name="city"
            value={city}
            className="bg-slate-200 rounded-2xl p-3 my-9 w-80"
            onChange={handleCity}
          />
        </div>
        <div className="column-1">
          <button className="bg-black text-white w-52" onClick={checkWheather}>
            Check Weather
          </button>
        </div>
      </div>

      {weatherData.length > 0 && weatherData[0].main ? (
        <div className="container my-6">
          <h1 className="bg-[#00b2ea]">
            {" "}
            {weatherData[0].name},{weatherData[0].sys.country}
          </h1>
          <p className="font-bold text-lg my-5">{d.toDateString()}</p>
          <div className="flex justify-evenly">
            <p className="my-5 bg-[#00b2ea] p-6">
              Sunrise:{" "}
              {new Date(weatherData[0].sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="my-5 bg-[#00b2ea] p-6">
              Sunset:{" "}
              {new Date(weatherData[0].sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
          <p>Temperature: {weatherData[0].main.temp}°C</p>
          <p>Visibility: {weatherData[0].visibility} meters</p>
          <p>Wind Speed: {weatherData[0].wind?.speed} m/s</p>
        </div>
      ) : null}
    </>
  );
};
export default Weather;
