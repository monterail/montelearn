export enum SUBJECT_ICONS {
  POTION = "potion",
  NATURE = "nature",
  ATOM = "atom",
  WEATHER = "weather",
  CASTLE = "castle",
  BABUSHKA = "babushka",
}

export interface SubjectList {
  count: number;
  next: string;
  previous: string;
  results: Array<Subject>;
}

export type Subject = {
  uuid: string;
  name: string;
};
