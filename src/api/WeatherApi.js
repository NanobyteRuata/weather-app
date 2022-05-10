import axios from "axios";

export async function getWeatherListApi(cityname) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=94ec01998b0e20f31d2efe24e46a21f1&units=metric`
    );
    return response;
  } catch (e) {
    handleError(e);
    return e;
  }
}

export async function getCurrentWeatherApi(cityname) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=94ec01998b0e20f31d2efe24e46a21f1&units=metric`
    );
    return response;
  } catch (e) {
    handleError(e);
  }
}

const handleError = (e) => {
  console.error(e);
};
