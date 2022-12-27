import Contact from '../models/contact.js'
import User from '../models/users.js'
import  express from 'express'
import jwt from 'jsonwebtoken'

const contactRouter = express.Router()

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

//routes
contactRouter.get('/', async (req, res) => {
    const contacts = await Contact.find({}).populate('user', { username:1, name:1 })
    res.json(contacts)
})

contactRouter.get('/:id', async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if(contact){
            res.json(contact)
        }else{
            res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

contactRouter.post('/', async (req, res, next) => {
    const contact = req.body
    console.log(contact)
    const token = getTokenFrom(req)
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!decodedToken.id) {
        return res.status(401).json({ error:'Invalid token' })
    }

    const user = await User.findById(contact.userId)
    console.log(user)

    if(contact.name === undefined || contact.number === undefined){
        res.status(404).json({ error:'Contact missing name or number' })
    }

    const newContact = new Contact({
        name: contact.name,
        number:contact.number,
        date: new Date(),
        important: contact.important || true,
        user:user._id
    })

    try {
        const savedContact = await newContact.save()
        user.contacts = user.contacts.concat(savedContact._id)
        await user.save()
        res.status(201).json(savedContact)
    } catch (error) {
        next(error)
    }
})

contactRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const contact = {
        name:body.name,
        number:body.number,
        important:body.important,
    }

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, contact, { new:true, runValidators:true, context: 'query' }
        )
        res.json(updatedContact)
    } catch (error) {
        next(error)
    }
})

contactRouter.delete('/:id', async (req, res, next) => {
    try {
        await Contact.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

export default contactRouter