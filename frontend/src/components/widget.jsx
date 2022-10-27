import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import axios from "axios";

export default function Widget({ city }) {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});

  const getWeatherData = async () => {
    axios
      .get("http://localhost:8082/service/api/weather", {
        params: { city: city, days: 1 },
      })
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data.current);
        setLocation({
          city: response.data.name,
          country: response.data.country,
          date: response.data.date,
        });
      });
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  if (weatherData !== null)
    return (
      <Card variant="outlined" sx={{ width: 320 }}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {location.city}, {location.country}
        </Typography>
        <Typography level="body2">{location.date}</Typography>
        <Box sx={{ display: "block" }}>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Temperature : {weatherData.temp_c}°C / {weatherData.temp_f}°F
            </Typography>
          </div>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Wind speed : {weatherData.wind_kph} kph
            </Typography>
          </div>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Wind direction : {weatherData.wind_dir}
            </Typography>
          </div>
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              Humidity : {weatherData.humidity}%
            </Typography>
          </div>
          <div>
            <img src={weatherData.icon} alt="" />
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
