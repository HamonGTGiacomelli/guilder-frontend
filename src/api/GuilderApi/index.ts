import Axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { Character, Table } from "../../types/userData";

export class GuilderApi {
  api: AxiosInstance;
  token: string;

  constructor(token?: string) {
    this.api = Axios.create({ baseURL: "http://192.168.100.132:3333" });
    if (token) {
      this.token = token;
    } else {
      this.token = "";
    }
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
        Authorization: this.token,
      },
    });
  }

  saveCharacter(chracter: Character) {
    return this.api.post("/character", chracter, {
      headers: {
        Authorization: this.token,
      },
    });
  }

  saveTable(table: Table) {
    return this.api.post("/rpgTable", table, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
