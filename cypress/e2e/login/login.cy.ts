/// <reference types="cypress" />

describe("Login Component Testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to login page if not authenticated", () => {
    cy.url().should("include", "/login");
  });

  it("should login successfully", () => {
    cy.get("input[name=email]").type("Antoine");
    cy.get("input[name=password]").type("testing");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/");
    // Check if the app stores the token in the cookie
    cy.getCookie("token").should("exist");
  });
});
