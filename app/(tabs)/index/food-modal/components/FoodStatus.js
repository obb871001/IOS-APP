import React, { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

const FoodStatus = ({ openNow, openingHours }) => {
  const [expanded, setExpanded] = useState(false);
  const [todayHours, setTodayHours] = useState("");
  const [height, setHeight] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const today = dayjs().day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    if (openingHours && openingHours.length > today) {
      setTodayHours(openingHours[today]);
    }
  }, [openingHours]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(height, {
      toValue: expanded ? 0 : openingHours.length * 23, // Adjust based on your text height
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <View className="flex-row gap-[5px] items-center">
        <Ionicons
          name={openNow ? "checkmark" : "close"}
          size={25}
          color={openNow ? "green" : "red"}
        />
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
      <Animated.View className={`gap-[5px]`} style={{ height, opacity }}>
        {openingHours.map((text, idx) => (
          <Text key={idx} className="text-gray-500 text-[12px]">
            {text}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

export default FoodStatus;
