import { Link, Stack } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundWrapper from "../../components/backgroundWrapper";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import PrevButton from "../../components/PrevButton";
import { Ionicons } from "@expo/vector-icons";
import FoodRate from "./food-modal/components/FoodRate";
import { GOOGLE_API } from "../../api/get";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const Food = () => {
  const FOOD_LIST = useSelector((state) => state.FOOD_LIST);
  const { foodList, foodLength } = FOOD_LIST;
  return (
    <BackgroundWrapper>
      <ScrollView>
        <SafeAreaView className="p-4">
          <View className="mb-[10px]">
            <PrevButton />
          </View>
          <Text className="text-white text-[30px] mb-[20px]">
            附近所有的美食...
          </Text>
          <View className="flex-col gap-[15px]">
            {foodList?.map((food, index) => {
              return (
                <Link href={`/food-modal/${food.place_id}`}>
                  <View
                    key={`${food.name}-${index}`}
                    className="w-full bg-[rgba(0,0,0,0.7)] px-2 py-2 rounded-[15px] flex-row items-center justify-between gap-[10px]"
                  >
                    <View>
                      <Image
                        source={{
                          uri: `${GOOGLE_API.PLACE_PHOTO}?maxwidth=400&maxheight=400&photoreference=${food.photos[0].photo_reference}&key=${apiKey}`,
                        }}
                        className="w-[80px] h-[80px] rounded-[10px]"
                      />
                    </View>
                    <View className="flex-col flex-1 gap-[10px] max-w-[90%]">
                      <View className="flex-col gap-[2.5px]">
                        {/* 名稱 */}
                        <Text
                          numberOfLines={1}
                          className="text-white text-[18px] font-bold"
                        >
                          {food.name}
                        </Text>
                        {/* 評分 */}
                        <FoodRate rate={food.rating} starSize={12} />
                      </View>
                      <View className="flex-row gap-[5px]">
                        <Ionicons color="white" size="15" name="navigate" />
                        <Text
                          numberOfLines={1}
                          className="text-white text-[12px]"
                        >
                          {food.vicinity}
                        </Text>
                      </View>
                    </View>
                    <View className="">
                      <Ionicons
                        color="white"
                        name="chevron-forward-outline"
                        size="20"
                      />
                    </View>
                  </View>
                </Link>
              );
            })}
          </View>
        </SafeAreaView>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Food;
