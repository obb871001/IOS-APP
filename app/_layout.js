import { Stack } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Wrapper from "./wrapper";
import { ImageBackground } from "react-native";
import CustomToast from "./components/CustomToast";

const Layout = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Wrapper>
      <CustomToast />
    </Provider>
  );
  r;
};

export default Layout;
