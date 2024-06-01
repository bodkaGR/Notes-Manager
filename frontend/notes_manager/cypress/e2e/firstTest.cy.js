describe('check for existence', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="cypress-notes-container"]')
        .should("exist");

    cy.get('[data-testid="cypress-noteList"]')
        .should("exist");

    cy.get('[data-testid="cypress-lang-buttons"]')
        .should("exist")
        .should("have.text", "EnDe");
  })
})