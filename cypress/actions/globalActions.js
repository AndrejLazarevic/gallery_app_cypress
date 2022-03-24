import globalLocators from '../locators/globalLocators.js';

class globalActions {
    clickLogout() {
        cy.get(globalLocators.logoutButton).click()
    }
    clickCreateGallery() {
        cy.get(globalLocators.createGallery).click()
    }
    clickAllGalleries() {
        cy.get(globalLocators.allGalleriesButton).click()
    }
    clickMyGalleries() {
        cy.get(globalLocators.myGalleries).click()
    }
    clickHome() {
        cy.get(globalLocators.homeButton).click()
    }
    clickLogin() {
        cy.get(globalLocators.loginButton).click()
    }
    clickRegister() {
        cy.get(globalLocators.registerButton).click()
    }
}

export default globalActions;