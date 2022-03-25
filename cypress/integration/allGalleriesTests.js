import allGalleriesLocators from '../locators/allGalleriesLocators.js';
import allGaleriesActions from '../actions/allGaleriesActions.js';
import navigationActions from '../actions/navigationActions.js';
import loginActions from '../actions/loginActions.js';  
import createGalleryActions from '../actions/createGalleryActions.js';
import errors from '../data/errors.js';
import accounts from '../data/accounts.js';
import images from '../data/images.js';
import testData from '../data/testData.js';
import dateTimeUtilities from '../utilities/dateTimeUtilities.js';

const login = new loginActions(); 
const navigate = new navigationActions();
const createGallery = new createGalleryActions();
const allGalleries = new allGaleriesActions();

describe('Test all galleries screen scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies()
        navigate.visitLogin()
        login.login(accounts.email, accounts.password)
        cy.wait(1000)
        navigate.visitHome()
    })
    it('Perform invalid search and expect error', () => {
        allGalleries.performSearch('7f340f03288453493fj4733484fj2')
        cy.get(allGalleriesLocators.noGalleriesFound).should('exist')
        cy.get(allGalleriesLocators.boxGalleryTitle).should('not.exist')
        cy.get(allGalleriesLocators.boxGalleryAuthor).should('not.exist')
        cy.get(allGalleriesLocators.boxGalleryDate).should('not.exist')
        cy.get(allGalleriesLocators.boxGalleryImage).should('not.exist')
    });
});