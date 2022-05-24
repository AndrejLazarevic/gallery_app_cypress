import errors from '../data/errors.js';

// locators //
const loginTitle = 'h1.title-style:contains("Please login")'
const emailLabel = 'label[for="email"]'
const emailInput = '#email'
const passwordLabel = 'label[for="password"]'
const passwordInput = '#password'
const loginButton = 'button[type="submit"]'
const errorMessage = 'p.alert-danger'

// methods//
class loginPage {
	login(email, password) {
		cy.get(emailInput).type(email)
		cy.get(passwordInput).type(password)
		cy.get(loginButton).click()
	}
	justEmailLogin(email) {
		cy.get(emailInput).type(email)
		cy.get(loginButton).click()
	}
	justPasswordLogin(password) {
		cy.get(passwordInput).type(password)
		cy.get(loginButton).click()
	}
	blankLogin() {
		cy.get(loginButton).click()
	}
	verifyAllElementsExist() {
		cy.get(loginTitle).should('exist')
		cy.get(loginButton).should('exist')
		cy.get(emailInput).should('exist')
		cy.get(emailLabel).should('exist')
		cy.get(passwordInput).should('exist')
		cy.get(passwordLabel).should('exist')
	}
	verifyBlankEmailFieldError() {
		cy.get(emailInput).then((emailInput) => {
			expect(emailInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyBlankPasswordError() {
		cy.get(passwordInput).then((passwordInput) => {
			expect(passwordInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyInvalidEmailError() {
		cy.get(emailInput).then((emailEntry) => {
			expect(emailEntry[0].validationMessage).to.eq(errors.incorrectEmailFormat(emailEntry))
		})
	}
	verifyBadCredentialsError() {
		cy.get(errorMessage).should('exist')
		cy.get(errorMessage).should((errorMessage) => {
			expect(errorMessage.text()).to.eq(errors.badCredentials)
		})
    }
}
export default loginPage;