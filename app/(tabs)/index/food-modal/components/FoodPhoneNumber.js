import React from "react";
import { Clipboard, Linking, Platform, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const FoodPhoneNumber = ({
  phoneNumber, //電話
}) => {
  const handlePress = () => {
    // Clipboard.setString(phoneNumber);
    // Toast.show({
    //   type: "success",
    //   text1: "已複製地址",
    // });
    const phone = `tel:${phoneNumber}`;

    if (phone) {
      Linking.openURL(phone).catch((err) =>
        console.error("Error opening map: ", err)
      );
    }
  };
  return (
    <View className="flex-row">
      <Text className={`text-lg text-white`}>電話：</Text>
      <Text
        onPress={handlePress}
        className={`font-semibold text-lg text-white`}
      >
        {phoneNumber}
      </Text>
    </View>
  );
};

export default FoodPhoneNumber;
