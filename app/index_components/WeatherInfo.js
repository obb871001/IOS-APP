import { View, Text } from "react-native";
import WEATHER from "../../constant/weather_constant";
import { useMemo } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

dayjs.extend(isBetween);

const WeatherInfo = ({ BT, CI, W, T, WP }) => {
  //BT = 體感溫度, CI = 舒適度指數, W = 風速, T = 溫度

  const CURRENT_LOCATION = useSelector((state) => state.CURRENT_LOCATION);

  const { city } = CURRENT_LOCATION;

  const currentInfo = useMemo(() => {
    const foundCurrentTemp = T?.Time.find(({ DataTime, ElementValue }) => {
      return dayjs(DataTime).isBetween(
        dayjs().subtract(1, "hour"),
        dayjs(),
        "minute",
        "[)"
      );
    });
    const foundCurrentCI = CI?.Time.find(({ DataTime }) =>
      dayjs(DataTime).isBetween(
        dayjs().subtract(1, "hour"),
        dayjs(),
        "minute",
        "[)"
      )
    );

    const foundCurrentW = W?.Time.find(({ DataTime }) =>
      dayjs(DataTime).isBetween(
        dayjs().subtract(1, "hour"),
        dayjs(),
        "minute",
        "[)"
      )
    );

    const foundCurrentBT = BT?.Time.find(({ DataTime }) =>
      dayjs(DataTime).isBetween(
        dayjs().subtract(1, "hour"),
        dayjs(),
        "minute",
        "[)"
      )
    );

    const foundCurrentWP = WP?.Time.find(({ StartTime, EndTime }) =>
      dayjs().isBetween(dayjs(StartTime), dayjs(EndTime), "minute", "[)")
    );
    return {
      currentTemp: foundCurrentTemp?.ElementValue[0].Temperature,
      currentCI: foundCurrentCI?.ElementValue[0].ComfortIndexDescription,
      currentWD: foundCurrentW?.ElementValue[0].WindSpeed,
      currentBT: foundCurrentBT?.ElementValue[0].ApparentTemperature,
      foundCurrentWP: foundCurrentWP?.ElementValue[0],
    };
  }, [BT, CI, W, T]);

  const { currentTemp, currentCI, currentWD, currentBT, foundCurrentWP } =
    currentInfo || {};
  return (
    <View className="mb-[75px]">
      <View className="mb-[15px]">
        <View className="flex-row items-baseline">
          <Text className="text-white text-[5rem]">{currentTemp}°c</Text>
          <Text className="text-white text-[2rem]">,{city || ""}</Text>
        </View>
      </View>
      <View className="gap-[7.5px]">
        <View className="flex-row items-baseline gap-3">
          <Ionicons
            name={
              WEATHER?.constant?.WP_CODE?.[foundCurrentWP?.WeatherCode]?.icon
            }
            size={20}
            width={25}
            color="white"
          />
          <Text className="text-2xl text-white font-bold">
            {foundCurrentWP?.Weather}
          </Text>
        </View>
        <View className="flex-row items-baseline gap-3">
          {WEATHER.constant.REAL_FEEL()}
          <Text className="text-md text-white">
            體感溫度: <Text className="text-2xl font-bold">{currentBT}°</Text>
          </Text>
        </View>
        <View className="flex-row items-baseline gap-3">
          {WEATHER.constant.WIND()}
          <Text className="text-md text-white">
            風速:{" "}
            <Text className="text-2xl font-bold">WSW {currentWD} mph</Text>
          </Text>
        </View>
        <View className="flex-row items-baseline gap-3">
          {WEATHER.constant.UV()}
          <Text className="text-md text-white">
            舒適度指數: <Text className="text-2xl font-bold">{currentCI}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherInfo;
