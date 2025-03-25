export const SET_CURRENT_LOCATION = (location) => {
  return {
    type: "SET_CURRENT_LOCATION",
    payload: location,
  };
};

export const RESET_CURRENT_LOCATION = () => {
  return {
    type: "RESET_CURRENT_LOCATION",
  };
};

export const SET_FOOD_LIST = (payload) => {
  return {
    type: "SET_FOOD_LIST",
    payload,
  };
};

export const RESET_FOOD_LIST = () => {
  return {
    type: "RESET_FOOD_LIST",
  };
};
