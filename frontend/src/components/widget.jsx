import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Widget({ city, id, handleDelete }) {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});

  const getWeatherData = async () => {
    axios
      .get("http://localhost:8082/service/api/weather", {
        params: { city: city, days: 1 },
      })
      .then((response) => {
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
    //eslint-disable-next-line
  }, []);

  if (weatherData !== null)
    return (
      <Card variant="outlined" sx={{ width: 350 }}>
        <div style={{ width: "70%" }}>
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {location.city}, {location.country}
          </Typography>
          <Typography level="body2">{location.date}</Typography>
        </div>
        <img
          src={weatherData.icon}
          alt=""
          style={{
            position: "absolute",
            right: "5%",
            top: "3%",
            width: "64px",
            height: "64px",
          }}
        />
        <Box sx={{ display: "block", paddingTop: "10%" }}>
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
          <div display="flex">
            <IconButton
              aria-label="delete"
              style={{ position: "absolute", right: "5%", bottom: "5%" }}
              onClick={() => handleDelete(id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Box>
      </Card>
    );
}
