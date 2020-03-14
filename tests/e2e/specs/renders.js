describe("Renders", () => {
  before(() => cy.visit("/"));

  it("site header", () => {
    cy.contains("Data Editor for Nested JSON");
  });

  it("section titles", () => {
    cy.get(".title")
      .first()
      .should("have.value", "Grandparent 1");
    cy.get(".title")
      .last()
      .should("have.value", "Fourth Child");
  });

  it("section texts", () => {
    cy.get(".text")
      .first()
      .should("have.value", "Grandparent 1 description.");
    cy.get(".text")
      .last()
      .should("have.value", "I am the fourth child");
  });

  it("output textarea", () => {
    cy.get("textarea")
      .last()
      .should("contain.value", '"title": "Parent 2"');
  });
});

// TODO more integration tests
