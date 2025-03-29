import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

const FoodStatus = ({
  openNow, // 是否營業中
  openingHours, // 營業時間
}) => {
  const [expanded, setExpanded] = useState(false);
  const [todayHours, setTodayHours] = useState("");

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const today = dayjs().day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    if (openingHours && openingHours.length > today) {
      setTodayHours(openingHours[today]);
    }
  }, [openingHours]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) {
      height.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(0, { duration: 100 });
    } else {
      height.value = withTiming(openingHours.length * 24, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  return (
    <View>
      <View className="flex-row gap-[5px] items-center">
        <View
          className="w-[25px] h-[25px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: openNow ? "green" : "red",
          }}
        >
          <Ionicons
            name={openNow ? "checkmark" : "close"}
            size={17}
            color={"white"}
          />
        </View>
        <Text style={{ color: "white" }}>{openNow ? "營業中" : "休息中"}</Text>
        <Text style={{ color: "white" }}>|</Text>
        <View className="flex-row gap-[5px] items-center">
          {openNow && todayHours && (
            <Text className="text-white">{todayHours}</Text>
          )}
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
            onPress={toggleExpand}
          />
        </View>
      </View>
      <Animated.View
        className={`gap-[5px] rounded-[15px] px-4 bg-[rgba(0,0,0,0.5)]`}
        style={[animatedStyles]}
      >
        {openingHours.map((text, idx) => {
          const splitOpeningText = text.split(": ");

          const dayOfWeek = splitOpeningText[0]; // 星期幾
          const openingTime = splitOpeningText[1]; // 營業時間

          return (
            <View
              key={idx}
              className={`${idx === 0 ? "mt-[10px]" : ""} flex-row`}
            >
              <Text className={`text-gray-300 text-[14px]`}>{dayOfWeek}：</Text>
              <Text key={idx} className={`font-bold text-gray-300 text-[14px]`}>
                {openingTime}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default FoodStatus;
