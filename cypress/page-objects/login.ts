/// <reference types="cypress" />

export class Login {
  login(username: string, password: string, env: string): void {
    cy.visit(env);
    cy.get(".text-white > .flex").click();
    cy.get("#email").type(username);
    cy.get("#password").type(password);
    cy.get(".mt-10 > .text-white").click();
  }
}
