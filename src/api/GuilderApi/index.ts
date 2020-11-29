import Axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { Character, Table } from "../../types/userData";

export class GuilderApi {
  api: AxiosInstance;

  constructor() {
    this.api = Axios.create({ baseURL: "http://localhost:3333" });
  }

  getAuth() {
    return useSelector(getAuthenticationToken);
  }

  login(username: string, password: string) {
    return this.api.post("/authentication", {
      username,
      password,
    });
  }

  createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return this.api.post("/register", {
      username,
      password,
      firstName,
      lastName,
    });
  }

  getUserData() {
    return this.api.get("/user", {
      headers: {
        Authorization: this.getAuth(),
      },
    });
  }

  saveCharacter(chracter: Character) {
    return { success: true };
  }

  saveTable(table: Table) {
    return { success: true };
  }
}
