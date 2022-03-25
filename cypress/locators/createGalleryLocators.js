export default {
    createGalleryTitle: 'h1.title-style:contains("Create Gallery")',
    titleLabel: 'label[for="title"]',
    titleInput: '#title',
    decriptionsLabel: 'label[for="descriptions"]:contains("Descriptions:")',
    descriptionsInput: '#description',
    imagesLabel: 'label[for="descriptions"]:contains("Images:")',
    imagesInput: 'input[placeholder="image url"]',
    addImageButton: 'button:contains("Add image")',
    submitButton: 'button:contains("Submit")',
    cancelButton: 'button:contains("Cancel")',
    errorMessage: 'p.alert-danger',
    deleteImageButton: 'button:has(.fa-trash)',
    moveImageUpButton: 'button:has(.fa-chevron-circle-up)',
    moveImageDownButton: 'button:has(.fa-chevron-circle-down)'
}