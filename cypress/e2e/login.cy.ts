describe("Login", () => {
    beforeEach(() => {
        cy.visit("/auth/login");
    });

    it("should render header", () => {
        cy.get("[data-testid=login-title]").should("be.visible");
        cy.get("[data-testid=login-description]").should("be.visible");
    });

    it("should render form", () => {
        cy.get("[data-testid=login-form] input[name=email]").should(
            "be.visible",
        );
        cy.get("[data-testid=login-form] input[name=password]").should(
            "be.visible",
        );
        cy.get("[data-testid=login-form] button[type=submit]").should(
            "be.visible",
        );
        cy.get("[data-testid=login-forgot-link]").should("be.visible");
    });

    it("should render social buttons", () => {
        cy.get("[data-testid=social-buttons]").should("be.visible");
        cy.get("[data-testid=social-buttons] button").should("have.length", 2);
    });

    it("should redirect to signup page when clicking 'Sign up' link", () => {
        cy.get("[data-testid=login-signup-link]").click();
        cy.url().should("include", "/auth/signup");
    });

    it("should show password when clicking on the icon", () => {
        cy.get("[data-testid=login-form] input[name=password]").type("123456");
        cy.get("[data-testid=login-form] input[name=password]").should(
            "have.value",
            "123456",
        );

        cy.get("[data-testid=toggle-password-visibility]").first().click();
        cy.get("[data-testid=login-form] input[name=password]").should(
            "have.attr",
            "type",
            "text",
        );
    });
});

describe("Submit login form", () => {
    beforeEach(() => {
        cy.visit("/auth/login");
    });

    it("should redirect to login if no values are given", () => {
        cy.get("[data-testid=login-form] button[type=submit]").click();
        cy.url().should("include", "/auth/login");
    });
});
