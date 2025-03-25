import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import WEATHER from "../../constant/weather_constant";
import useLocation1HoursWeather from "../../hooks/useLocation1HoursWeather";

dayjs.extend(isBetween);

const WeatherForecast = ({ currentDay }) => {
  const { T, WP, BT, CI, W } = useLocation1HoursWeather({ currentDay });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-[rgba(0,0,0,0.6)] p-4 rounded-[20px] blur-xl"
    >
      {T?.Time?.map((wx, index) => {
        const { DataTime, ElementValue } = wx;
        const currentTime = dayjs(DataTime).format("HH:mm");
        const temperature = ElementValue[0].Temperature;

        // 找到當前時間對應的天氣現象
        const matchedWeather = WP?.Time.find(({ StartTime, EndTime }) =>
          dayjs(DataTime).isBetween(
            dayjs(StartTime),
            dayjs(EndTime),
            "minute",
            "[)"
          )
        );
        const weatherCode =
          matchedWeather?.ElementValue[0]?.WeatherCode || "01"; // 預設 "晴天"

        return (
          <View
            key={index}
            className="items-center gap-[10px] min-w-[50px] mr-[20px]"
          >
            <Text className="text-white font-bold text-lg">{currentTime}</Text>
            <Ionicons
              name={
                WEATHER.constant.WP_CODE?.[weatherCode]?.icon || "cloud-outline"
              }
              size={25}
              color="white"
            />
            <Text className="text-white font-extrabold text-2xl">
              {temperature}°
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default WeatherForecast;
