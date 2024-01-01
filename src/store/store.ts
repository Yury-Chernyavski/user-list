import { combineReducers, configureStore } from "@reduxjs/toolkit";
import allUsersSlice from "./reducers/allUsersSlice";
import userSlice from "./reducers/userSlice";

const rootReducer = combineReducers({
  users: allUsersSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
})

export type RootSate = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;

