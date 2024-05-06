describe("Recovery", () => {
    beforeEach(() => {
        cy.visit("/auth/recovery?token=test");
    });

    it("should render header", () => {
        cy.get("[data-testid=recovery-title]").should("be.visible");
        cy.get("[data-testid=recovery-description]").should("be.visible");
    });

    it("should render form", () => {
        cy.get("[data-testid=recovery-form] input[name=password]").should(
            "be.visible",
        );
        cy.get(
            "[data-testid=recovery-form] input[name=passwordConfirm]",
        ).should("be.visible");
        cy.get("[data-testid=recovery-form] button[type=submit]").should(
            "be.visible",
        );
    });

    it("should stay on the page if no values are given", () => {
        cy.get("[data-testid=recovery-form] button[type=submit]").click();
        cy.url().should("include", "/auth/recovery?token=test");
    });
});

describe("Submit recovery form", () => {
    beforeEach(() => {
        cy.visit("/auth/recovery?token=test");
    });

    it("should show an error if passwords don't match", () => {
        cy.get("[data-testid=recovery-form] input[name=password]").type(
            "12345678",
        );
        cy.get("[data-testid=recovery-form] input[name=passwordConfirm]").type(
            "123456789",
        );

        cy.get("[data-testid=recovery-form] button[type=submit]").click();
        cy.get("[data-testid=field-error]").contains("Passwords do not match");
    });

    it("should show an error if password is too short", () => {
        cy.get("[data-testid=recovery-form] input[name=password]").type("1234");
        cy.get("[data-testid=recovery-form] input[name=passwordConfirm]").type(
            "1234",
        );

        cy.get("[data-testid=recovery-form] button[type=submit]").click();
        cy.get("[data-testid=field-error]").contains(
            "Password must be at least 8 characters",
        );
    });
});
