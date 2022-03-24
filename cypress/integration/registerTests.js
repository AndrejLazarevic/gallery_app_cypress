import registerLocators from '../locators/registerLocators.js';
import globalLocators from '../locators/globalLocators.js'; 
import registerActions from '../actions/registerActions.js';
import navigationActions from '../actions/navigationActions.js';
import errors from '../data/errors.js';
import accounts from '../data/accounts.js';

const register = new registerActions();
const navigate = new navigationActions();

describe('Test all login scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies();
        navigate.visitRegister();
    })
    it('All elements are present on the page', () => {
        cy.get(registerLocators.registerTitle).should('exist')
        cy.get(registerLocators.firstNameLabel).should('exist')
        cy.get(registerLocators.firstNameInput).should('exist')
        cy.get(registerLocators.lastNameLabel).should('exist')
        cy.get(registerLocators.lastNameInput).should('exist')
        cy.get(registerLocators.emailLabel).should('exist')
        cy.get(registerLocators.emailInput).should('exist')
        cy.get(registerLocators.passwordLabel).should('exist')
        cy.get(registerLocators.passwordInput).should('exist')
        cy.get(registerLocators.confirmPasswordLabel).should('exist')
        cy.get(registerLocators.confirmPasswordInput).should('exist')
        cy.get(registerLocators.termsCheckbox).should('exist')
        cy.get(registerLocators.termsCheckboxLabel).should('exist')
        cy.get(registerLocators.registerButton).should('exist')        
    });
    it('Try to register with blank input and expect First Name error', () => {
        register.blankRegister()
        cy.get(registerLocators.firstNameInput).then((firstNameInput) => {
            expect(firstNameInput[0].validationMessage).to.eq(errors.blankField)
        })
    });
    it('Try to register with just first name and expect Last Name error', () => {
        register.registerWithJustFirstName('test')
        cy.get(registerLocators.lastNameInput).then((lastNameInput) => {
            expect(lastNameInput[0].validationMessage).to.eq(errors.blankField)
        })
    });
    it('Try to register with just first and last name and expect email error', () => {
        register.registerWithJustFirstAndLastName('test', 'test')
        cy.get(registerLocators.emailInput).then((emailInput) => {
            expect(emailInput[0].validationMessage).to.eq(errors.blankField)
        })
    });
    it('Try to register with incomplete mail and expect errors', () => {
        register.registerWithJustNamesAndEmail('test', 'test', 'test')
        cy.get(registerLocators.emailInput).then((emailEntry) => {
            expect(emailEntry[0].validationMessage).to.eq(errors.incorrectEmailFormat(emailEntry))
        })
    });
    it('Try to register with false email, password and no terms and expect errors', () => {
        register.registerWithoutTerms('false', 'false', 'false@false', 'false', 'false')
        cy.get(registerLocators.errorMessage).should('exist')
        cy.get(registerLocators.errorMessage).eq(0).should('have.text', errors.invalidEmailAddress)
        cy.get(registerLocators.errorMessage).eq(1).should('have.text', errors.passwordNotEnoughCharacters)
        cy.get(registerLocators.errorMessage).eq(2).should('have.text', errors.termsNotAcceppted)       
    });
    it('Try to register with already registered email and passwords that do not match and expect errors', () => {
        register.registerWithTerms('Already', 'Registered', accounts.email, accounts.password, 'Test')
        cy.get(registerLocators.errorMessage).should('exist')
        cy.get(registerLocators.errorMessage).eq(0).should('have.text', errors.emailAlreadyRegistered)
        cy.get(registerLocators.errorMessage).eq(1).should('have.text', errors.passdordsDoNotMatch)
    });
    it('Register a new account with valid data', () => {
        register.registerWithTerms(`Firstname ${Cypress._.random(0, 1e6)}`, `Lastname ${Cypress._.random(0, 1e6)}`, `testoje${Cypress._.random(0, 1e6)}@yopmail.com`, 'Test1234', 'Test1234')
        cy.get(globalLocators.logoutButton).should('exist')
        cy.get(globalLocators.loginButton).should('not.exist')
        cy.get(globalLocators.registerButton).should('not.exist')
    });    
});