import { TABLE_GAME_TYPE, TABLE_SESSION_TYPE } from "../utils/const";

export type Character = {
  name: string;
  description: string;
  background: string;
};

export type Table = {
  name: string;
  description: string;
};

export type UserData = {
  username: string;
  userCharacters: Character[];
  userTables: Table[];
};
