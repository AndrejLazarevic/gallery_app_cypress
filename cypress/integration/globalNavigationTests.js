import loginPage from '../pages/loginPage.js';
import navigation from '../pages/navigation.js';
import globalMethods from '../pages/globals.js';

const login = new loginPage(); 
const navigate = new navigation();
const globals = new globalMethods();

describe('Test redirection of all links from global navigation', () => {
    beforeEach(() => {    
        navigate.clearCookies();
        navigate.visitHome();
    })
    it('Proper elements are present/missing when not logged in', () => {
        globals.verifyElementsWhenNotLoggedIn()       
    });
    it('Proper elements are present/missing when logged in', () => {
        navigate.visitLogin()
        login.login(accounts.email, accounts.password)
        globals.verifyElementsWhenLoggedIn()
    });
    it('Check Login redirection', () => {
        globals.clickLoginAndVerifyRedirection()
    });
    it('Check Register redirection', () => {
        globals.clickRegisterAndVerifyRedirection()
    });
});