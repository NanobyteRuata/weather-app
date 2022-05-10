import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import "./Header.css";

const Header = ({ onSubmitCity }) => {
  const [searchCity, setSearchCity] = useState("Yangon");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmitCity(searchCity);
    }
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <h3 className="title">My Weather</h3>

          <OutlinedInput
            size="small"
            color="primary"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchCity(e.currentTarget.value)}
            value={searchCity}
            type="search"
            placeholder="Search City"
            id="outlined-basic"
            variant="outlined"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => onSubmitCity(searchCity)}>
                  <FontAwesomeIcon icon={faSearch} />
                </IconButton>
              </InputAdornment>
            }
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
