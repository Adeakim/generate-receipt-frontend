import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoginReducer from "./auth/login.reducer";
import SignupReducer from "./auth/signup.reducer";
import userProfileReducer from "./userprofile.reducer";
import generateReceiptReducer from "./generate_receipt.reducer";



const persistConfig = {
  key: "generate_receipt",
  storage,
  // whiteList: ["user", "courses", "cart"],
};

const rootReducer = combineReducers({
 
  login: LoginReducer,
  signup: SignupReducer,
  user: userProfileReducer,
  generateReceipt: generateReceiptReducer

});

export default persistReducer(persistConfig, rootReducer)
