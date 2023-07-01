import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiState, { ApiProcessState } from "../State/ApiState";
import { UserState } from "../State/Users";
import { usersApi } from "../../Api/UserApi";
import { setLoading } from "./ApplicationSlice";

const initialState = {
  users: {
    data: [],
    loading: false,
    state: ApiProcessState.Idle,
    error: "",
  } as ApiState<Array<UserState>>,
  selectedUser: {
    data: {
      Id: 0,
      Name: "",
      Email: "",
      Company: "",
      Phone: "",
    },
  } as ApiState<UserState>,
};

const getUsers = createAsyncThunk("users/fetchAll", async (params, thunk) => {
  thunk.dispatch(setLoading(true));
  const response = await usersApi.getAllUsers();
  thunk.dispatch(setLoading(false));
  return response.data;
});

const getUserById = createAsyncThunk<any, number>(
  "users/getUserById",
  async (userId, thunk) => {
    thunk.dispatch(setLoading(true));
    const response = await usersApi.getUserById(userId);
    thunk.dispatch(setLoading(false));
    return response.data;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cleanSelectedUser: function ({ selectedUser }) {
      selectedUser.error = "";
      selectedUser.loading = false;
      selectedUser.state = ApiProcessState.Idle;
      selectedUser.data = {
        Id: 0,
        Name: "",
        Email: "",
        Company: "",
        Phone: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.users.loading = true;
      state.users.state = ApiProcessState.InProcess;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.data = action.payload.map((user: any) => {
        let mappedUser: UserState = {
          Id: user.id,
          Name: user.name,
          Email: user.email,
          Phone: user.phone,
          Company: user.company.name,
        };
        return mappedUser;
      });
      state.users.state = ApiProcessState.Success;
      state.users.error = "";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.users.loading = false;
      state.users.data = [];
      state.users.state = ApiProcessState.Error;
      state.users.error = action.error.message || "Something went wrong";
    });

    builder.addCase(getUserById.pending, ({ selectedUser }, action) => {
      selectedUser.loading = true;
    });
    builder.addCase(getUserById.fulfilled, ({ selectedUser }, action) => {
      selectedUser.loading = false;
      let mappedUser: UserState = {
        Id: action.payload.id,
        Name: action.payload.name,
        Email: action.payload.email,
        Phone: action.payload.phone,
        Company: action.payload.company.name,
      };
      selectedUser.data = mappedUser;
    });
    builder.addCase(getUserById.rejected, ({ selectedUser }, action) => {
      selectedUser.loading = false;
      selectedUser.state = ApiProcessState.Error;
      selectedUser.error = action.error.message || "Something went wrong";
    });
  },
});

export { getUsers, getUserById };

export const { cleanSelectedUser } = userSlice.actions;

export default userSlice.reducer;
