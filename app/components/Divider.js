import React from "react";
import { View } from "react-native";

const Divider = ({ className }) => {
  return (
    <View className={`border-t  ${className || "border-gray-300"}`}></View>
  );
};

export default Divider;
