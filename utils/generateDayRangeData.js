import dayjs from "dayjs";

const generateDayRangeData = () => {
  const referenceDate = dayjs();

  const days = [];
  for (let i = -1; i <= 12; i++) {
    const current = referenceDate.add(i, "day");

    const dayIndex = current.day();
    const dayOfWeek = dayIndex;

    const weekMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayLabel = weekMap[dayOfWeek];
    const isBeforeToday = current.isBefore(referenceDate, "day");
    const isAfterThreeDay = current
      .add(-2, "day")
      .isAfter(referenceDate, "day");
    const isToday = current.isSame(referenceDate, "day");
    const date = current.format("YYYY-MM-DD");

    days.push({
      dayLabel,
      dayNumber: current.date(),
      dayOfWeek,
      isBeforeToday,
      isAfterThreeDay,
      isToday,
      date,
    });
  }
  return days;
};

export default generateDayRangeData;
