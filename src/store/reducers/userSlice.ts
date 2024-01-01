import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models";

interface IUserState {
  userData: IUser | null,
}


const initialState: IUserState = {
  userData: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = {...action.payload};
    },
    deleteUserData(state) {
      state.userData = null;
    }
  }
});


export const { setUser, deleteUserData } = userSlice.actions;
export default userSlice.reducer;
