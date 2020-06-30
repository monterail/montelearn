/// <reference types="cypress" />

export class StudentPath {
  goToSubjectPage(): void {
    cy.get('.font-medium > .inline-flex')
    cy.contains('Try it out').click().wait(1000);
    cy.get('h1.text-4xl').should('have.text','Subjects page').wait(1000)
      }

   selectSubject(subjectName: string): void {
    cy.get('.p-6.my-4')
     .find('.text-4xl.my-1.font-semibold.capitalize')
     .contains(subjectName)
     .get(':nth-child(1) > .inline-block > .flex > .pr-4').click()
   }
   checkUrl(env: string): void {
     cy.url().should('eq', env + 'subjects/Remote%20work').wait(1000);
       }
    takeATestWithPositiveResult(): void {
      cy.get(".inline-block")
      cy.contains('Dive right in!').should('exist').click().wait(1000)
      this.chooseAnswer1Yes();
      this.chooseAnswer2No();
      cy.get(".py-20 > :nth-child(3) > .flex")
      cy.contains('Test now').should('exist').click().wait(2000)
      cy.get('.py-20 > :nth-child(3) > .flex').wait(1000)
      .contains('2/2').should('exist')
     }
    takeATestWithNegativeResult(): void {
     cy.get(".inline-block").wait(1000)
     cy.contains('Dive right in!').should('exist').click().wait(1000)
     this.chooseAnswer1No();
     this.chooseAnswer2Yes();
     cy.get('.py-20 > :nth-child(3) > .flex').wait(1000)
     cy.contains('Test now').should('exist').click().wait(1000)
     cy.get(".py-20 > :nth-child(3) > .flex")
     .contains('0/2').should('exist')
    }
    
   private chooseAnswer1Yes(): void {
    cy.get(':nth-child(1) > .mt-6 > .flex-col > :nth-child(1) > .font-medium').click()
    }
   private chooseAnswer1No(): void {
    cy.get(':nth-child(1) > .mt-6 > .flex-col > :nth-child(2)').wait(1000)
    cy.contains('No').should('exist').click()
    }
    private chooseAnswer2Yes(): void {
      cy.get(':nth-child(2) > .mt-6 > .flex-col > :nth-child(1)').click()
     }
    private chooseAnswer2No(): void {
      cy.get(':nth-child(2) > .mt-6 > .flex-col > :nth-child(2)').click()
  
    }}