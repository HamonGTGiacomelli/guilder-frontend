import { TABLE_GAME_TYPE, TABLE_SESSION_TYPE } from "../utils/const";

export type Character = {
  name: string;
  characterFunction: string;
  system: string;
  table: Table | undefined;
};

export type Table = {
  title: string;
  sessionType: TABLE_SESSION_TYPE;
  language: string;
  description: string;
  time: string;
  gameType: TABLE_GAME_TYPE;
  playersNum: number;
  playersMaxNum: number;
};

export type UserData = {
  userName: string;
  userCharacters: Character[];
  userTables: Table[];
};
