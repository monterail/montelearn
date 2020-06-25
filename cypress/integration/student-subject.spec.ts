/// <reference types="cypress" />
import { Login } from "../page-objects/login";
import { env, users, subjectName } from "../data/data";
import { StudentPath } from "../page-objects/student-path";

const login = new Login();
const studentPath = new StudentPath();

describe("Cypress tests for eLearning app - Student Path", () => {
    beforeEach("Login as a student", () => {
      (login.login(users.monteStudent.username, 'rOvoJIVsLmnBSURAlWJq', env.heroku))
  });
  
 // it("Go to subject page Remote Work and take a test with positive result", () => {
 //   studentPath.goToSubjectPage()
 //   studentPath.selectSubject(subjectName.remoteWork)
 //   studentPath.checkUrl(env.heroku)
 //   studentPath.takeATestWithPositiveResult()
  //}
  it("Got to subject page Remote Work and take a test with negative result", () => {
    studentPath.goToSubjectPage()
    studentPath.selectSubject(subjectName.remoteWork)
    studentPath.checkUrl(env.heroku)
    studentPath.takeATestWithNegativeResult()
 
    })
    )}
)
 