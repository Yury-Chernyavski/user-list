import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/usersSlice";

const rootReducer = combineReducers({
  users: usersSlice,
});

const store = configureStore({
  reducer: rootReducer,
})

export type RootSate = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;

