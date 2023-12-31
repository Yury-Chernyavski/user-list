import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAllUsers, IUser, TAddUser } from "../../models";
import UsersService from "../../services/UsersService";
import { AxiosError } from "axios";

interface IUsersStore {
  usersList: IAllUsers | null,
  loading: boolean,
  error: string | null,
}

const initialState: IUsersStore = {
  usersList: null,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk<IAllUsers, {per_page?: number, page?: number}, { rejectValue: string }>(
  "users/fetch",
  async function ({per_page}, { rejectWithValue }) {
    try {
      const response = await UsersService.getAllUsers(per_page);
      return response.data;
    } catch (err) {
      const errorMessage = (err as Error | AxiosError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const addUser = createAsyncThunk<IUser, TAddUser, { rejectValue: string }>(
  "users/add",
  async function (newUser, { rejectWithValue }) {
    try {
      const response = await UsersService.addUser(newUser);
      return response
    } catch (err) {
      const errorMessage = (err as Error | AxiosError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
  "users/delete",
  async function (id, { rejectWithValue }) {
    try {
      await UsersService.deleteUser(id);
      return id;
    } catch (err) {
      const errors = err as Error | AxiosError;
      return rejectWithValue(errors.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usersList = action.payload;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = !state.loading;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state?.usersList?.data) {
          state.usersList.data = state.usersList.data.filter(user => user.id !== action.payload);
        }
      })
      .addCase(addUser.pending, state => {
        state.loading = !state.loading;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state?.usersList?.data) {
          state.usersList.data.push(action.payload)
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

function isError(action: Action) {
  return action.type.endsWith("rejected");
}

export default usersSlice.reducer;
