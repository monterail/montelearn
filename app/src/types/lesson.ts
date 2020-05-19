export interface LessonList {
  count: Number;
  next: any;
  previous: any;
  results: Array<Lesson>;
}

export type Lesson = {
  description: String;
  grade: String;
  name: String;
  pdf_file: null;
  subject: String;
  url: String;
  uuid: String;
};
