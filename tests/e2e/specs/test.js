// https://docs.cypress.io/api/introduction/api.html

describe("Renders", () => {
  it("Has the site header", () => {
    cy.visit("/");
    cy.contains("h1", "Data Editor for Nested JSON");
  });
});

// TODO more integration tests
