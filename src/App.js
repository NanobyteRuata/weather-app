import { useState } from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";

const App = () => {
  const [cityname, setCityname] = useState("Yangon");

  return (
    <div>
      <Header onSubmitCity={(newCityname) => setCityname(newCityname)} />
      <Weather cityname={cityname} />
    </div>
  );
};

export default App;
