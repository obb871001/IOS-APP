import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrevButton = ({
  prevPath = "", //上一頁路徑
}) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between mb-[0px]">
      <Link href={prevPath || -1}>
        <View className="w-[40px] h-[40px] flex-row items-center justify-center rounded-full bg-[rgba(115,115,115,0.6)]">
          <Ionicons name="arrow-back-outline" size="25" color="white" />
        </View>
      </Link>

      <View>
        <Ionicons name="heart-outline" size="30" color="white" />
      </View>
    </View>
  );
};

export default PrevButton;
