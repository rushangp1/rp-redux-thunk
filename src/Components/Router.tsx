import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users/Users";
import AddEditUser from "./Users/AddEditUser";

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/users" Component={Users} />
        <Route path="/users/:userId" Component={AddEditUser} />
        <Route path="/users/Create" Component={AddEditUser} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
