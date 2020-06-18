/// <reference types="cypress" />

import { Login } from "../page-objects/login";
import { env, users } from "../data/data";
const example = new Login();

describe("checking cypress setup", () => {
  it("Visiting site and logging in", () => {
    example.login(users.monteTeacher.username, users.monteTeacher.password, env.heroku);
  });
});
