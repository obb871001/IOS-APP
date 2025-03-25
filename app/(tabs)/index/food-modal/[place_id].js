import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const initialState = {
  current_opening_hours: {
    open_now: false,
    weekday_text: [],
  },
  editorial_summary: "",
  formatted_address: "",
  formatted_phone_number: "",
  geometry: {
    lat: 0,
    lng: 0,
  },
  name: "",
  photos: [],
  price_level: 0,
  rating: 0,
  reviews: [],
};

const PlaceId = () => {
  const { place_id } = useLocalSearchParams();

  const [foodDetail, setFoodDetail] = useState(initialState);

  useEffect(() => {
    const fetchNearLocation = async () => {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
      const url = "https://maps.googleapis.com/maps/api/place/details/json";
      const language = "zh-TW";

      if (!place_id) return;

      const response = await fetch(
        `${url}?place_id=${place_id}&key=${apiKey}&language=${language}`
      );
      const res = await response.json();

      if (res.status === "OK") {
        const data = res.result;
        setFoodDetail({
          current_opening_hours: {
            // 營業時間
            open_now: data.opening_hours.open_now,
            weekday_text: data.opening_hours.weekday_text,
          },
          editorial_summary: data.editorial_summary, // 編輯摘要
          formatted_address: data.formatted_address, // 完整地址
          formatted_phone_number: data.formatted_phone_number, // 電話
          geometry: {
            // 經緯度
            lat: data.geometry.location.lat,
            lng: data.geometry.location.lng,
          },
          name: data.name, // 名稱
          photos: data.photos, // 圖片
          price_level: data.price_level, // 價格
          rating: data.rating, // 評分
          reviews: data.reviews, // 評論
        });
      }
    };

    fetchNearLocation();
  }, [place_id]);

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-neutral-800">
      {/* 內容區塊：白底、圓角、可捲動 */}
      <ScrollView className="rounded-[30px]">
        <SafeAreaView className="p-4">
          <View className="flex-row items-center justify-between mb-[20px]">
            <Link href="/food">
              <View className="w-[40px] h-[40px] flex-row items-center justify-center rounded-full border-2 border-neutral-500">
                <Ionicons name="arrow-back-outline" size="25" color="white" />
              </View>
            </Link>

            <View>
              <Ionicons name="heart-outline" size="30" color="white" />
            </View>
          </View>

          {/* 評分 / 價格 */}
          {/* 地點名稱 */}
          <Text className="text-[25px] text-white font-bold mb-2">
            {foodDetail.name}
          </Text>
          <Text className="mb-1">評分：{foodDetail.rating} / 5</Text>
          <Text className="mb-2">價格等級：{foodDetail.price_level}</Text>

          {/* 地址 / 電話 */}
          <Text className="mb-1">地址：{foodDetail.formatted_address}</Text>
          <Text className="mb-2">
            電話：{foodDetail.formatted_phone_number}
          </Text>

          {/* 營業狀態 / 營業時間 */}
          <Text className="mb-1">
            狀態：
            {foodDetail.current_opening_hours.open_now ? "營業中" : "未營業"}
          </Text>
          {foodDetail.current_opening_hours.weekday_text.map((text, idx) => (
            <Text key={idx} className="text-gray-600 text-sm">
              {text}
            </Text>
          ))}

          {/* 簡介（editorial_summary） */}
          {foodDetail.editorial_summary ? (
            <Text className="mt-3 mb-2">{foodDetail.editorial_summary}</Text>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    </Animated.View>
  );
};

export default PlaceId;
