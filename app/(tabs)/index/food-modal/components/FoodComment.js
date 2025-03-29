import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { GOOGLE_API } from "../../../../api/get";
import Star from "./star";
import FoodRate from "./FoodRate";
import Divider from "../../../../components/Divider";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const FoodComment = ({ reviews }) => {
  const scrollOffset = useSharedValue(0);

  const onPageScroll = (event) => {
    const { position, offset } = event.nativeEvent;
    scrollOffset.value = position + offset;
  };

  return (
    <AnimatedPager
      style={styles.container}
      initialPage={0}
      onPageScroll={onPageScroll}
      key={reviews.length}
      pageMargin={10}
    >
      {reviews.map((data, idx) => {
        return (
          <CarouselPage
            key={`${idx}`}
            idx={idx}
            scrollOffset={scrollOffset}
            data={data}
          />
        );
      })}
    </AnimatedPager>
  );
};

const CarouselPage = ({ idx, scrollOffset, data }) => {
  const {
    author_name,
    author_url,
    profile_photo_url,
    rating,
    relative_time_description,
    text,
  } = data;

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [idx - 1, idx, idx + 1],
      [0.1, 1, 0.1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <ScrollView
      style={styles.container}
      className="p-4 bg-neutral-800 rounded-[20px]"
    >
      <Animated.View className="gap-[10px]" style={[animatedStyle]}>
        <View className="flex-row gap-[10px] items-center justify-between">
          <View className="flex-row gap-[10px] items-center">
            <Image
              source={{ uri: profile_photo_url }}
              className="w-[30px] h-[30px]"
            />
            <Text className="text-white text-lg font-bold">{author_name}</Text>
            <FoodRate rate={rating} starSize={15} hiddenText />
          </View>
          <View>
            <Text className="text-neutral-50">{relative_time_description}</Text>
          </View>
        </View>
        <Divider className="border-neutral-500" />
        <View>
          <Text className="text-white">{text}</Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default FoodComment;
