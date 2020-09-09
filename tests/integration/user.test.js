const request = require('supertest');
const { createUser, checkDatabaseConnection, clearDatabase } = require('./utils');

let server;

describe('api/user', () => {

    beforeEach(() => (async () => {
        server = require('../../server')
        await checkDatabaseConnection()
        })()
    )
    afterEach(() => {
        clearDatabase()
        server.close()
    })

    describe('GET /me', () => {
        it('should be 200 even without user logged', async () => {
            const res = await request(server).get('/api/v1/user/me')            
            expect(res.status).toBe(200)
            expect(res.data).toBe(undefined)
        })
    })

    describe('GET /me', () => {
        it('should be 200 with user logged', async () => {
            const user = await createUser('teste@teste.com', '12345678');
            const res = await request(server).get('/api/v1/user/me').set('authorization', 'Bearer ' + user.createToken())
            expect(res.status).toBe(200)
            expect(res.body).toBe('ME')
        })
    })

    describe('GET /', () => {
        it('should be 401 without user logged', async () => {
            const res = await request(server).get('/api/v1/user')
            expect(res.status).toBe(401)
        })
    })
})