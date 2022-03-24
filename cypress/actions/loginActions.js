import loginLocators from '../locators/loginLocators.js';  // import login locators to be used

class loginActions {
	login(email, password) {
		cy.get(loginLocators.emailInput).type(email)
		cy.get(loginLocators.passwordInput).type(password)
		cy.get(loginLocators.loginButton).click()		
	}
	justEmailLogin(email) {
		cy.get(loginLocators.emailInput).type(email)
		cy.get(loginLocators.loginButton).click()
	}
	justPasswordLogin(password) {
		cy.get(loginLocators.passwordInput).type(password)
		cy.get(loginLocators.loginButton).click()
	}
	blankLogin() {
		cy.get(loginLocators.loginButton).click()
	}
}

export default loginActions;