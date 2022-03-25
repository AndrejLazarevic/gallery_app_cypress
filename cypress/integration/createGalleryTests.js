import createGalleryLocators from '../locators/createGalleryLocators.js';
import allGalleriesLocators from '../locators/allGalleriesLocators.js';
import navigationActions from '../actions/navigationActions.js';
import loginActions from '../actions/loginActions.js';  
import createGalleryActions from '../actions/createGalleryActions.js';
import errors from '../data/errors.js';
import accounts from '../data/accounts.js';
import images from '../data/images.js';
import testData from '../data/testData.js';

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
    it('Try to submit gallery without url and expect url error', () => {
        createGallery.createGalleryJustTitle('Some Title')
        cy.get(createGalleryLocators.imagesInput).then((imageInput) => {
            expect(imageInput[0].validationMessage).to.eq(errors.blankField)
        })
    })
    it('Try to submit gallery with invalid url and expect errors', () => {
        createGallery.createGallery1Image('Some Title', 'Some Description', 'ivlaidurl')
        cy.get(createGalleryLocators.imagesInput).then((imageInput) => {
            expect(imageInput[0].validationMessage).to.eq(errors.invalidUrl)
        })
    })
    it('Try to submit gallery with invalid image format and small title and expect errors', () => {
        createGallery.createGallery1Image(testData.smallGalleryTitle, 'Some Description', images.invalidImage)
        cy.get(createGalleryLocators.errorMessage).eq(0).should('have.text', errors.galleryTitleTooSmall)
        cy.get(createGalleryLocators.errorMessage).eq(1).should('have.text', errors.invalidImageFormat)
        
    })
    it('Try to submit gallery with invalid image format and big title and expect errors', () => {
        createGallery.createGallery1Image(testData.bigGalleryTitle, 'Some Description', images.invalidImage)
        cy.get(createGalleryLocators.errorMessage).eq(0).should('have.text', errors.galleryTitleTooBig)
        cy.get(createGalleryLocators.errorMessage).eq(1).should('have.text', errors.invalidImageFormat)
    })
    it('Create gallery with one image', () => {
        let galleryTitle = testData.randomGalleryTitle
        createGallery.createGallery1Image(galleryTitle, 'Some Description', images.image1)
        cy.get(allGalleriesLocators.allGalleriesTitle).should('exist')
        
        cy.get(allGalleriesLocators.boxGalleryTitle).eq(0).should((title) => {
            expect(title.text().trim()).to.eq(galleryTitle)
        })
    })
});