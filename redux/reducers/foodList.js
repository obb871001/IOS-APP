const initialState = {
  foodList: [],
  foodLength: 0,
};

const FOOD_LIST = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FOOD_LIST":
      return action.payload;
    case "RESET_FOOD_LIST":
      return initialState;
    default:
      return initialState;
  }
};
export default FOOD_LIST;
