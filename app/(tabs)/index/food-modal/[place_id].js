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
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const PlaceId = () => {
  const { place_id } = useLocalSearchParams();

  const [foodDetail, setFoodDetail] = useState(initialState);

  const foodCarousel = useMemo(() => {
    return (
      <PagerView
        key={foodDetail.photos.length}
        overScrollMode="auto"
        pageMargin={20}
        style={styles.container}
        initialPage={0}
      >
        {foodDetail.photos.map((photo, idx) => {
          return (
            <View className="items-center justify-center" key={`${idx + 1}`}>
              <Image
                className="w-full h-full rounded-[15px]"
                source={{
                  uri: `${GOOGLE_API.PLACE_PHOTO}?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`,
                }}
              />
            </View>
          );
        })}
      </PagerView>
    );
  }, [foodDetail]);

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
        });
      }
    };

    fetchNearLocation();
  }, [place_id]);

  console.log(foodDetail.editorial_summary);
  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-neutral-800">
      {/* 內容區塊：白底、圓角、可捲動 */}
      <ScrollView className="rounded-[30px]">
        <SafeAreaView className="p-4 gap-[10px]">
          <View className="flex-row items-center justify-between mb-[0px]">
            <Link href="/food">
              <View className="w-[40px] h-[40px] flex-row items-center justify-center rounded-full border-2 border-neutral-500">
                <Ionicons name="arrow-back-outline" size="25" color="white" />
              </View>
            </Link>

            <View>
              <Ionicons name="heart-outline" size="30" color="white" />
            </View>
          </View>
          {/* 食物圖片 */}
          <View className="mb-[10px]">{foodCarousel}</View>

          <View>
            {/* 店名 */}
            <Text className="text-[25px] text-white font-semibold mb-2">
              {foodDetail.name}
            </Text>
            {/* 評分 */}
            <FoodRate rate={foodDetail.rating} />
          </View>

          {/* 餐廳狀態 */}
          <View>
            <FoodStatus
              openNow={foodDetail.current_opening_hours.open_now}
              openingHours={foodDetail.current_opening_hours.weekday_text}
            />
          </View>

          <View className="gap-[0px]">
            {/* 價格等級 */}
            <View>
              <FoodDescription
                className="text-lg text-white"
                descriptionTitle="價格等級"
                descriptionValue={PRICE_LEVEL[foodDetail.price_level]}
              />
            </View>

            {/* 地址  */}
            <View>
              <FoodDescription
                className="text-lg text-white"
                descriptionTitle="餐廳地址"
                descriptionValue={foodDetail.formatted_address}
              />
            </View>

            {/* 電話 */}
            <View>
              <FoodDescription
                className="text-lg text-white"
                descriptionTitle="電話"
                descriptionValue={foodDetail.formatted_phone_number}
              />
            </View>
          </View>

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
