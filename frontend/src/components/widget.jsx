import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import axios from "axios";
//import IconButton from "@mui/joy/IconButton";

export default function Widget({ city }) {
  const [weatherData, setWeatherData] = useState({});

  const getWeatherData = async () => {
    axios
      .get("http://localhost:8082/service/api/weather", {
        params: { city: city, days: 1 },
      })
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      });
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  if (weatherData !== null)
    return (
      <Card variant="outlined" sx={{ width: 400 }}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {weatherData.name}, {weatherData.country}
        </Typography>
        <Typography level="body2">{weatherData.date}</Typography>
        <Box sx={{ display: "block" }}>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Temperature : {weatherData.current.temp_c}°C /{" "}
              {weatherData.current.temp_f}°F
            </Typography>
          </div>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Wind speed : {weatherData.current.wind_kph} kph
            </Typography>
          </div>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Wind direction : {weatherData.current.wind_dir}
            </Typography>
          </div>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Humidity : {weatherData.current.humidity}%
            </Typography>
          </div>
          <div>
            <img src={weatherData.current.icon} alt="" />
          </div>
          {/*<Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          More information
        </Button>*/}
        </Box>
      </Card>
    );
}
