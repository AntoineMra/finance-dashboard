/// <reference types="cypress" />

describe("Login Component Testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to login page if not authenticated", () => {
    cy.url().should("include", "/login");
  });

  it("should login successfully", () => {
    cy.get("input[type=text]").type("Antoine");
    cy.get("input[type=password]").type("testing");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/");
    cy.getCookie("token");
  });
});
