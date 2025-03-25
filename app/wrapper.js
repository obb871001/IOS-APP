import React from "react";
import useGetCurrentLocation from "../hooks/useGetCurrentLocation";
import { ImageBackground } from "react-native";

const Wrapper = ({ children }) => {
  const location = useGetCurrentLocation();

  return <>{children}</>;
};

export default Wrapper;
