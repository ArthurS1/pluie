const axios = require("axios");

const key = "adbae15c63e244488fe204811212311";

const weatherAPI = {
    sleep: async (Mseconde) => {
        return await new Promise((r) => setTimeout(r, Mseconde));
    },

    getTemperature: async (city, days) => {
        if (!days) days = 0;
        var temperature = await axios
            .get(
                `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${days}&aqi=no&alerts=yes`
            )
            .catch(function (err) {
                return { service: 1, error: true };
            });
        if (temperature.error) return { service: 1, error: "Bad request" };
        temperature = temperature.data;
        const weather = {
            name: temperature.location.name,
            country: temperature.location.country,
            date: temperature.location.localtime,
            current: {
                temp_c: temperature.current.temp_c,
                temp_f: temperature.current.temp_f,
                wind_kph: temperature.current.wind_kph,
                wind_dir: temperature.current.wind_dir,
                humidity: temperature.current.humidity,
                name_icon: temperature.current.condition.text,
                icon: "https:" + temperature.current.condition.icon,
            },
            next_day: [],
            alerts: {
                headline: null,
                severity: null,
                category: null,
                note: null,
            },
        };
        if (temperature.alerts.alert.lenght > 0) {
            if (temperature.alerts.alert[0].headline)
                weather.alerts.headline = temperature.alerts.alert[0].headline;
            if (temperature.alerts.alert[0].severity)
                weather.alerts.headline = temperature.alerts.alert[0].severity;
            if (temperature.alerts.alert[0].category)
                weather.alerts.headline = temperature.alerts.alert[0].category;
            if (temperature.alerts.alert[0].note)
                weather.alerts.headline = temperature.alerts.alert[0].note;
        }
        const next = [];
        temperature.forecast.forecastday.forEach((element) => {
            next.push({
                date: element.date,
                maxtemp_c: element.day.maxtemp_c,
                maxtemp_f: element.day.maxtemp_f,
                mintemp_c: element.day.mintemp_c,
                mintemp_f: element.day.mintemp_f,
                avgtemp_c: element.day.avgtemp_c,
                avgtemp_f: element.day.avgtemp_f,
                maxwind_kph: element.day.maxwind_kph,
                humidity: element.day.avghumidity,
                name_icon: element.day.condition.text,
                icon: "https:" + element.day.condition.icon,
            });
        });
        weather.next_day = next;
        return weather;
    },
};

module.exports = weatherAPI;
