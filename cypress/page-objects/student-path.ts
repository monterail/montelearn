/// <reference types="cypress" />

import { contains } from "cypress/types/jquery";

export class StudentPath {
  goToSubjectPage(): void {
    cy.get(".font-medium > .inline-flex")
    cy.contains("Try it out").click().wait(1000);
      }
  checkSubjectPage(): void {
    cy.get("h1.text-4xl").should("have.text", "Subjects page").wait(1000);
  }
   selectSubject(subjectName: string): void {
    cy.get(".p-6.my-4")
     .find(".text-4xl.my-1.font-semibold.capitalize")
     .contains(subjectName)
     .get(':nth-child(1) > .inline-block > .flex > .pr-4').click()
   }
   checkUrl(env:): void {
     cy.url().should("include", "/subjects/Remote%20work").wait(1000);
       }
    takeAtest(): void {
      cy.get('.inline-block')
      cy.contains("Dive right in!").should("exist").click().wait(2000)
   }
    chooseAnswer1Yes(): void {
      cy.get(':nth-child(1) > .mt-6 > .flex-col > :nth-child(1)')
      cy.contains("Yes").should("exist").click().wait(1000)
   }
    chooseAnswer1No(): void {
      cy.get('.bg-red-monterail > .font-medium'))
      cy.contains("No").should("exist").click().wait(1000)
   }
    chooseAnswer2Yes(): void {
      cy.get(':nth-child(2) > .mt-6 > .flex-col > :nth-child(1) > .font-medium')
      cy.contains("Yes").should("exist").click().wait(1000)
   }
    chooseAnswer2No(): void {
      cy.get(':nth-child(2) > .mt-6 > .flex-col > :nth-child(2)')
      cy.should("have.text", "No").click().wait(1000)
   }
    submitTest(): void {
      cy.get('.py-20 > :nth-child(3) > .flex')
      cy.contains("Test now").should("exist").click().wait(1000)
   }

    checkScore(): void {
      cy.get('.py-20 > :nth-child(3) > .flex')
      .contains("2/2").should("exist")

   }