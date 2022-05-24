import navigation from '../pages/navigation.js';
import loginPage from '../pages/loginPage.js';
import createGalleryPage from '../pages/createGalleryPage.js';
import accounts from '../data/accounts.js';
import testData from '../data/testData.js';
import images from '../data/images.js';
import dateTimeUtilities from '../utilities/dateTimeUtilities.js';
import allGalleriesPage from '../pages/allGaleriesPage.js';

const login = new loginPage();
const navigate = new navigation();
const createGallery = new createGalleryPage();
const allGalleries = new allGalleriesPage();
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
        createGallery.verifyAllElementsExist()

    });
    it('Try to submit blank gallery and expect title error', () => {
        createGallery.blankCreateGallery()
        createGallery.verifyTitleError()
    });
    it('Try to submit gallery without url and expect url error', () => {
        createGallery.createGalleryJustTitle('Some Title')
        createGallery.verifyBlankUrlError()
    })
    it('Try to submit gallery with invalid url and expect errors', () => {
        createGallery.createGalleryWith1Image('Some Title', 'Some Description', 'ivlaidurl')
        createGallery.verifyInvalidUrlError()
    })
    it('Try to submit gallery with invalid image format and small title and expect errors', () => {
        createGallery.createGalleryWith1Image(testData.smallGalleryTitle, 'Some Description', images.invalidImage)
        createGallery.verifySmallTitleAndInvalidImageFormatError()        
    })
    it('Try to submit gallery with invalid image format and big title and expect errors', () => {
        createGallery.createGalleryWith1Image(testData.bigGalleryTitle, 'Some Description', images.invalidImage)
        createGallery.verifyBigTitleAndInvalidImageFormatError()
    })
    it('Add image and check for new input and delete button', () => {
        createGallery.addImage(images.image1)
        createGallery.verifyNewInputAndDeleteButtonExistOnThePage()
    })
    it('Create gallery with one image and verify it', () => {
        let galleryTitle = testData.randomGalleryTitle
        let galleryDescription = 'Some Description'
        let galleryImage = images.image1
        let galleryCreationDate = dateTime.currentDate()

        createGallery.createGalleryWith1Image(galleryTitle, galleryDescription, galleryImage)
        allGalleries.verifyGalleryWith1ImageIsCreated(galleryTitle, galleryImage, galleryCreationDate)
    })
});