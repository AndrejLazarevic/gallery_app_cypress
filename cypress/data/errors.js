export default {
    blankField: 'Please fill out this field.',
    incorrectEmailFormat(emailEntry) {
        if (Cypress.isBrowser('firefox')) {
            return `Please enter an email address.`            
        } else {
            return `Please include an '@' in the email address. '${emailEntry.val()}' is missing an '@'.`
        }        
    },
    invalidEmailAddress: 'The email must be a valid email address.',
    passwordNotEnoughCharacters: 'The password must be at least 8 characters.',
    termsNotAcceppted: 'The terms and conditions must be accepted.',
    badCredentials: 'Bad Credentials',
    emailAlreadyRegistered: 'The email has already been taken.',
    passdordsDoNotMatch: 'The password confirmation does not match.',
    invalidUrl: 'Please enter a URL.',
    invalidImageFormat: 'Wrong format of image',
    galleryTitleTooSmall: 'The title must be at least 2 characters.',
    galleryTitleTooBig: 'The title may not be greater than 255 characters.'
}