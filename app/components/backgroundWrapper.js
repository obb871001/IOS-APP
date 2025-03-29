import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";

const BackgroundWrapper = ({ children }) => {
  return (
    <View className="flex-1">
      <StatusBar barStyle={"light-content"} />
      <ImageBackground
        source={require("../../assets/images/evening-bg.jpg")}
        imageStyle={{
          opacity: 1,
        }}
        blurRadius={1}
        className="flex-1 pb-[80px]"
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundWrapper;
