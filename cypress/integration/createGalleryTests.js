import createGalleryLocators from '../locators/createGalleryLocators.js';
import navigationActions from '../actions/navigationActions.js';
import loginActions from '../actions/loginActions.js';  
import createGalleryActions from '../actions/createGalleryActions.js';
import errors from '../data/errors.js';
import accounts from '../data/accounts.js';


const login = new loginActions(); 
const navigate = new navigationActions();
const createGallery = new createGalleryActions();

describe('Test all create gallery scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies()
        navigate.visitLogin()
        login.login(accounts.email, accounts.password)
        cy.wait(1000)
        navigate.visitCreateGallery()
    })
    it('Try to submit blank gallery and expect title error', () => {
        createGallery.blankCreateGallery()
        cy.get(createGalleryLocators.titleInput).then((titleInput) => {
            expect(titleInput[0].validationMessage).to.eq(errors.blankField)
        })
    });    
});