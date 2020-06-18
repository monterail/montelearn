/// <reference types="cypress" />
import { Login } from "../page-objects/login";
import { env, users } from "../data/data";
import { StudentPath } from "../page-objects/student-path";
const login = new Login();
const studentPath = new StudentPath();

describe("Cypress tests for eLearning app", () => {
  beforeEach("Visiting site and logging in as a student", () => {
    login.login(users.monteStudent.username, users.monteStudent.password, env.heroku);
  });
  it("Remote work", () => {
    studentPath.goToSubjectPage();
    studentPath.selectSubject("biology");
  });
  // it("HR", () => {
  //   studentPath.goToSubjectPage();
  // });
});
