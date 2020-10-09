import { Character, UserData } from "../../types/userData";

export class GuilderApi {
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
          name: "Table name teste",
          playersNum: 2,
          playersMaxNum: 5,
        },
      ],
    };
  }

  saveCharacter(chracter: Character) {
    return { success: true };
  }
}
