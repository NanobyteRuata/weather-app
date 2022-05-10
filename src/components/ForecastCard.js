import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Typography } from "@mui/material";
import { DateTime } from "../util/DateTime.util";
import "./ForecastCard.css";

const ForecastCard = ({ weather, onSelect, icon, color, isActive }) => {
  const manipulateDate = () => {
    const now = new Date().getTime() / 1000;
    const dateString = DateTime.ConvertTimestampToStringDate(weather.dt);

    if (DateTime.ConvertTimestampToStringDate(now) === dateString) {
      return "Today";
    } else {
      return dateString;
    }
  };

  return (
    <Card
      key={weather.dt}
      className={"card" + (isActive ? " active" : "")}
      //   className="card"
      onClick={onSelect}
    >
      <CardContent className="card-row">
        <Typography fontSize="14px" color="text.secondary" gutterBottom>
          {manipulateDate()}
        </Typography>
        <h4 className="card-temp">{weather.main.temp}°C</h4>
      </CardContent>
      <CardContent className="card-row">
        <Typography fontSize="14px" color="text.secondary" gutterBottom>
          {DateTime.ConvertTimestampToStringTime(weather.dt)}
        </Typography>
        <FontAwesomeIcon icon={icon} color={color} size="xl" />
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
