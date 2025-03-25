import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="food"
        options={{
          headerShown: false,
          title: "附近所有的美食",
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "首頁",
        }}
      />
      <Stack.Screen
        name="food-modal/[place_id]"
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
    </Stack>
  );
};

export default Layout;
