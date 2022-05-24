import globalMethods from '../pages/globals.js';
import registerPage from '../pages/registerPage.js';
import navigation from '../pages/navigation.js';
import accounts from '../data/accounts.js';
import testData from '../data/testData.js';

const register = new registerPage();
const navigate = new navigation();
const globals = new globalMethods();


describe('Test all register scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies();
        navigate.visitRegister();
    })
    it('All elements are present on the page', () => {
        register.verifyAllElementsExist()
    });
    it('Try to register with blank input and expect First Name error', () => {
        register.blankRegister()
        register.verifyBlankFirstNameError()
    });
    it('Try to register with just first name and expect Last Name error', () => {
        register.registerWithJustFirstName('test')
        register.verifyBlankLastNameError()
    });
    it('Try to register with just first and last name and expect email error', () => {
        register.registerWithJustFirstAndLastName('test', 'test')
        register.verifyBlankEmailError()
    });
    it('Try to register with incomplete mail and expect errors', () => {
        register.registerWithJustNamesAndEmail('test', 'test', 'test')
        register.verifyIncorrectEmailError()
    });
    it('Try to register with false email, password and no terms and expect errors', () => {
        register.registerWithoutTerms('false', 'false', 'false@false', 'false', 'false')
        register.verifyErrorsWithFalseEmailPasswordAndNoTerms()       
    });
    it('Try to register with already registered email and passwords that do not match and expect errors', () => {
        register.registerWithTerms('Already', 'Registered', accounts.email, accounts.password, 'Test')
        register.verifyErrorsForEmailAndPasswordThatDoNotMatch()
    });
    it('Register a new account with valid data', () => {
        register.registerWithTerms(testData.randomFirstName, testData.randomLastName, testData.randomEmail, 'Test1234', 'Test1234')
        globals.verifyYouAreLoggedIn()
    });    
});