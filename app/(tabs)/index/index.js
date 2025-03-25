import { View, ImageBackground, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useLocation1HoursWeather from "../../../hooks/useLocation1HoursWeather";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import WeatherInfo from "../../index_components/WeatherInfo";
import EventCalendar from "../../index_components/EventCalendar";
import WeatherForecast from "../../index_components/WeatherForecast";
import { useState } from "react";
import BackgroundWrapper from "../../components/backgroundWrapper";
import CurrentLocationCard from "../../index_components/CurrentLocationCard";

dayjs.extend(isBetween);

const Index = () => {
  const [currentDay, setCurrentDay] = useState(dayjs().format("YYYY-MM-DD"));

  const { T, WP, BT, CI, W } = useLocation1HoursWeather();

  return (
    <BackgroundWrapper>
      <ScrollView>
        <SafeAreaView className="p-4">
          <WeatherInfo BT={BT} CI={CI} W={W} T={T} WP={WP} />
          <EventCalendar
            setCurrentDay={setCurrentDay}
            currentDay={currentDay}
          />
          <View className="mb-[30px]">
            <WeatherForecast currentDay={currentDay} />
          </View>
          <CurrentLocationCard />
        </SafeAreaView>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Index;
