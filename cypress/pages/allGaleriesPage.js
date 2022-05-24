import accounts from '../data/accounts.js';

// locators //
const allGalleriesTitle = 'h1.title-style:contains("All Galleries")'
const boxGalleryTitle = '.grid .cell h2 a.box-title'
const boxGalleryAuthor = '.grid .cell p'
const boxGalleryAuthorLink = '.grid .cell p a'
const boxGalleryDate = '.grid .cell small'
const boxGalleryImage = '.grid .cell img.responsive-image'
const searchInput = 'input[placeholder="Search..."]'
const searchButton = '.input-group-append button:contains("Filter")'
const noGalleriesFound = 'h4:contains("No galleries found")'

// methods //
class allGalleriesPage {
	blankSearch() {
		cy.get(searchButton).click()
	}
	performSearch(term) {
		cy.get(searchInput).type(term)
		cy.get(searchButton).click()
	}
	verifyInvalidSearchElements() {
		cy.get(noGalleriesFound).should('exist')
		cy.get(boxGalleryTitle).should('not.exist')
		cy.get(boxGalleryAuthor).should('not.exist')
		cy.get(boxGalleryDate).should('not.exist')
		cy.get(boxGalleryImage).should('not.exist')
	}
	verifyGalleryWith1ImageIsCreated(galleryTitle, galleryImage, galleryCreationDate) {
		cy.get(allGalleriesTitle).should('exist')
		cy.get(boxGalleryTitle).eq(0).then((title) => {
			expect(title.text().trim()).to.eq(galleryTitle)
		})
		cy.get(boxGalleryAuthorLink).eq(0).then((authorLink) => {
			expect(authorLink.text().trim()).to.eq(accounts.accountName)
		})
		cy.get(boxGalleryDate).eq(0).then((date) => {
			expect(date.text().trim()).to.eq("Created at: " + galleryCreationDate)
		})
		cy.get(boxGalleryImage).eq(0).invoke('attr', 'src').then((image) => {
			expect(image).to.eq(galleryImage)
		})
	}
}
export default allGalleriesPage;