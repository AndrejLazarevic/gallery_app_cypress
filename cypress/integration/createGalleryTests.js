import createGalleryLocators from '../locators/createGalleryLocators.js';
import allGalleriesLocators from '../locators/allGalleriesLocators.js';
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
const dateTime = new dateTimeUtilities();

describe('Test all create gallery scenarios', () => {
    beforeEach(() => {    
        navigate.clearCookies()
        navigate.visitLogin()
        login.login(accounts.email, accounts.password)
        cy.wait(3000)
        navigate.visitCreateGallery()
    })
    it('All elements are present on the page', () => {
        cy.get(createGalleryLocators.createGalleryTitle).should('exist')
        cy.get(createGalleryLocators.titleLabel).should('exist')
        cy.get(createGalleryLocators.titleInput).should('exist')
        cy.get(createGalleryLocators.decriptionsLabel).should('exist')
        cy.get(createGalleryLocators.descriptionsInput).should('exist')
        cy.get(createGalleryLocators.imagesLabel).should('exist')
        cy.get(createGalleryLocators.imagesInput).should('exist')
        cy.get(createGalleryLocators.addImageButton).should('exist')
        cy.get(createGalleryLocators.submitButton).should('exist')
        cy.get(createGalleryLocators.cancelButton).should('exist')

    });
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
    it('Add image and check for new input and delete button', () => {
        createGallery.addImage(images.image1)
        cy.get(createGalleryLocators.deleteImageButton).should('exist').its('length').should('be.eq', 2)
        cy.get(createGalleryLocators.imagesInput).should('exist').its('length').should('be.eq', 2)
    })
    it('Create gallery with one image', () => {
        let galleryTitle = testData.randomGalleryTitle
        createGallery.createGallery1Image(galleryTitle, 'Some Description', images.image1)
        cy.get(allGalleriesLocators.allGalleriesTitle).should('exist')
        cy.get(allGalleriesLocators.boxGalleryTitle).eq(0).then((title) => {
            expect(title.text().trim()).to.eq(galleryTitle)
        })
        cy.get(allGalleriesLocators.boxGalleryAuthorLink).eq(0).then((authorLink) => {
            expect(authorLink.text().trim()).to.eq(accounts.accountName)
        })
        cy.get(allGalleriesLocators.boxGalleryDate).eq(0).then((date) => {
            expect(date.text().trim()).to.eq("Created at: " + dateTime.currentDate())
        })
        cy.get(allGalleriesLocators.boxGalleryImage).eq(0).invoke('attr', 'src').then((image) => {
            expect(image).to.eq(images.image1)
        })
    })
});