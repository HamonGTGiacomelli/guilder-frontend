import { TABLE_GAME_TYPE, TABLE_SESSION_TYPE } from "../utils/const";

export type Character = {
  _id?: string;
  name: string;
  description: string;
  background: string;
  table?: Table;
};

export type Table = {
  _id?: string;
  name: string;
  description: string;
  maxCharacters: number;
  characters?: Character[];
};

export type Schedule = {
  _id?: string;
  date: string;
  accepted?: Character[];
  rejected?: Character[];
};

export type UserData = {
  _id: string;
  username: string;
  userCharacters: Character[];
  userTables: Table[];
};
