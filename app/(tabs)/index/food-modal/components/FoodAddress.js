import React from "react";
import { Clipboard, Linking, Platform, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const FoodAddress = ({
  address, //地址
  geometry, //經緯度
  foodName, //食物名稱
}) => {
  const { lat, lng } = geometry;
  const handlePress = () => {
    const scheme = Platform.select({
      ios: `maps://?q=${foodName}&ll=${lat},${lng}`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch((err) =>
        console.error("Error opening map: ", err)
      );
    }
  };
  return (
    <View className="flex-row">
      <Text className={`text-lg text-white`}>地址：</Text>
      <Text
        onPress={handlePress}
        className={`font-semibold text-lg text-white`}
      >
        {address}
      </Text>
    </View>
  );
};

export default FoodAddress;
