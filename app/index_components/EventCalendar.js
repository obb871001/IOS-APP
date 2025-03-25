import { View, Pressable, Text } from "react-native";
import generateDayRangeData from "../../utils/generateDayRangeData";

const EventCalendar = ({ setCurrentDay, currentDay } = {}) => {
  const dayRangeData = generateDayRangeData();

  const handlePressCalendar = (date, disabled) => {
    if (disabled) return;
    setCurrentDay(date);
  };

  return (
    <View className="mb-[10px]">
      <Text className="font-medium text-white text-2xl mb-[10px]">
        Event Calendar
      </Text>

      <View className="flex-row flex-wrap">
        {dayRangeData.map((day, index) => {
          const isFirstRow = index < 7;
          const isBeforeOrAfterToday = day.isBeforeToday || day.isAfterThreeDay;
          const isBeforeTodayBoxStyle = isBeforeOrAfterToday
            ? "opacity-50"
            : "";
          const isTodayBoxStyle =
            day.date === currentDay
              ? "bg-white border-white"
              : "bg-[rgba(0,0,0,0.4)]";
          const isTodayTextStyle =
            day.date === currentDay ? "text-black" : "text-white";

          return (
            <View
              key={day.dayNumber}
              className="w-[14%] flex-col items-center justify-center mb-[15px]"
            >
              {isFirstRow && (
                <Text className="text-white text-center mb-[15px] text-sm text-gray-200">
                  {day.dayLabel}
                </Text>
              )}
              <Pressable
                onPress={() =>
                  handlePressCalendar(day.date, isBeforeOrAfterToday)
                }
                className={`${isBeforeTodayBoxStyle} ${isTodayBoxStyle} items-center justify-center w-[40px] h-[40px] rounded-full border border-gray-400`}
              >
                <Text className={`${isTodayTextStyle} text-center text-lg`}>
                  {day.dayNumber}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default EventCalendar;
