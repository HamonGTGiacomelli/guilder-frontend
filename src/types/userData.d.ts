export type Character = {
  name: string;
  table: Table;
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
