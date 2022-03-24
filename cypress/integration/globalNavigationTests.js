import loginLocators from '../locators/loginLocators.js';  
import globalLocators from '../locators/globalLocators.js'; 
import loginActions from '../actions/loginActions.js';  
import navigationActions from '../actions/navigationActions.js';  
import globalActions from '../actions/globalActions.js';
import accounts from '../data/accounts.js';

const login = new loginActions(); 
const navigate = new navigationActions();
const global = new globalActions();

describe('Test redirection of all links from global navigation', () => {
    beforeEach(() => {    
        navigate.clearCookies();
        navigate.visitHome();
    })
    it('Proper elements are present/missing when not logged in', () => {
        cy.get(globalLocators.loginButton).should('exist')
        cy.get(globalLocators.registerButton).should('exist')
        cy.get(globalLocators.allGalleriesButton).should('exist')
        cy.get(globalLocators.homeButton).should('exist')
        cy.get(globalLocators.logoutButton).should('not.exist')
        cy.get(globalLocators.myGalleries).should('not.exist')
        cy.get(globalLocators.createGallery).should('not.exist')        
    });
    it('Proper elements are present/missing when logged in', () => {
        navigate.visitLogin()
        login.login(accounts.email, accounts.password)
        cy.get(globalLocators.loginButton).should('exist')
        cy.get(globalLocators.registerButton).should('exist')
        cy.get(globalLocators.allGalleriesButton).should('exist')
        cy.get(globalLocators.homeButton).should('exist')
        cy.get(globalLocators.logoutButton).should('exist')
        cy.get(globalLocators.myGalleries).should('exist')
        cy.get(globalLocators.createGallery).should('exist')
    });
    it('Check Login redirection', () => {
        global.clickLogin()
        cy.url().should('include', '/login')
    });
    it('Check Register redirection', () => {
        global.clickRegister()
        cy.url().should('include', '/register')
    });
});