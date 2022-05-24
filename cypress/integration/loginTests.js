import loginPage from '../pages/loginPage.js';  
import navigation from '../pages/navigation.js';
import globalMethods from '../pages/globals.js';
import accounts from '../data/accounts.js';


const login = new loginPage(); 
const navigate = new navigation();
const globals = new globalMethods();

describe('Test all login scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies();
        navigate.visitLogin();
    })
    it('All elements are present on the page', () => {
        login.verifyAllElementsExist()
    });
    it('Try to login with with blank password and email and expect error', () => {
        login.blankLogin()
        login.verifyBlankEmailFieldError()
    });
    it('Try to login with with blank password and expect error', () => {
        login.justEmailLogin('test@gmail.com')
        login.verifyBlankPasswordError()
    });
    it('Try to login with with blank email and expect error', () => {
        login.justPasswordLogin('test')
        login.verifyBlankEmailFieldError()
    });
    it('Try to login with with invalid email format and expect error', () => {
        login.justEmailLogin('test')
        login.verifyInvalidEmailError()
    });
    it('Try to login with with invalid username and password and expect error', () => {
        login.login('test@gmail.com', 'test')
        login.verifyBadCredentialsError()
    });
    it('Login with correct email and password and verify you are logged in', () => {
        login.login(accounts.email, accounts.password)
        globals.verifyYouAreLoggedIn()
    });
});