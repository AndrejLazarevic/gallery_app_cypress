import errors from '../data/errors.js';


// locators //
const createGalleryTitle = 'h1.title-style:contains("Create Gallery")'
const titleLabel = 'label[for="title"]'
const titleInput = '#title'
const decriptionsLabel = 'label[for="descriptions"]:contains("Descriptions:")'
const descriptionsInput = '#description'
const imagesLabel = 'label[for="descriptions"]:contains("Images:")'
const imagesInput = 'input[placeholder="image url"]'
const addImageButton = 'button:contains("Add image")'
const submitButton = 'button:contains("Submit")'
const cancelButton = 'button:contains("Cancel")'
const errorMessage = 'p.alert-danger'
const deleteImageButton = 'button:has(.fa-trash)'
const moveImageUpButton = 'button:has(.fa-chevron-circle-up)'
const moveImageDownButton = 'button:has(.fa-chevron-circle-down)'

// methods //
class createGalleryPage {
	blankCreateGallery() {
		cy.get(submitButton).click()
	}
	createGalleryJustTitle(title) {
		cy.get(titleInput).type(title)
		cy.get(submitButton).click()
	}
	createGalleryWith1Image(title, description, image1) {
		cy.get(titleInput).type(title)
		cy.get(descriptionsInput).type(description)
		cy.get(imagesInput).eq(0).type(image1)
		cy.get(submitButton).click()
	}
	createGalleryWith2Images(title, description, image1, image2) {
		cy.get(titleInput).type(title)
		cy.get(descriptionsInput).type(description)
		cy.get(imagesInput).eq(0).type(image1)
		cy.get(addImageButton).click()
		cy.get(imagesInput).eq(2).type(image2)
		cy.get(submitButton).click()
	}
	addImage(image1) {
		cy.get(imagesInput).eq(0).type(image1)
		cy.get(addImageButton).click()
	}
	verifyAllElementsExist() {
		cy.get(createGalleryTitle).should('exist')
		cy.get(titleLabel).should('exist')
		cy.get(titleInput).should('exist')
		cy.get(decriptionsLabel).should('exist')
		cy.get(descriptionsInput).should('exist')
		cy.get(imagesLabel).should('exist')
		cy.get(imagesInput).should('exist')
		cy.get(addImageButton).should('exist')
		cy.get(submitButton).should('exist')
		cy.get(cancelButton).should('exist')
	}
	verifyTitleError() {
		cy.get(titleInput).then((titleInput) => {
			expect(titleInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyBlankUrlError() {
		cy.get(imagesInput).then((imageInput) => {
			expect(imageInput[0].validationMessage).to.eq(errors.blankField)
		})
	}
	verifyInvalidUrlError() {
		cy.get(imagesInput).then((imageInput) => {
			expect(imageInput[0].validationMessage).to.eq(errors.invalidUrl)
		})
	}
	verifySmallTitleAndInvalidImageFormatError() {
		cy.get(errorMessage).eq(0).should('have.text', errors.galleryTitleTooSmall)
		cy.get(errorMessage).eq(1).should('have.text', errors.invalidImageFormat)
	}
	verifyBigTitleAndInvalidImageFormatError() {
		cy.get(errorMessage).eq(0).should('have.text', errors.galleryTitleTooBig)
		cy.get(errorMessage).eq(1).should('have.text', errors.invalidImageFormat)
	}
	verifyNewInputAndDeleteButtonExistOnThePage() {
		cy.get(deleteImageButton).should('exist').its('length').should('be.eq', 2)
		cy.get(imagesInput).should('exist').its('length').should('be.eq', 2)
	}	
}
export default createGalleryPage;