import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useLocation1HoursWeather = ({ currentDay } = {}) => {
  const CURRENT_LOCATION = useSelector((state) => state.CURRENT_LOCATION);

  const { city } = CURRENT_LOCATION;

  const [weatherData, setWeatherData] = useState({
    T: null,
    DPT: null,
    RH: null,
    BT: null,
    CI: null,
    W: null,
    WD: null,
    WP: null,
    PoP: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseDay = currentDay || dayjs().format("YYYY-MM-DD");
        const startTime = dayjs(baseDay)
          .add(0, "day")
          .format("YYYY-MM-DDT00:00:00");
        const endTime = dayjs(baseDay)
          .add(1, "day")
          .format("YYYY-MM-DDT00:00:00");

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_CWA_API_URL}/F-D0047-089?Authorization=${process.env.EXPO_PUBLIC_CWA_API_KEY}&LocationName=${city}&timeFrom=${startTime}&timeTo=${endTime}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const json = await response.json();
        const { records } = json || {};

        const mainData = records?.Locations?.[0]?.Location?.[0]?.WeatherElement; //該市區的天氣資料

        const T = mainData.find((item) => item.ElementName == "溫度");

        const DPT = mainData.find((item) => item.ElementName == "露點溫度");

        const RH = mainData.find((item) => item.ElementName == "相對濕度");

        const BT = mainData.find((item) => item.ElementName == "體感溫度");

        const CI = mainData.find((item) => item.ElementName == "舒適度指數");

        const W = mainData.find((item) => item.ElementName == "風速");

        const WD = mainData.find((item) => item.ElementName == "風向");

        const WP = mainData.find((item) => item.ElementName == "天氣現象");

        const PoP = mainData.find(
          (item) => item.ElementName == "3小時降雨機率"
        );

        setWeatherData({
          T,
          DPT,
          RH,
          BT,
          CI,
          W,
          WD,
          WP,
          PoP,
        });
      } catch {}
    };
    if (city) {
      fetchData();
    }
  }, [currentDay, city]);
  return weatherData;
};

export default useLocation1HoursWeather;
