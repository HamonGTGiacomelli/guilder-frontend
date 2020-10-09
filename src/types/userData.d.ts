export type Character = {
  name: string;
  characterFunction: string;
  system: string;
  table: Table | undefined;
};

export type Table = {
  name: string;
  playersNum: number;
  playersMaxNum: number;
};

export type UserData = {
  userName: string;
  userCharacters: Character[];
  userTables: Table[];
};
