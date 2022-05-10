import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  faWind,
  faDroplet,
  faSun,
  faCloudSun,
  faCloud,
  faCloudShowersHeavy,
  faCloudBolt,
  faSnowflake,
  faSmog,
  faCloudMoon,
  faMoon,
  faCloudSunRain,
  faCloudMoonRain,
  faEye,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCurrentWeatherApi, getWeatherListApi } from "../api/WeatherApi";
import ForecastCard from "./ForecastCard";
import "./Weather.css";
import { DateTime } from "../util/DateTime.util";

const Weather = ({ cityname }) => {
  const weatherConditionIcons = [
    { code: "01d", icon: faSun, color: "orange" },
    { code: "02d", icon: faCloudSun, color: "orange" },
    { code: "03d", icon: faCloud, color: "orange" },
    { code: "04d", icon: faCloud, color: "orange" },
    { code: "09d", icon: faCloudShowersHeavy, color: "orange" },
    { code: "10d", icon: faCloudSunRain, color: "orange" },
    { code: "11d", icon: faCloudBolt, color: "orange" },
    { code: "13d", icon: faSnowflake, color: "orange" },
    { code: "50d", icon: faSmog, color: "orange" },
    { code: "01n", icon: faMoon, color: "darkblue" },
    { code: "02n", icon: faCloudMoon, color: "darkblue" },
    { code: "03n", icon: faCloud, color: "darkblue" },
    { code: "04n", icon: faCloud, color: "darkblue" },
    { code: "09n", icon: faCloudShowersHeavy, color: "darkblue" },
    { code: "10n", icon: faCloudMoonRain, color: "darkblue" },
    { code: "11n", icon: faCloudBolt, color: "darkblue" },
    { code: "13n", icon: faSnowflake, color: "darkblue" },
    { code: "50n", icon: faSmog, color: "darkblue" },
  ];

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [weatherList, setWeatherList] = useState([]);
  const [isCurrentWeatherSelected, setIsCurrentWeatherSelected] =
    useState(true);
  const [isShowCurrentWeatherLoading, setIsShowCurrentWeatherLoading] =
    useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getCurrentWeather();
    getWeatherList();
  }, [cityname]);

  const getCurrentWeather = async () => {
    setErrorMessage(null);
    setIsShowCurrentWeatherLoading(true);
    const response = await getCurrentWeatherApi(cityname);
    setIsShowCurrentWeatherLoading(false);

    if (response.status < 300 && response.status > 199) {
      handleGetCurrentWeatherSuccess(response.data);
    } else {
      handleGetCurrentWeatherError({});
    }
  };

  const handleGetCurrentWeatherSuccess = (data) => {
    changeSelectedWeather(data);
    setIsCurrentWeatherSelected(true);
  };

  const handleGetCurrentWeatherError = (e) => {
    console.error(e);
    setErrorMessage(e.response.data.message);
  };

  const getWeatherList = async () => {
    const response = await getWeatherListApi(cityname);
    if (response.status < 300 && response.status > 199) {
      handleGetWeatherListSuccess(response.data);
    } else {
      handleGetWeatherListError(response);
    }
  };

  const handleGetWeatherListSuccess = (data) => {
    setWeatherList(data.list);
    setSelectedCity(data.city);
  };

  const handleGetWeatherListError = (e) => {
    console.error(e);
    setErrorMessage(e.response.data.message);
  };

  const changeSelectedWeather = (weather) => {
    setSelectedWeather(weather);
  };

  const onSelectForecast = (weather) => {
    changeSelectedWeather(weather);
    setIsCurrentWeatherSelected(false);
  };

  const calculateWindDirection = (deg) => {
    if (deg > 330 || deg < 30) {
      return "N";
    }
    if (deg >= 30 && deg <= 60) {
      return "NE";
    }
    if (deg > 60 && deg < 120) {
      return "E";
    }
    if ((deg >= 120) & (deg <= 150)) {
      return "SE";
    }
    if ((deg > 150) & (deg < 210)) {
      return "S";
    }
    if ((deg >= 210) & (deg <= 240)) {
      return "SW";
    }
    if ((deg > 240) & (deg < 300)) {
      return "W";
    }
    if ((deg >= 300) & (deg <= 330)) {
      return "NW";
    }
  };

  return selectedWeather && selectedCity ? (
    <Grid container spacing={2}>
      {/* Error Message */}
      <Grid item xs={12}>
        {errorMessage && (
          <Alert severity="warning">
            <AlertTitle>Sorry</AlertTitle>
            {errorMessage}
          </Alert>
        )}
      </Grid>

      {/* Selected Weather */}
      <Grid item xs={12} className="selected-weather">
        <h4>
          {isCurrentWeatherSelected
            ? "Current Weather"
            : DateTime.ConvertTimestampToStringDateTime(selectedWeather.dt)}
        </h4>
        {!isCurrentWeatherSelected && (
          <Button
            onClick={getCurrentWeather}
            disabled={isShowCurrentWeatherLoading}
          >
            Show Current Weather
          </Button>
        )}
        <FontAwesomeIcon
          icon={
            weatherConditionIcons.find(
              (item) => item.code === selectedWeather.weather[0].icon
            ).icon
          }
          color={
            weatherConditionIcons.find(
              (item) => item.code === selectedWeather.weather[0].icon
            ).color
          }
          size="6x"
        />
        <h3 className="city">
          {selectedCity.name + ", " + selectedCity.country}
        </h3>
        <p className="weather-description">
          {selectedWeather.weather[0].description}
        </p>
        <h1>{selectedWeather.main.temp}°C</h1>
        <p className="high-low">
          H - {selectedWeather.main.temp_max}°C | L -{" "}
          {selectedWeather.main.temp_min}°C
        </p>
        <p className="feels-like">
          Feels like {selectedWeather.main.feels_like}°C.
        </p>
        <div className="weather-details">
          <Tooltip title="Humidity">
            <IconButton size="small" className="detail-item">
              <FontAwesomeIcon icon={faDroplet} />
              {selectedWeather.main.humidity}%
            </IconButton>
          </Tooltip>
          <Tooltip title="Wind Speed">
            <IconButton size="small" className="detail-item">
              <FontAwesomeIcon icon={faWind} />
              {selectedWeather.wind.speed}m/s (
              <FontAwesomeIcon icon={faLocationArrow} />
              {" " + calculateWindDirection(selectedWeather.wind.deg)})
            </IconButton>
          </Tooltip>
          <Tooltip title="Visibility">
            <IconButton size="small" className="detail-item">
              <FontAwesomeIcon icon={faEye} />
              {selectedWeather.visibility / 1000}km
            </IconButton>
          </Tooltip>
        </div>
      </Grid>

      {/* Forecast */}
      <Grid item xs={12}>
        <hr />
        <h2>Forecast</h2>
      </Grid>

      <Grid item xs={12} className="forecast-container">
        <div className="forecast">
          {weatherList.map((weather, index) => {
            return (
              <ForecastCard
                key={weather.dt}
                weather={weather}
                icon={
                  weatherConditionIcons.find(
                    (item) => item.code === weather.weather[0].icon
                  ).icon
                }
                color={
                  weatherConditionIcons.find(
                    (item) => item.code === weather.weather[0].icon
                  ).color
                }
                onSelect={() => onSelectForecast(weather)}
                isActive={selectedWeather.dt === weather.dt}
              />
            );
          })}
        </div>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item xs={12} className="loading">
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Weather;
