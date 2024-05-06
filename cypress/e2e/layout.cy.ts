describe("Layout", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should render dashboard menu", () => {
        cy.get("[data-testid=dashboard-menu]").should("be.visible");
    });

    it("should render logo", () => {
        cy.get("[data-testid=logo]").should("be.visible");
    });

    it("should render language and theme toggle when clicking menu", () => {
        cy.get("[data-testid=dashboard-menu]").click();
        cy.get("[data-testid=dashboard-menu-language-trigger]").should(
            "be.visible",
        );
        cy.get("[data-testid=dashboard-menu-theme-trigger]").should(
            "be.visible",
        );
    });

    it("should render language selector when clicking trigger", () => {
        cy.get("[data-testid=dashboard-menu]").click();
        cy.get("[data-testid=dashboard-menu-language-trigger]").click();
        cy.get("[data-testid=dashboard-menu-language-content]").should(
            "be.visible",
        );
        cy.get("[data-testid=dashboard-menu-language-content]")
            .contains("Español")
            .should("be.visible");
        cy.get("[data-testid=dashboard-menu-language-content]")
            .contains("English")
            .should("be.visible");
    });

    it("should change language when clicking 'Español'", () => {
        cy.get("[data-testid=dashboard-menu]").click();
        cy.get("[data-testid=dashboard-menu-theme-trigger]").contains("Theme");

        cy.get("[data-testid=dashboard-menu-language-trigger]").click();
        cy.get("[data-testid=dashboard-menu-language-content]")
            .contains("Español")
            .click();

        cy.wait(1000);

        cy.get("[data-testid=dashboard-menu]").click();
        cy.get("[data-testid=dashboard-menu-theme-trigger]").contains("Tema");
    });

    it("should render theme selector when clicking trigger", () => {
        cy.get("[data-testid=dashboard-menu]").click();
        cy.get("[data-testid=dashboard-menu-theme-trigger]").click();
        cy.get("[data-testid=dashboard-menu-theme-content]").should(
            "be.visible",
        );
        cy.get("[data-testid=dashboard-menu-theme-content]")
            .contains("Light")
            .should("be.visible");
        cy.get("[data-testid=dashboard-menu-theme-content]")
            .contains("Dark")
            .should("be.visible");
        cy.get("[data-testid=dashboard-menu-theme-content]")
            .contains("System")
            .should("be.visible");
    });

    it("should render footer with github repo link", () => {
        cy.get("[data-testid=footer-github-link]").should("be.visible");
    });
});
