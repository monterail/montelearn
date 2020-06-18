/// <reference types="cypress" />
import { Example } from "../page-objects/example";
import { env, users } from "../data/data";
const example = new Example();

describe("checking cypress setup", () => {
    it("Visiting site and logging in as a student", () => {
      example.login(users.monteStudent.username, users.monteStudent.password, env.heroku)
    });
    it("visiting students part of application", () => {
      example.student();

    //tutaj wchodzę w ten czerwony przycisk, który jest na stronie
    //a jakbym chciała wejść w przycisk, który jest na stronie pod Students? 
    });
    it("visiting specific subject page"), () => {
      cy.get(':nth-child(2) > .inline-block').contains("Try it out").click()
    }

    //to chyba mi nie działa, chciałabym aby mi wyszukiwało np konkretny przedmiot po nazwie i klikało w Try it out przypisany do tego przedmiotu
    //proszę o podpowiedź :-) 
  })