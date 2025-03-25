const initialState = {
  city: "",
  area: "",
  fullAddress: "",
};

const CURRENT_LOCATION = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_LOCATION":
      return action.payload;
    case "RESET_CURRENT_LOCATION":
      return initialState;
    default:
      return initialState;
  }
};
export default CURRENT_LOCATION;
