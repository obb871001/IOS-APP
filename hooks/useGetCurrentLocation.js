import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Platform, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { SET_CURRENT_LOCATION } from "../redux/action/action";

const useGetCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      dispatch(SET_CURRENT_LOCATION(currentLocation));
    }
  }, [currentLocation]);

  useEffect(() => {
    const { coords } = location || {};
    if (coords?.latitude && coords?.longitude) {
      const fetchLocation = async () => {
        const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
        const url = process.env.EXPO_PUBLIC_GOOGLE_GEOCODE_API_URL;

        const response = await fetch(
          `${url}?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}&language=zh-TW`
        );
        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          // 拿到第一筆地址資訊
          const result = data.results[0];

          //完整地址
          const fullAddress = result.formatted_address;
          setCurrentLocation((prev) => ({
            ...prev,
            fullAddress,
            lat: coords.latitude,
            lng: coords.longitude,
            place_id: result.place_id,
          }));
          const addressComponents = result.address_components;
          // 在台灣常見 "administrative_area_level_1" 或 "administrative_area_level_2" 代表縣市
          // "locality" 代表市轄區等
          addressComponents.forEach((component) => {
            if (component.types.includes("administrative_area_level_1")) {
              const city = component.long_name; //縣市
              setCurrentLocation((prev) => ({ ...prev, city }));
            }
            if (component.types.includes("administrative_area_level_2")) {
              const area = component.long_name; //區/鄉/鎮
              setCurrentLocation((prev) => ({ ...prev, area }));
            }
          });
        } else {
          console.log("無法取得反向地理編碼資訊", data.status);
        }
      };

      fetchLocation();
    }
  }, [location]);
  return currentLocation;
};

export default useGetCurrentLocation;
