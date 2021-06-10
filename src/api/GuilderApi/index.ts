import Axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { Character, Table } from "../../types/userData";

export class GuilderApi {
  api: AxiosInstance;
  token: string;

  constructor(token?: string) {
    if (token) {
      this.token = token;
    } else {
      this.token = "";
    }
    this.api = Axios.create({
      baseURL: "http://192.168.100.132:3333",
      headers: {
        Authorization: this.token,
      },
    });
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
    return this.api.get("/user");
  }

  saveCharacter(chracter: Character) {
    return this.api.post("/character", chracter);
  }

  saveTable(table: Table) {
    return this.api.post("/rpgTable", table);
  }

  getAvailableTables(characterId: string) {
    return this.api.get(`/match/characterId/${characterId}/availableTables`);
  }

  getAvailableCharacters(tableId: string) {
    return this.api.get(`/match/tableId/${tableId}/availableCharacters`);
  }

  acceptAvailableTable(characterId: string, tableId: string) {
    return this.api.post("/match/characterAcceptTable", {
      table: {
        _id: tableId,
      },
      character: {
        _id: characterId,
      },
    });
  }

  rejectAvailableTable(characterId: string, tableId: string) {
    return this.api.post("/match/characterRejectTable", {
      table: {
        _id: tableId,
      },
      character: {
        _id: characterId,
      },
    });
  }

  acceptAvailableCharacter(tableId: string, characterId: string) {
    return this.api.post("/match/tableAcceptCharacter", {
      table: {
        _id: tableId,
      },
      character: {
        _id: characterId,
      },
    });
  }

  rejectAvailableCharacter(tableId: string, characterId: string) {
    return this.api.post("/match/tableRejectCharacter", {
      table: {
        _id: tableId,
      },
      character: {
        _id: characterId,
      },
    });
  }
}
