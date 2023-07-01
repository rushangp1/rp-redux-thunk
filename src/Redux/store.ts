import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slice/UsersSlice";
import { useDispatch } from "react-redux";
import ApplicationSlice from "./Slice/ApplicationSlice";

const store = configureStore({
  reducer: {
    users: UsersSlice,
    app: ApplicationSlice,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
