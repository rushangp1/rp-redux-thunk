import Axios from "axios";

class UsersApi {
  getAllUsers(): any {
    return Axios.get("https://jsonplaceholder.typicode.com/users");
  }

  getUserById(userId: number) {
    return Axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }
}

export const usersApi = new UsersApi();
