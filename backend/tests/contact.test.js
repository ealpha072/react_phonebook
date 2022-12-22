import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import Contact from '../models/contact.js'

const api = supertest(app)

const initialContacts = [
    {
        name:'Andrew Tate',
        number: '0798654353',
        date:new Date(),
        important: true
    },
    {
        name:'Jordan Peterson',
        number: '0765430983',
        date: new Date(),
        important: false
    }
]

beforeEach(async () => {
    await Contact.deleteMany({})
    let contactObject = new Contact(initialContacts[0])
    await contactObject.save()
    contactObject = new Contact(initialContacts[1])
    await contactObject.save()
}, 100000)

test('notes returned as JSON', async() => {
    await api.get('/contacts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async() => {
    const response = await api.get('/contacts')
    expect(response.body).toHaveLength(initialContacts.length)
}, 100000)

test('specific note exists', async() => {
    const response = await api.get('/contacts')
    const contents = response.body.map(r => r.name)
    expect(contents).toContain('Andrew Tate')
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})