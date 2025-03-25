import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrevButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="h-[40px] flex-row items-center justify-start rounded-full gap-[5px]"
    >
      <Ionicons name="chevron-back-outline" color="white" size="40" />
      <Text className="text-white text-[20px]">返回</Text>
    </TouchableOpacity>
  );
};

export default PrevButton;
