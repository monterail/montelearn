/// <reference types="cypress" />

export class Example {
  login(username: string, password: string, env: string): void {
    cy.visit(env);
    cy.get(".text-white > .flex").click();
    cy.get("#email").type(username);
    cy.get("#password").type(password);
    cy.get(".mt-10 > .text-white").click();
    cy.get(".mx-0 > .flex").should("include.text", "Logout");
  }
}
