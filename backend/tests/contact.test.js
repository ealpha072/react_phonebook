import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'

const api = supertest(app)

test('notes returned as JSON', async() => {
    await api.get('/contacts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})