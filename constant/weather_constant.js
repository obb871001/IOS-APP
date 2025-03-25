import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const WEATHER = {
  constant: {
    REAL_FEEL: (props) => {
      return (
        <FontAwesome6
          name="temperature-quarter"
          size={20}
          width={25}
          color="white"
          {...props}
        />
      );
    },
    WIND: (props) => {
      return (
        <MaterialCommunityIcons
          name="windsock"
          size={20}
          width={25}
          color="white"
          {...props}
        />
      );
    },
    UV: (props) => {
      return (
        <Feather name="sunset" size={20} width={25} color="white" {...props} />
      );
    },
    WP_CODE: {
      "01": { code: 1, icon: "sunny-outline", description: "晴天" },
      "02": { code: 2, icon: "partly-sunny-outline", description: "晴時多雲" },
      "03": { code: 3, icon: "cloud-outline", description: "多雲時晴" },
      "04": { code: 4, icon: "cloudy-outline", description: "多雲" },
      "05": { code: 5, icon: "cloudy-night-outline", description: "多雲時陰" },
      "06": { code: 6, icon: "cloudy-night-outline", description: "陰時多雲" },
      "07": { code: 7, icon: "cloudy", description: "陰天" },
      "08": { code: 8, icon: "rainy-outline", description: "多雲陣雨" },
      "09": { code: 9, icon: "rainy-outline", description: "多雲時陰短暫雨" },
      10: { code: 10, icon: "rainy-outline", description: "陰時多雲短暫雨" },
      11: { code: 11, icon: "rainy", description: "雨天" },
      12: { code: 12, icon: "rainy-outline", description: "多雲時陰有雨" },
      13: { code: 13, icon: "rainy-outline", description: "陰時多雲有雨" },
      14: { code: 14, icon: "rainy", description: "陰有雨" },
      15: {
        code: 15,
        icon: "thunderstorm-outline",
        description: "多雲陣雨或雷雨",
      },
      16: {
        code: 16,
        icon: "thunderstorm-outline",
        description: "多雲時陰陣雨或雷雨",
      },
      17: { code: 17, icon: "thunderstorm", description: "陰時多雲有雷陣雨" },
      18: { code: 18, icon: "thunderstorm", description: "陰有陣雨或雷雨" },
      19: { code: 19, icon: "rainy-outline", description: "晴午後多雲局部雨" },
      20: { code: 20, icon: "rainy-outline", description: "多雲午後局部雨" },
      21: {
        code: 21,
        icon: "thunderstorm-outline",
        description: "晴午後陣雨或雷雨",
      },
      22: {
        code: 22,
        icon: "thunderstorm-outline",
        description: "多雲午後陣雨或雷雨",
      },
      23: { code: 23, icon: "snow-outline", description: "有雨或雪" },
      24: { code: 24, icon: "cloudy-outline", description: "晴有霧" },
      25: { code: 25, icon: "cloudy-outline", description: "晴時多雲有霧" },
      26: { code: 26, icon: "cloudy-outline", description: "多雲時晴有霧" },
      27: { code: 27, icon: "cloudy-outline", description: "多雲有霧" },
      28: { code: 28, icon: "cloudy-outline", description: "陰有霧" },
      29: { code: 29, icon: "rainy-outline", description: "多雲局部雨" },
      30: { code: 30, icon: "rainy-outline", description: "陰局部雨" },
      31: { code: 31, icon: "rainy-outline", description: "多雲有霧有局部雨" },
      32: {
        code: 32,
        icon: "rainy-outline",
        description: "多雲時陰有霧有局部雨",
      },
      33: {
        code: 33,
        icon: "thunderstorm-outline",
        description: "多雲局部陣雨或雷雨",
      },
      34: {
        code: 34,
        icon: "thunderstorm-outline",
        description: "多雲時陰局部陣雨或雷雨",
      },
      35: {
        code: 35,
        icon: "thunderstorm-outline",
        description: "多雲有陣雨或雷雨有霧",
      },
      36: {
        code: 36,
        icon: "thunderstorm-outline",
        description: "多雲時陰有陣雨或雷雨有霧",
      },
      37: { code: 37, icon: "snow-outline", description: "多雲局部雨或雪有霧" },
      38: { code: 38, icon: "rainy-outline", description: "短暫陣雨有霧" },
      39: { code: 39, icon: "rainy-outline", description: "有雨有霧" },
      41: {
        code: 41,
        icon: "thunderstorm-outline",
        description: "短暫陣雨或雷雨有霧",
      },
      42: { code: 42, icon: "snow", description: "下雪" },
    },
  },
};

module.exports = WEATHER;
