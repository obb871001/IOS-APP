import { Stack } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Wrapper from "./wrapper";
import { ImageBackground } from "react-native";

const Layout = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Wrapper>
    </Provider>
  );
  r;
};

export default Layout;
