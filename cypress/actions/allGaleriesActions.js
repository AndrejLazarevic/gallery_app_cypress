import allGalleriesLocators from '../locators/allGalleriesLocators.js';

class allGalleriesActions {
	blankSearch() {
		cy.get(allGalleriesLocators.searchButton).click()
	}
	performSearch(term) {
		cy.get(allGalleriesLocators.searchInput).type(term)
		cy.get(allGalleriesLocators.searchButton).click()
	}
}

export default allGalleriesActions;