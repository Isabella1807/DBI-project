describe('Folder creation flow', () => {
  const baseUrl = 'https://dbi-project-61b95.web.app/';

  beforeEach(() => {
    cy.visit(baseUrl);

    // login
    cy.get('#email').should('be.visible').type('user1@mail.com');
    cy.get('#password').should('be.visible').type('123456');
    cy.get('button[aria-label="Log ind"]').should('be.visible').click();
  });

  it('creates and then deletes the folder "testmappe"', () => {
    // opret mappe
    cy.contains('button', 'Opret').click();
    cy.contains('li', 'Mappe').click();
    cy.get('#folderName').should('be.visible').type('testmappe');
    cy.get('button.basicButton[aria-label="Opret mappe"]').click();
    cy.get('.folderContainer').contains('testmappe').should('exist');

    cy.contains('.folderContainer', 'testmappe')
    .within(() => {
    // spring visibility-check over og klik alligevel
    cy.get('button.menuDots')
      .click({ force: true });

    cy.contains('li', 'Slet')
      .click({ force: true });
  });

    // evt. en assertion på at mappen er væk
    cy.get('.folderContainer').contains('testmappe').should('not.exist');
  });
});
