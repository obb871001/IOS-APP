import React from "react";
import Toast, { BaseToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#57534D",
        borderLeftColor: "#4AC951",
        height: 45,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "#fff",
      }}
    />
  ),
};

const CustomToast = () => {
  return <Toast topOffset={50} visibilityTime={1500} config={toastConfig} />;
};

export default CustomToast;
