import { Link, Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
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
          <View className="flex-col gap-[20px]">
            {foodList?.map((food, index) => {
              return (
                <Link href={`/food-modal/${food.place_id}`}>
                  <View className="w-full bg-neutral-800 rounded-[15px] overflow-hidden">
                    <View>
                      <Image
                        source={{
                          uri: `${GOOGLE_API.PLACE_PHOTO}?maxwidth=400&maxheight=400&photoreference=${food.photos[0].photo_reference}&key=${apiKey}`,
                        }}
                        className="w-full h-[150px]"
                      />
                    </View>
                    <View
                      key={`${food.name}-${index}`}
                      className="p-4 flex-row items-center justify-between gap-[20px]"
                    >
                      <View className="flex-col gap-[10px] max-w-[90%]">
                        <View className="flex-col gap-[2.5px]">
                          <Text
                            numberOfLines={1}
                            className="text-white text-[23px] font-bold"
                          >
                            {food.name}
                          </Text>
                          <FoodRate rate={food.rating} starSize={17.5} />
                        </View>
                        {/* <Text className="text-white text-[18px]">
                          地址：{food.vicinity}
                        </Text> */}
                      </View>
                      <View className="">
                        <Ionicons
                          color="white"
                          name="chevron-forward-outline"
                          size="20"
                        />
                      </View>
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
