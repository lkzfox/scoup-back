const request = require('supertest');
const { createUser, checkDatabaseConnection } = require('./utils');

const test_email = 'authtest@gmail.com'
const test_pwd = 'TASU78dasdhjas'

let server;

describe('api/auth', () => {

    beforeEach(() => (async () => {
        server = require('../../server')
        await checkDatabaseConnection;
        await createUser(test_email, test_pwd);
        })()
    )
    afterEach(() => server.close())

    describe('GET /', () => {
        it('should be 200', async () => {
            const res = await request(server).get('/api/v1/user')
            expect(res.status).toBe(401)
        })
    })
})