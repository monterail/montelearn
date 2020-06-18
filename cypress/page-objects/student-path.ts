/// <reference types="cypress" />

import { contains } from "cypress/types/jquery";

export class StudentPath {
  goToSubjectPage(): void {
    cy.get(".font-medium > .inline-flex");
    cy.contains("Try it out").click().wait(1000);
    // cy.get(".sm:text-5xl").should("have.text", "Subjects Page");
  }
  selectSubject(subjectName: string): void {
    // cy.get(".p-6.my-4")
    //   .find(".text-4xl.my-1.font-semibold.capitalize")
    //   .contains(subjectName)
    //   .find(".rounded-full.inline-block")
    //   .click();

    cy.get(".grid")
      .find(".p-6.my-4")
      .each(($el) => {
        const subName = $el.find(".text-4xl.my-1.font-semibold.capitalize").text();
        if (subName.includes(subjectName)) {
          $el.find(".rounded-full.inline-block").click();
        } else {
          cy.reload();
        }
      });
  }
}
