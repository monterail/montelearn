/// <reference types="cypress" />

import { Example } from "../page-objects/example";
import { env, users } from "../data/data";
const example = new Example();

describe("checking cypress setup", () => {
  it("Visiting site and logging in", () => {
    example.login(users.monteTeacher.username, users.monteTeacher.password, env.heroku);
  });
});
