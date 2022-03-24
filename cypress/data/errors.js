export default {
    blankField: 'Please fill in this field.',
    incorrectEmailFormat(emailEntry) {
        if (Cypress.isBrowser('chrome')) {
            return `Please include an '@' in the email address. '${emailEntry.val()}' is missing an '@'.`
        } else {
            return `Please enter an email address.`
        }        
    },
    invalidEmailAddress: 'The email must be a valid email address.',
    passwordNotEnoughCharacters: 'The password must be at least 8 characters.',
    termsNotAcceppted: 'The terms and conditions must be accepted.',
    badCredentials: 'Bad Credentials',
    emailAlreadyRegistered: 'The email has already been taken.',
    passdordsDoNotMatch: 'The password confirmation does not match.'
}