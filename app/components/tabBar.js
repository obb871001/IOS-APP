import { View, Platform } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const TabBar = ({ state, descriptors, navigation } = {}) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View
      className="absolute bottom-[15px] gap-[0.5%] flex-row justify-between items-center"
      style={{
        marginHorizontal: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const renderIcon = () => {
          if (typeof options.tabBarIcon === "function") {
            return options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? "#141412" : "#868883",
              size: 24,
            });
          }
          return null;
        };
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            className={`w-[calc(97.5%/4)] gap-[5px] py-[15px] ${
              isFocused ? "bg-[#FFFFFF]" : "bg-[#232420]"
            } flex items-center justify-center rounded-full`}
          >
            {renderIcon()}
            <Text style={{ color: isFocused ? "#141412" : "#868883" }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default TabBar;
