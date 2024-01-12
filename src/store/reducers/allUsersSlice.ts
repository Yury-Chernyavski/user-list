import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAllUsers, IUser, TAddUser } from "../../models";
import UsersService from "../../services/UsersService";
import { AxiosError } from "axios";

interface IUsersState {
  usersListData: IAllUsers | null,
  loading: boolean,
  error: string | null,
}

const initialState: IUsersState = {
  usersListData: null,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk<IAllUsers, { per_page?: number, page?: number } | undefined, { rejectValue: string }>(
  "users/fetch",
  async function (queryParams, { rejectWithValue }) {
    try {
      if (queryParams && (queryParams.page || queryParams.per_page)) {
        const response = await UsersService.getAllUsers(queryParams.per_page, queryParams.page);
        return response.data;
      } else {
        const response = await UsersService.getAllUsers();
        return response.data;
      }
    } catch (err) {
      const errorMessage = (err as Error).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const addUser = createAsyncThunk<IUser, TAddUser, { rejectValue: string }>(
  "users/add",
  async function (newUser, { rejectWithValue }) {
    try {
      const response = await UsersService.addUser(newUser);
      return response.data;
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

const allUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usersListData = action.payload;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state?.usersListData?.data) {
          state.usersListData.data = state.usersListData.data.filter(user => user.id !==
            action.payload);
        }
      })
      .addCase(addUser.pending, state => {
        state.loading = !state.loading;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state?.usersListData?.data) {
          state.usersListData.data.push(action.payload);
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

export const { deleteError } = allUsersSlice.actions;
export default allUsersSlice.reducer;
