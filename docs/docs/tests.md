# Unit test & E2E test
## Unit test
Unit tests har intet med projektet at gøre.

Unit tests kan testes ved at gå ind i /unitTest mappen og køre kommandoen:
``` sh
npm run unitTest
```

**Funktioner der køres test på**
```
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Expected a number');
  }
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

function divide2(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// eslint-disable-next-line no-undef
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  divide2,
};
```

**Tests til funktionerne**
```
// calculator.test.js
/* eslint-disable @typescript-eslint/no-require-imports */
const calculator = require('./calculator.js');

////////////////////
//****TEST ADD****//
////////////////////
test('test add 1 + 2 is 3', () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test('test add "abe" + 2 throws error', () => {
  expect(() => calculator.add('abe', 2)).toThrow();
});

test('test add -10 plus -10 is -20', () => {
  expect(calculator.add(-10, -10)).toBe(-20);
});

test('test add 10.5 add 10.5 is 21', () => {
  expect(calculator.add(10.5, 10.5)).toBe(21);
});

/////////////////////////
//****TEST SUBTRACT****//
/////////////////////////
test('test subtract 4 - 5 is -1', () => {
  expect(calculator.subtract(4, 5)).toBe(-1);
});

test('test subtract 5 - 4 is 1', () => {
  expect(calculator.subtract(5, 4)).toBe(1);
});

test('test subtract -10 minus -10 is -20', () => {
  expect(calculator.subtract(-10, -10)).toBe(0);
});

/////////////////////////
//****TEST MULTIPLY****//
/////////////////////////
test('test multiply 5 times 5 is 25', () => {
  expect(calculator.multiply(5, 5)).toBe(25);
});

test('test multiply 5 times 0 is 0', () => {
  expect(calculator.multiply(5, 0)).toBe(0);
});

///////////////////////
//****TEST DIVIDE****//
///////////////////////
test('test divide 20 divided by 2 is 10', () => {
  expect(calculator.divide(20, 2)).toBe(10);
});


//Tester om fejlen er en instans af Error-klassen.
//Uden Error virker det også, men den tester kun om der returneres en fejl.
test('test divide 20 divided by 0 returns error', () => {
  expect(() => calculator.divide(20, 0)).toThrow(Error);
});



```

## End-to-end test

**Opret mappe**


```
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
```



**Opret enhed**


```
describe('Folder creation flow', () => {
  const baseUrl = 'https://dbi-project-61b95.web.app/';

  beforeEach(() => {
    cy.visit(baseUrl);

    // login
    cy.get('#email').should('be.visible').type('user1@mail.com');
    cy.get('#password').should('be.visible').type('123456');
    cy.get('button[aria-label="Log ind"]').should('be.visible').click();
  });

  it('creates folder "testmappe" and a unit called "testenhed" inside it, then deletes it at the end', () => {
    // opret mappe
    cy.contains('button', 'Opret').click();
    cy.contains('li', 'Enhed').click();
    cy.get('#Name').should('be.visible').type('testenhed');
    cy.get('.card')
        .first()
       .within(() => {
        cy.get('button[aria-label="Videre til næste trin"]')
        .click({ force: true });
  });
    cy.get('#description').should('be.visible').type('en test enhed');
        cy.get('.card')
        .first()
       .within(() => {
        cy.get('button[aria-label="Videre til næste trin"]')
        .click({ force: true });
  });
    cy.get('#sync').should('be.visible').type('12');
    cy.get('button[aria-label="Udfør"]').should('be.visible').click();
    cy.get('.folderContainer').contains('testenhed').should('exist');

    cy.contains('.folderContainer', 'testenhed')
    .within(() => {
    // spring visibility-check over og klik alligevel
    cy.get('button.menuDots')
      .click({ force: true });

    cy.contains('li', 'Slet')
      .click({ force: true });
  });

    // evt. en assertion på at mappen er væk
    cy.get('.folderContainer').contains('testenhed').should('not.exist');
  });
});

```
