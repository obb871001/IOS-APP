import React, { useMemo } from "react";
import { Text, View } from "react-native";
import Star from "./star";

const FoodRate = ({ rate = 0, starSize, hiddenText } = {}) => {
  const splitRate = useMemo(() => {
    const fullStars = Math.floor(rate); // 整數部分
    const halfStar = rate % 1 === 0.5 ? [0.5] : []; // 小數部分
    return [...Array(fullStars).fill(1), ...halfStar];
  }, [rate]);

  return (
    <View className="flex-row gap-[5px] items-center">
      <View className="flex-row gap-[2.5px]">
        {splitRate.map((star, idx) => {
          return (
            <View key={idx}>
              <Star color="#FEC700" size={starSize || 20} rate={star} />
            </View>
          );
        })}
      </View>
      {hiddenText ? null : (
        <Text className="text-[14px] text-white">{rate}</Text>
      )}
    </View>
  );
};

export default FoodRate;
