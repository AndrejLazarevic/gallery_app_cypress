import loginPage from '../pages/loginPage.js';
import navigation from '../pages/navigation.js';
import allGalleriesPage from '../pages/allGaleriesPage.js';
import accounts from '../data/accounts.js';

const login = new loginPage();
const navigate = new navigation();
const allGalleries = new allGalleriesPage();

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
        allGalleries.verifyInvalidSearchElements()
    });
});