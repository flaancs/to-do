describe("Signup", () => {
    beforeEach(() => {
        cy.visit("/auth/signup");
    });

    it("should render header", () => {
        cy.get("[data-testid=signup-title]").should("be.visible");
        cy.get("[data-testid=signup-description]").should("be.visible");
    });

    it("should render form", () => {
        cy.get("[data-testid=signup-form] input[name=email]").should(
            "be.visible",
        );
        cy.get("[data-testid=signup-form] input[name=name]").should(
            "be.visible",
        );
        cy.get("[data-testid=signup-form] input[name=password]").should(
            "be.visible",
        );
        cy.get("[data-testid=signup-form] input[name=passwordConfirm]").should(
            "be.visible",
        );
        cy.get("[data-testid=signup-form] button[type=submit]").should(
            "be.visible",
        );
        cy.get("[data-testid=signup-login-link]").should("be.visible");
    });

    it("should stay on the page if no values are given", () => {
        cy.get("[data-testid=signup-form] button[type=submit]").click();
        cy.url().should("include", "/auth/signup");
    });

    it("should show password when clicking on the icon", () => {
        cy.get("[data-testid=signup-form] input[name=password]").type("123456");
        cy.get("[data-testid=signup-form] input[name=password]").should(
            "have.value",
            "123456",
        );

        cy.get("[data-testid=toggle-password-visibility]").first().click();
        cy.get("[data-testid=signup-form] input[name=password]").should(
            "have.attr",
            "type",
            "text",
        );
    });

    it("should redirect to login page when clicking 'Login' link", () => {
        cy.get("[data-testid=signup-login-link]").click();
        cy.url().should("include", "/auth/login");
    });

    it("should render social buttons correctly", () => {
        cy.get("[data-testid=social-buttons]").should("be.visible");
        cy.get("[data-testid=social-buttons] button").should("have.length", 2);
    });
});

describe("Submit signup form", () => {
    beforeEach(() => {
        cy.visit("/auth/signup");
    });

    it("should show an error if passwords don't match", () => {
        cy.get("[data-testid=signup-form] input[name=password]").type(
            "12345678",
        );
        cy.get("[data-testid=signup-form] input[name=passwordConfirm]").type(
            "123456789",
        );

        cy.get("[data-testid=signup-form] button[type=submit]").click();
        cy.get("[data-testid=field-error]").contains("Passwords do not match");
    });

    it("should show an error if password is too short", () => {
        cy.get("[data-testid=signup-form] input[name=password]").type("1234");
        cy.get("[data-testid=signup-form] input[name=passwordConfirm]").type(
            "1234",
        );

        cy.get("[data-testid=signup-form] button[type=submit]").click();
        cy.get("[data-testid=field-error]").contains(
            "Password must be at least 8 characters",
        );
    });
});
