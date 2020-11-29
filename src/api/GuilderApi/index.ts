import Axios, { AxiosInstance } from "axios";
import { Character, Table, UserData } from "../../types/userData";
import { TABLE_GAME_TYPE, TABLE_SESSION_TYPE } from "../../utils/const";

export class GuilderApi {
  api: AxiosInstance;

  constructor() {
    this.api = Axios.create({ baseURL: "http://localhost:3333" });
  }

  login(username: string, password: string) {
    return this.api.post("/authentication", {
      username,
      password,
    });
  }

  getUserData(): UserData {
    return {
      userName: "Hamon",
      userCharacters: [
        {
          name: "Chracter name test 1",
          characterFunction: "Dano Mágico",
          system: "Padrão",
          table: undefined,
        },
      ],
      userTables: [
        {
          title: "Table name teste",
          description: "Description here",
          gameType: TABLE_GAME_TYPE.NARRATIVE,
          language: "pt_BR",
          sessionType: TABLE_SESSION_TYPE.LOCAL,
          time: "22:00/00:00",
          playersNum: 2,
          playersMaxNum: 5,
        },
      ],
    };
  }

  saveCharacter(chracter: Character) {
    return { success: true };
  }

  saveTable(table: Table) {
    return { success: true };
  }
}
