/// <reference types="cypress" />

import { Login } from "../page-objects/login";
import { env, users, subjectName } from "../data/data";
import { StudentPath } from "../page-objects/student-path";
const login = new Login();
const studentPath = new StudentPath();

describe("Cypress tests for eLearning app", () => {
    beforeEach("Login as a student", () => {
      (login.login(users.monteStudent.username, users.monteStudent.password, env.heroku))
  });
    it("Go to subject page and take a test", () => {
     studentPath.goToSubjectPage()
     studentPath.checkSubjectPage()
     studentPath.selectSubject("Remote work")
     studentPath.checkUrl()
     studentPath.takeAtest()
     studentPath.chooseAnswer1Yes()
     studentPath.chooseAnswer2No()
     studentPath.submitTest()
     studentPath.checkScore()

    
  });
