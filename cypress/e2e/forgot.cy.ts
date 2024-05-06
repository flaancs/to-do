describe("Forgot", () => {
    beforeEach(() => {
        cy.visit("/auth/forgot");
    });

    it("should render header", () => {
        cy.get("[data-testid=forgot-title]").should("be.visible");
        cy.get("[data-testid=forgot-description]").should("be.visible");
    });

    it("should render form", () => {
        cy.get("[data-testid=forgot-form] input[name=email]").should(
            "be.visible",
        );
        cy.get("[data-testid=forgot-form] button[type=submit]").should(
            "be.visible",
        );
        cy.get("[data-testid=forgot-login-link]").should("be.visible");
    });

    it('should redirect to login page when clicking "Login" link', () => {
        cy.get("[data-testid=forgot-login-link]").click();
        cy.url().should("include", "/auth/login");
    });
});

describe("Submit forgot form", () => {
    beforeEach(() => {
        cy.visit("/auth/forgot");

        cy.get("[data-testid=forgot-form] input[name=email]").type(
            "test@email.com",
        );
        cy.get("[data-testid=forgot-form] button[type=submit]").click();

        cy.get("[data-testid=forgot-form] button[type=submit]").should(
            "have.attr",
            "disabled",
        );
    });

    it("should show success message when submitting form", () => {
        cy.get("[data-testid=forgot-sent-message]", { timeout: 5000 }).should(
            "be.visible",
        );
        cy.get("[data-testid=forgot-login-button]").should("be.visible");
    });

    it("should redirect to login page when clicking 'Login' button", () => {
        cy.get("[data-testid=forgot-login-button]").click();
        cy.url().should("include", "/auth/login");
    });
});
