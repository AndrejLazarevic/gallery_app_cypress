// methods //
class navigation {
    clearCookies() {
        cy.clearCookies().wait(100)
    }
    visitHome() {
        cy.visit('/').wait(100)
    }
    visitLogin() {
        cy.visit('/login').wait(100)
        cy.url().should('include', '/login')
    }
    visitRegister() {
        cy.visit('/register').wait(100)
        cy.url().should('include', '/register')
    }
    visitCreateGallery() {
        cy.visit('/create').wait(100)
        cy.url().should('include', '/create')
    }
}
export default navigation;