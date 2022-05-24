// locators //
const logoutButton = '#navbarTogglerDemo01 a:contains("Logout")'
const loginButton = '#navbarTogglerDemo01 a:contains("Login")'
const registerButton = '#navbarTogglerDemo01 a:contains("Register")'
const allGalleriesButton = '#navbarTogglerDemo01 a:contains("All Galleries")'
const myGalleries = '#navbarTogglerDemo01 a:contains("My Galleries")'
const createGallery = '#navbarTogglerDemo01 a:contains("Create Gallery")'
const homeButton = '#navbarTogglerDemo01 a:contains("Gallery App")'

// methods //
class globalMethods {
    clickLogout() {
        cy.get(logoutButton).click()
    }
    clickCreateGallery() {
        cy.get(createGallery).click()
    }
    clickAllGalleries() {
        cy.get(allGalleriesButton).click()
    }
    clickMyGalleries() {
        cy.get(myGalleries).click()
    }
    clickHome() {
        cy.get(homeButton).click()
    }
    clickLoginAndVerifyRedirection() {
        cy.get(loginButton).click()
        cy.url().should('include', '/login')
    }
    clickRegisterAndVerifyRedirection() {
        cy.get(registerButton).click()
        cy.url().should('include', '/register')
    }
    verifyYouAreLoggedIn() {
        cy.get(logoutButton).should('exist')
        cy.get(loginButton).should('not.exist')
        cy.get(registerButton).should('not.exist')
    }
    verifyElementsWhenNotLoggedIn() {
        cy.get(loginButton).should('exist')
        cy.get(registerButton).should('exist')
        cy.get(allGalleriesButton).should('exist')
        cy.get(homeButton).should('exist')
        cy.get(logoutButton).should('not.exist')
        cy.get(myGalleries).should('not.exist')
        cy.get(createGallery).should('not.exist')
    }
    verifyElementsWhenLoggedIn() {
        cy.get(loginButton).should('exist')
        cy.get(registerButton).should('exist')
        cy.get(allGalleriesButton).should('exist')
        cy.get(homeButton).should('exist')
        cy.get(logoutButton).should('exist')
        cy.get(myGalleries).should('exist')
        cy.get(createGallery).should('exist')
    }
}
export default globalMethods;