describe('This test will register a new user, login with that user, create a gallery, search for it, edit it and delete it', () => {
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
                "description": "This is initial description",
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
                Cypress.env('InitialDescription', response.body.description)
                Cypress.env('GalleryID', response.body.id)
            });
    });
    it('Perform a search and find gallery we made', () => {
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
                expect(response.body.galleries[0].description).to.eq(Cypress.env('InitialDescription'))
                expect(response.body.galleries[0].id).to.eq(Cypress.env('GalleryID'))
            });
    });
    it('Edit description on the gallery we made', () => {
        cy.request({
            method: 'PUT',
            url: '/api/galleries/' + Cypress.env('GalleryID'),
            headers: {
                "Authorization": "Bearer " + Cypress.env('AccessToken')
            },
            body: {
                "title": Cypress.env('GalleryName'),
                "description": "This is edited description",
                "images": [
                    "https://asia.olympus-imaging.com/content/000107506.jpg"
                ]
            }
        })
            .then((response) => {
                expect(response.status).eq(200)
                expect(response.body).to.have.all.keys(
                    'title', 'description', 'user_id', 'id', 'updated_at', 'created_at'
                )
                expect(response.body.description).to.eq('This is edited description')
                expect(response.body.id).to.eq(Cypress.env('GalleryID'))
            });
    });
    it('Delete the gallery we made', () => {
        cy.request({
            method: 'Delete',
            url: '/api/galleries/' + Cypress.env('GalleryID'),
            headers: {
                "Authorization": "Bearer " + Cypress.env('AccessToken')
            }
        })
            .then((response) => {
                expect(response.status).eq(200)
                expect(response.body).to.eq('1')
            });
    });
    it('Perform another search on the galery we deleted to make sure it is no longer there', () => {
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
                expect(response.body.count).to.eq(0)                
            });
    });
    it('Do a 404 call and expect 404', () => {
        cy.request({
            method: 'POST',
            url: '/example',
            body: {
                key: 'Value'
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(404)
            });
    });
});
