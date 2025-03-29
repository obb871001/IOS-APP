import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

let tags = [
  {
    label: "beer",
    label_zh: "啤酒",
  },
  {
    label: "breakfast",
    label_zh: "早餐",
  },
  {
    label: "brunch",
    label_zh: "早午餐",
  },
  {
    label: "dinner",
    label_zh: "晚餐",
  },
  {
    label: "lunch",
    label_zh: "午餐",
  },
  {
    label: "vegetarian_food",
    label_zh: "素食",
  },
  {
    label: "wine",
    label_zh: "酒",
  },
];

const FoodTags = ({ foodDetail }) => {
  return (
    <View className="flex-row gap-[10px]">
      {tags.map((tag, idx) => {
        return foodDetail?.[`serves_${tag.label}`] ? (
          <View
            key={idx}
            className="flex-row bg-green-700 rounded-[30px] px-[10px] py-[2.5px]"
          >
            {/* <Ionicons name={"checkmark"} size={12} color={"white"} /> */}
            <Text className="text-[10px] font-semibold text-white">
              {tag.label_zh}
            </Text>
          </View>
        ) : null;
      })}
    </View>
  );
};

export default FoodTags;
