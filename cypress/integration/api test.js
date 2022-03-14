describe('This test will register a new user, login with that user, create a gallery and performa a search', () => {
    it('Create a new user', () => {
        Cypress.env('RandomMail', `apitest${Cypress._.random(0, 1e6)}@yopmail.com`)
        cy.request({
            method: 'POST',
            url: '/api/auth/register',
            body: {
                "first_name": "Testerko",
                "last_name": "Test",
                "email": Cypress.env('RandomMail'),
                "password": "Test1234",
                "password_confirmation": "Test1234",
                "terms_and_conditions": true
            }
        })
            .then((response) => {
                expect(response.status).eq(200)
                expect(response.body).to.have.all.keys(
                    'access_token', 'token_type', 'expires_in', 'user_id'
                )
            });
    });
    it('Log in with created user', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": Cypress.env('RandomMail'),
                "password": "Test1234"
            }
        })
            .then((response) => {
                expect(response.status).eq(200)
                expect(response.body).to.have.all.keys(
                    'access_token', 'token_type', 'expires_in', 'user_id'
                )
                expect(response.body.token_type).eq("bearer")
                Cypress.env('AccessToken', response.body.access_token)
            });
    });
    it('Create a gallery', () => {
        Cypress.env('GalleryName', `Gallery ${Cypress._.random(0, 1e6)}`)
        cy.request({
            method: 'POST',
            url: '/api/galleries',
            headers: {
                "Authorization": "Bearer " + Cypress.env('AccessToken')
            },
            body: {
                "title": Cypress.env('GalleryName'),
                "description": "testing",
                "images": [
                    "https://asia.olympus-imaging.com/content/000107506.jpg"
                ]
            }
        })
            .then((response) => {
                expect(response.status).eq(201)
                expect(response.body).to.have.all.keys(
                    'title', 'description', 'user_id', 'id', 'updated_at', 'created_at'
                )
            });
    });
    it('Perform search on gallery we made', () => {
        cy.request({
            method: 'GET',
            url: '/api/galleries',
            qs: {
                page: '1',
                term: Cypress.env('GalleryName')
            },
            headers: {
                "Authorization": "Bearer " + Cypress.env('AccessToken')
            }
        })
            .then((response) => {
                expect(response.status).eq(200)
                Cypress._.each(response.body.galleries, (galleries) => {
                    expect(galleries.title).to.eq(Cypress.env('GalleryName'))
                    expect(galleries).to.have.all.keys(
                        'id', 'title', 'description', 'user_id', 'created_at', 'updated_at', 'user', 'images'
                    )
                })
            });
    });

});
