import React from "react";
import { Text, View } from "react-native";

const FoodDescription = ({
  descriptionTitle = "", //描述標題
  descriptionValue = "", //描述值
  className, //自定義樣式
}) => {
  return (
    <View className="flex-row">
      <Text className={`${className}`}>{descriptionTitle}：</Text>
      <Text className={`font-semibold ${className}`}>{descriptionValue}</Text>
    </View>
  );
};

export default FoodDescription;
