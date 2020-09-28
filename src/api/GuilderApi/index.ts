import { UserData } from "../../types/userData";

export class GuilderApi {
  getUserData(): UserData {
    return {
      userName: "Hamon",
      userCharacters: [
        {
          name: "Chracter name test 1",
          table: undefined,
        },
      ],
      userTables: [
        {
          name: "Table name teste",
          playersNum: 2,
          playersMaxNum: 5,
        },
      ],
    };
  }
}
