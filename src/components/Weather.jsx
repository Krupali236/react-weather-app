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
      {/* <h1>Weather App</h1> */}
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
          <h1 className="font-bold">
            {weatherData[0].name},{weatherData[0].sys.country}{" "}
          </h1>
          <p className="font-bold text-lg my-5">{d.toDateString()}</p>

          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <p className="w-80 my-2 bg-black bg-opacity-80 text-[#00b2ea] rounded-2xl p-6 font-bold text-lg">
              <span className="mx-3">&#127749;</span>
              {new Date(weatherData[0].sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="w-80 my-2 bg-black bg-opacity-80 text-[#00b2ea] rounded-2xl p-6 font-bold text-lg">
              <span className="mx-3"> &#127751; </span>
              {new Date(weatherData[0].sys.sunset * 1000).toLocaleTimeString()}
            </p>
            <p className="w-80 my-2 bg-black bg-opacity-80 text-[#00b2ea] rounded-2xl p-6 font-bold text-lg">
              {" "}
              <span> &#127777;</span> {weatherData[0].main.temp}°C
            </p>
            <p className="w-80 my-2 bg-black bg-opacity-80 text-[#00b2ea] rounded-2xl p-6 font-bold text-lg">
              <span>&#128065;</span> {weatherData[0].visibility} meters
            </p>
            <p className="w-80 my-2 bg-black bg-opacity-80 text-[#00b2ea] rounded-2xl p-6 font-bold text-lg">
              {" "}
              <span>&#127744;</span> {weatherData[0].wind?.speed} m/s
            </p>
            <p className="w-80 my-2 bg-black bg-opacity-80 text-[#00b2ea] rounded-2xl p-6 font-bold text-lg">
            <span>&#9925;</span>  {weatherData[0].weather[0].main}
              <span className="text-sm mx-1 font-medium italic">
                {weatherData[0].weather[0].description}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Weather;
