export enum SUBJECT_ICONS {
  POTION = "potion",
  NATURE = "nature",
  ATOM = "atom",
  WEATHER = "weather",
  CASTLE = "castle",
  BABUSHKA = "babushka",
}

export interface SubjectList {
  count: Number;
  next: any;
  previous: any;
  results: Array<Subject>;
}

export type Subject = {
  uuid: String;
  name: String;
};
