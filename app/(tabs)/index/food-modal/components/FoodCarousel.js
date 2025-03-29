import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { GOOGLE_API } from "../../../../api/get";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
  },
  image: {
    width: width * 1,
    height: 400,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const FoodCarousel = ({ foodDetail }) => {
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
      key={foodDetail.photos.length}
    >
      {foodDetail.photos.map((photo, idx) => {
        return (
          <CarouselPage
            key={`${idx}`}
            idx={idx}
            scrollOffset={scrollOffset}
            photo={photo}
          />
        );
      })}
    </AnimatedPager>
  );
};

const CarouselPage = ({ idx, scrollOffset, photo }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [idx - 1, idx, idx + 1],
      [0.85, 1, 0.85],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollOffset.value,
      [idx - 1, idx, idx + 1],
      [0.1, 0.7, 0.1],
      Extrapolation.CLAMP
    );

    return {
      //   transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.page}>
      <Animated.Image
        style={[styles.image, animatedStyle]}
        source={{
          uri: `${GOOGLE_API.PLACE_PHOTO}?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`,
        }}
      />
    </View>
  );
};

export default FoodCarousel;
