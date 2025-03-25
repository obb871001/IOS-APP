import { createStore } from "redux";
import AllReducers from "./allReducers";

export const store = createStore(AllReducers);
