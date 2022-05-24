import errors from '../data/errors.js';

// locators //
const registerTitle = 'h1.title-style:contains("Register")'
const firstNameLabel = 'label[for="first-name"]'
const firstNameInput = '#first-name'
const lastNameLabel = 'label[for="last-name"]'
const lastNameInput = '#last-name'
const emailLabel = 'label[for="email"]'
const emailInput = '#email'
const passwordLabel = 'label[for="password"]'
const passwordInput = '#password'
const confirmPasswordLabel = 'label[for="password-confirmation"]'
const confirmPasswordInput = '#password-confirmation'
const termsCheckboxLabel = 'label[for="exampleCheck1"]'
const termsCheckbox = 'input.form-check-input'
const registerButton = 'button[type="submit"]'
const errorMessage = 'p.alert-danger'

// methods //
class registerPage {
	registerWithTerms(firstName, lastName, email, password, confirmPassword) {
		cy.get(firstNameInput).type(firstName)
		cy.get(lastNameInput).type(lastName)
		cy.get(emailInput).type(email)
		cy.get(passwordInput).type(password)
		cy.get(confirmPasswordInput).type(confirmPassword)
		cy.get(termsCheckbox).click()
		cy.get(registerButton).click()
	}
	registerWithoutTerms(firstName, lastName, email, password, confirmPassword) {
		cy.get(firstNameInput).type(firstName)
		cy.get(lastNameInput).type(lastName)
		cy.get(emailInput).type(email)
		cy.get(passwordInput).type(password)
		cy.get(confirmPasswordInput).type(confirmPassword)
		cy.get(registerButton).click()
	}
	registerWithJustFirstName(firstName) {
		cy.get(firstNameInput).type(firstName)
		cy.get(registerButton).click()
	}
	registerWithJustFirstAndLastName(firstName, lastName) {
		cy.get(firstNameInput).type(firstName)
		cy.get(lastNameInput).type(lastName)
		cy.get(registerButton).click()
	}
	registerWithJustNamesAndEmail(firstName, lastName, email) {
		cy.get(firstNameInput).type(firstName)
		cy.get(lastNameInput).type(lastName)
		cy.get(emailInput).type(email)
		cy.get(registerButton).click()
	}
	blankRegister() {
		cy.get(registerButton).click()
	}
	verifyAllElementsExist() {
		cy.get(registerTitle).should('exist')
		cy.get(firstNameLabel).should('exist')
		cy.get(firstNameInput).should('exist')
		cy.get(lastNameLabel).should('exist')
		cy.get(lastNameInput).should('exist')
		cy.get(emailLabel).should('exist')
		cy.get(emailInput).should('exist')
		cy.get(passwordLabel).should('exist')
		cy.get(passwordInput).should('exist')
		cy.get(confirmPasswordLabel).should('exist')
		cy.get(confirmPasswordInput).should('exist')
		cy.get(termsCheckbox).should('exist')
		cy.get(termsCheckboxLabel).should('exist')
		cy.get(registerButton).should('exist')
	}
	verifyBlankFirstNameError() {
		cy.get(firstNameInput).then((firstNameInput) => {
			expect(firstNameInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyBlankLastNameError() {
		cy.get(lastNameInput).then((lastNameInput) => {
			expect(lastNameInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyBlankEmailError() {
		cy.get(emailInput).then((emailInput) => {
			expect(emailInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyIncorrectEmailError() {
		cy.get(emailInput).then((emailEntry) => {
			expect(emailEntry[0].validationMessage).to.eq(errors.incorrectEmailFormat(emailEntry))
		})
	}
	verifyErrorsWithFalseEmailPasswordAndNoTerms() {
		cy.get(errorMessage).should('exist')
		cy.get(errorMessage).eq(0).should('have.text', errors.invalidEmailAddress)
		cy.get(errorMessage).eq(1).should('have.text', errors.passwordNotEnoughCharacters)
		cy.get(errorMessage).eq(2).should('have.text', errors.termsNotAcceppted)
	}
	verifyErrorsForEmailAndPasswordThatDoNotMatch() {
		cy.get(errorMessage).should('exist')
		cy.get(errorMessage).eq(0).should('have.text', errors.emailAlreadyRegistered)
		cy.get(errorMessage).eq(1).should('have.text', errors.passdordsDoNotMatch)
    }
}
export default registerPage;