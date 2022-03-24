import createGalleryLocators from '../locators/createGalleryLocators.js';  

class createGalleryActions {
	blankCreateGallery() {
		cy.get(createGalleryLocators.submitButton).click()
	}
}

export default createGalleryActions;