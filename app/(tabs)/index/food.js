import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import BackgroundWrapper from "../../components/backgroundWrapper";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import PrevButton from "../../components/PrevButton";
import { Ionicons } from "@expo/vector-icons";
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
                    className="w-full bg-[rgba(0,0,0,0.7)] p-4 rounded-[15px] flex-row items-center justify-between gap-[20px]"
                  >
                    <View className="flex-col gap-[10px] max-w-[90%]">
                      <Text className="text-white text-[23px] font-bold">
                        {food.name}
                      </Text>
                      <Text className="text-white text-[18px]">
                        地址：{food.vicinity}
                      </Text>
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
