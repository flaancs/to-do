describe("Login screen", () => {
    beforeEach(() => {
        cy.visit("/auth/login");
    });

    it("render login screen header correctly", () => {
        cy.get("[data-testid=login-title]").should("be.visible");
        cy.get("[data-testid=login-description]").should("be.visible");
    });

    it("render login form correctly", () => {
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

    it("render social buttons correctly", () => {
        cy.get("[data-testid=login-social-buttons]").should("be.visible");
        cy.get("[data-testid=login-social-buttons] button").should(
            "have.length",
            2,
        );
    });

    it('should redirect to signup page when clicking "Sign up" link', () => {
        cy.get("[data-testid=login-signup-link]").click();
        cy.url().should("include", "/auth/signup");
    });
});
