import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GOOGLE_API } from "../../../api/get";
import PagerView from "react-native-pager-view";
import Star from "./components/star";
import FoodRate from "./components/FoodRate";
import FoodDescription from "./components/FoodDescription";
import { PRICE_LEVEL } from "./utils/constants";
import FoodStatus from "./components/FoodStatus";
import FoodCarousel from "./components/FoodCarousel";
import FoodComment from "./components/FoodComment";
import FoodTags from "./components/FoodTags";
import FoodAddress from "./components/FoodAddress";
import FoodPhoneNumber from "./components/FoodPhoneNumber";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

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
  serves_beer: false,
  serves_breakfast: false,
  serves_brunch: false,
  serves_dinner: false,
  serves_lunch: false,
  serves_vegetarian_food: false,
  serves_wine: false,
};

const PlaceId = () => {
  const { place_id } = useLocalSearchParams();

  const [foodDetail, setFoodDetail] = useState(initialState);

  useEffect(() => {
    const fetchNearLocation = async () => {
      const url = GOOGLE_API.PLACE_DETAIL;
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
          serves_beer: data.serves_beer, // 是否提供啤酒
          serves_breakfast: data.serves_breakfast, // 是否提供早餐
          serves_brunch: data.serves_brunch, // 是否提供早午餐
          serves_dinner: data.serves_dinner, // 是否提供晚餐
          serves_lunch: data.serves_lunch, // 是否提供午餐
          serves_vegetarian_food: data.serves_vegetarian_food, // 是否提供素食
          serves_wine: data.serves_wine, // 是否提供酒
        });
      }
    };

    fetchNearLocation();
  }, [place_id]);

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-neutral-900">
      {/* 內容區塊：白底、圓角、可捲動 */}
      <ScrollView className="rounded-[30px]">
        <SafeAreaView className="gap-[10px]">
          <View className="mb-[0px] absolute h-[400px] w-full">
            <FoodCarousel foodDetail={foodDetail} />
          </View>
          <View className="p-4 h-[340px] justify-between">
            <View className="flex-row items-center justify-between mb-[0px]">
              <Link href="/food">
                <View className="w-[40px] h-[40px] flex-row items-center justify-center rounded-full bg-[rgba(115,115,115,0.6)]">
                  <Ionicons name="arrow-back-outline" size="25" color="white" />
                </View>
              </Link>

              <View>
                <Ionicons name="heart-outline" size="30" color="white" />
              </View>
            </View>
            {/* 食物圖片 */}

            <View className="gap-[10px]">
              {/* 店名 */}
              <Text
                numberOfLines={1}
                className="text-[25px] text-white font-semibold"
              >
                {foodDetail.name}
              </Text>
              {/* 餐廳狀態 */}
              <View>
                <FoodStatus
                  openNow={foodDetail.current_opening_hours.open_now}
                  openingHours={foodDetail.current_opening_hours.weekday_text}
                />
              </View>
              {/* 評分 */}
              <FoodRate rate={foodDetail.rating} />
            </View>
          </View>
          <View className="px-4 gap-[10px]">
            <View>
              <FoodTags foodDetail={foodDetail} />
            </View>
            <View className="gap-[0px]">
              {/* 地址  */}
              <View>
                <FoodAddress
                  className="text-lg text-white"
                  address={foodDetail.formatted_address}
                  geometry={foodDetail.geometry}
                  foodName={foodDetail.name}
                />
              </View>

              {/* 電話 */}
              <View>
                <FoodPhoneNumber
                  phoneNumber={foodDetail.formatted_phone_number}
                />
              </View>
            </View>

            <View>
              <FoodComment reviews={foodDetail.reviews} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Animated.View>
  );
};

export default PlaceId;
