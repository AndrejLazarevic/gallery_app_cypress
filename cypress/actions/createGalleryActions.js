import createGalleryLocators from '../locators/createGalleryLocators.js';  

class createGalleryActions {
	blankCreateGallery() {
		cy.get(createGalleryLocators.submitButton).click()
	}
	createGalleryJustTitle(title) {
		cy.get(createGalleryLocators.titleInput).type(title)
		cy.get(createGalleryLocators.submitButton).click()
	}
	createGallery1Image(title, description, image1) {
		cy.get(createGalleryLocators.titleInput).type(title)
		cy.get(createGalleryLocators.descriptionsInput).type(description)
		cy.get(createGalleryLocators.imagesInput).eq(0).type(image1)
		cy.get(createGalleryLocators.submitButton).click()
	}
	createGallery2Image(title, description, image1, image2) {
		cy.get(createGalleryLocators.titleInput).type(title)
		cy.get(createGalleryLocators.descriptionsInput).type(description)
		cy.get(createGalleryLocators.imagesInput).eq(0).type(image1)
		cy.get(createGalleryLocators.addImageButton).click()
		cy.get(createGalleryLocators.imagesInput).eq(2).type(image2)
		cy.get(createGalleryLocators.submitButton).click()
	}
	addImage(image1) {
		cy.get(createGalleryLocators.imagesInput).eq(0).type(image1)
		cy.get(createGalleryLocators.addImageButton).click()
    }
}

export default createGalleryActions;