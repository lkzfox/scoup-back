const request = require('supertest');
const { createUser, checkDatabaseConnection } = require('./utils');
const User = require('../../models/User');

let server;

describe('api/user', () => {

    beforeEach(() => (async () => {
        delete require.cache[require.resolve('../../server')]
        server = await require('../../server')
        await checkDatabaseConnection();
        await createUser();
        })()
    )
    afterEach(() => {
        server.close()
        server = null;
    })

    describe('GET /', () => {
        it('should be 200', async () => {
            const res = await request(server).get('/api/v1/user')
            expect(res.status).toBe(401)
        })
    })

    describe('GET /', () => {
        it('should be 200', async () => {
            const res = await request(server).get('/api/v1/user')
            expect(res.status).toBe(401)
        })
    })

    describe('GET /', () => {
        it('should be 200', async () => {
            const res = await request(server).get('/api/v1/user')
            expect(res.status).toBe(401)
        })
    })
    
    describe('GET /', () => {
        it('should be 200', async () => {
            const res = await request(server).get('/api/v1/user')
            expect(res.status).toBe(401)
        })
    })
})