import { Ionicons } from "@expo/vector-icons";

const Star = (props) => {
  const { rate } = props || {};
  return <Ionicons name={rate == 1 ? "star" : "star-half"} {...props} />;
};

export default Star;
