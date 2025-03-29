import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SET_FOOD_LIST } from "../../redux/action/action";

const CurrentLocationCard = () => {
  const router = useRouter();

  const CURRENT_LOCATION = useSelector((state) => state.CURRENT_LOCATION);
  const FOOD_LIST = useSelector((state) => state.FOOD_LIST);
  const dispatch = useDispatch();

  const { city, lat, lng, place_id } = CURRENT_LOCATION;

  const { foodList, foodLength } = FOOD_LIST;

  const locationProps = useMemo(() => {
    if (!lat || !lng) return;
    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [lat, lng]);

  useEffect(() => {
    const fetchNearLocation = async () => {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
      const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
      const keyword = "";
      const radius = 1000;
      const type = "restaurant";
      const language = "zh-TW";

      if (!lat || !lng) return;

      const response = await fetch(
        `${url}?keyword=${keyword}&location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}&language=${language}`
      );
      const res = await response.json();

      const data = res.results;

      dispatch(
        SET_FOOD_LIST({
          foodList: data,
          foodLength: data.length,
        })
      );
    };

    fetchNearLocation();
  }, [lng, lat]);
  return (
    <View className="w-full h-[250px] flex-row gap-[10px]">
      <View className="w-[50%] h-full rounded-[20px] overflow-hidden">
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={locationProps}
          region={locationProps}
          provider={PROVIDER_DEFAULT}
          showsUserLocation
          scrollEnabled={false}
        />
      </View>
      <View className="flex-1 h-full rounded-[20px] overflow-hidden flex flex-col gap-[5px]">
        {/* 美食數量 */}
        <View className="w-full h-[65%] bg-[rgba(0,0,0,0.6)] p-4 rounded-[20px] blur-xl flex-col justify-between">
          <View className="flex-row justify-between gap-[10px]">
            {" "}
            <View className="flex-row justify-between gap-[5px] items-baseline">
              <Text className="text-white text-[40px] font-semibold">
                {foodLength}
              </Text>
              <Text className="text-white text-[20px] font-bold">間</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/food")}
              className="w-[40px] h-[40px] bg-white flex-row items-center justify-center rounded-full"
            >
              <Ionicons name="arrow-forward-outline" size="20" />
            </TouchableOpacity>
          </View>
          <Text className="text-white text-[16px] font-semibold">附近美食</Text>
        </View>

        {/* 搜尋其他條件 */}
        <View className="w-full h-[35%] bg-[rgba(0,0,0,0.6)] p-4 rounded-[20px] blur-xl flex-row items-center justify-between">
          <View className="flex-row justify-between gap-[5px]">
            <Text className="text-white text-[18px] font-semibold">
              搜尋其他類型
            </Text>
          </View>
          <View className="flex-row items-center justify-center">
            <Ionicons color="white" name="chevron-forward-outline" size="20" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentLocationCard;
