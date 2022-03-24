import registerLocators from '../locators/registerLocators.js'; 

class registerActions {
	registerWithTerms(firstName, lastName, email, password, confirmPassword) {
		cy.get(registerLocators.firstNameInput).type(firstName)
		cy.get(registerLocators.lastNameInput).type(lastName)
		cy.get(registerLocators.emailInput).type(email)
		cy.get(registerLocators.passwordInput).type(password)
		cy.get(registerLocators.confirmPasswordInput).type(confirmPassword)
		cy.get(registerLocators.termsCheckbox).click()
		cy.get(registerLocators.registerButton).click()
	}
	registerWithoutTerms(firstName, lastName, email, password, confirmPassword) {
		cy.get(registerLocators.firstNameInput).type(firstName)
		cy.get(registerLocators.lastNameInput).type(lastName)
		cy.get(registerLocators.emailInput).type(email)
		cy.get(registerLocators.passwordInput).type(password)
		cy.get(registerLocators.confirmPasswordInput).type(confirmPassword)
		cy.get(registerLocators.registerButton).click()
	}
	registerWithJustFirstName(firstName) {
		cy.get(registerLocators.firstNameInput).type(firstName)
		cy.get(registerLocators.registerButton).click()
	}
	registerWithJustFirstAndLastName(firstName, lastName) {
		cy.get(registerLocators.firstNameInput).type(firstName)
		cy.get(registerLocators.lastNameInput).type(lastName)
		cy.get(registerLocators.registerButton).click()
	}
	registerWithJustNamesAndEmail(firstName, lastName, email) {
		cy.get(registerLocators.firstNameInput).type(firstName)
		cy.get(registerLocators.lastNameInput).type(lastName)
		cy.get(registerLocators.emailInput).type(email)
		cy.get(registerLocators.registerButton).click()
	}
	blankRegister() {
		cy.get(registerLocators.registerButton).click()
	}
}

export default registerActions;