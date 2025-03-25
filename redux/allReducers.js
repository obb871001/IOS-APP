import { combineReducers } from "redux";
import CURRENT_LOCATION from "./reducers/currentLocation";
import FOOD_LIST from "./reducers/foodList";

const AllReducers = combineReducers({
  CURRENT_LOCATION: CURRENT_LOCATION,
  FOOD_LIST: FOOD_LIST,
});

export default AllReducers;
