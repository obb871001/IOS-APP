import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const useLocation36HoursWeather = () => {
  const [weatherData, setWeatherData] = useState({
    Wx: null,
    PoP: null,
    MinT: null,
    MaxT: null,
    CI: null,
    datasetDescription: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_CWA_API_URL}/F-C0032-001?Authorization=${
            process.env.EXPO_PUBLIC_CWA_API_KEY
          }&locationName=高雄市&timeFrom=${dayjs().format(
            "YYYY-MM-DDT00:00:00"
          )}&timeTo=${dayjs().add(1, "day").format("YYYY-MM-DDT00:00:00")}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );

        const json = await response.json();

        const { result, records } = json || {};

        const Wx = records?.location?.[0]?.weatherElement?.find(
          (item) => item.elementName === "Wx"
        );

        const PoP = records?.location?.[0]?.weatherElement?.find(
          (item) => item.elementName === "PoP"
        );

        const MinT = records?.location?.[0]?.weatherElement?.find(
          (item) => item.elementName === "MinT"
        );

        const MaxT = records?.location?.[0]?.weatherElement?.find(
          (item) => item.elementName === "MaxT"
        );

        const CI = records?.location?.[0]?.weatherElement?.find(
          (item) => item.elementName === "CI"
        );

        const datasetDescription = records?.datasetDescription;

        setWeatherData({
          Wx,
          PoP,
          MinT,
          MaxT,
          CI,
          datasetDescription,
        });
      } catch {}
    };

    fetchData();
  }, []);
  return weatherData;
};

export default useLocation36HoursWeather;
