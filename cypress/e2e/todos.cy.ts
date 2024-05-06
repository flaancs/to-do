describe("Todos", () => {
    beforeEach(() => {
        cy.visit("/todos");
    });

    it("should redirect to login if there is no session", () => {
        cy.url().should("include", "/auth/login");
    });
});

const currentTimeString = new Date().getTime().toString();

describe("Todos with session", () => {
    beforeEach(() => {
        cy.setCookie(
            "authjs.session-token",
            Cypress.env("CYPRESS_SESSION_TOKEN"),
        );
        cy.setCookie("session", Cypress.env("CYPRESS_SESSION"));
        cy.setCookie("authjs.csrf-token", "csrf-token");
        cy.setCookie(
            "authjs.callback-url",
            "http%3A%2F%2Flocalhost%3A3000%2Ftodos",
        );

        cy.visit("/todos");
    });

    it("should display todos screen", () => {
        cy.url().should("include", "/todos");
        cy.get("[data-testid=todos-title]").should("be.visible");
    });

    it("should disable create button if no value is given", () => {
        cy.get("[data-testid=create-todo-button]").should("be.disabled");
    });

    it("should create a new todo", () => {
        cy.get("[data-testid=create-todo-input]").type(currentTimeString);
        cy.get("[data-testid=create-todo-button]").click();
        cy.get("[data-testid=todo-input]").should(
            "have.value",
            currentTimeString,
        );
    });
});
