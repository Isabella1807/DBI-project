describe('Folder creation flow', () => {
  const baseUrl = 'https://dbi-project-61b95.web.app/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('creates a new folder called "testmappe"', () => {
    // 1. Open the "Opret" menu
    cy.contains('button', 'Opret').click();

    // 2. Select "Mappe"
    cy.contains('li', 'Mappe').click();

    // 3. Type into the folder-name input
    cy.get('#folderName')
      .should('be.visible')
      .type('testmappe');

    // 4. Click the Create button inside the modal
    cy.contains('button[type="submit"]', 'Create').click();

    // 5. Verify the new folder appears
    cy.get('.folderContainer')         // adjust to your actual folder-list container
      .contains('testmappe')
      .should('exist');
  });
});