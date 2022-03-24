import loginLocators from '../locators/loginLocators.js';  
import globalLocators from '../locators/globalLocators.js'; 
import loginActions from '../actions/loginActions.js';  
import navigationActions from '../actions/navigationActions.js';
import errors from '../data/errors.js';
import accounts from '../data/accounts.js';

const login = new loginActions(); 
const navigate = new navigationActions();

describe('Test all login scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies();
        navigate.visitLogin();
    })
    it('All elements are present on the page', () => {
        cy.get(loginLocators.loginTitle).should('exist')
        cy.get(loginLocators.loginButton).should('exist')
        cy.get(loginLocators.emailInput).should('exist')
        cy.get(loginLocators.emailLabel).should('exist')
        cy.get(loginLocators.passwordInput).should('exist')
        cy.get(loginLocators.passwordLabel).should('exist')
        
    });
    it('Try to login with with blank password and email and expect error', () => {
        login.blankLogin()
        cy.get(loginLocators.emailInput).then((emailInput) => {
            expect(emailInput[0].validationMessage).to.eq(errors.blankField)
        })
    });
    it('Try to login with with blank password and expect error', () => {
        login.justEmailLogin('test@gmail.com')
        cy.get(loginLocators.passwordInput).then((passwordInput) => {
            expect(passwordInput[0].validationMessage).to.eq(errors.blankField)
        })
    });
    it('Try to login with with blank email and expect error', () => {
        login.justPasswordLogin('test')
        cy.get(loginLocators.emailInput).then((emailInput) => {
            expect(emailInput[0].validationMessage).to.eq(errors.blankField)
        })
    });
    it('Try to login with with invalid email format and expect error', () => {
        login.justEmailLogin('test')
        cy.get(loginLocators.emailInput).then((emailEntry) => {
            expect(emailEntry[0].validationMessage).to.eq(errors.incorrectEmailFormat(emailEntry))
        })
    });
    it('Try to login with with invalid username and password and expect error', () => {
        login.login('test@gmail.com', 'test')
        cy.get(loginLocators.errorMessage).should('exist')
        cy.get(loginLocators.errorMessage).should((errorMessage) => {
            expect(errorMessage.text()).to.eq(errors.badCredentials)
        })
    });
    it('Login with correct email and password', () => {
        login.login(accounts.email, accounts.password)
        cy.get(globalLocators.logoutButton).should('exist')
        cy.get(globalLocators.loginButton).should('not.exist')
        cy.get(globalLocators.registerButton).should('not.exist')
    });
});