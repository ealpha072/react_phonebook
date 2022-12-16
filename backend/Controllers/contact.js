import Contact from '../models/contact.js'
import  express from 'express'

const contactRouter = express.Router()

//routes
contactRouter.post('/', (req, res, next) => {
    const contact = req.body

    if(contact.name === undefined || contact.number === undefined){
        res.status(404).json({ error:'Contact missing name or number' })
    }

    const newContact = new Contact({
        name: contact.name,
        number:contact.number,
        date: new Date(),
        important: contact.important || true
    })

    newContact.save().then(savedContact => {
        res.json(savedContact)
    }).catch(error => next(error))
})

contactRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const contact = {
        name:body.name,
        number:body.number,
        important:body.important,
    }

    Contact.findByIdAndUpdate(
        req.params.id, contact, { new:true, runValidators:true, context: 'query' })
        .then(results => {
            res.json(results)
        })
        .catch(error => next(error))
})

contactRouter.get('/', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
})


contactRouter.get('/:id', (req, res, next) => {
    Contact.findById(req.params.id).then(contact => {
        if(contact){
            res.json(contact)
        }else{
            res.status(404).end()
        }

    }).catch(error => next(error))
})

contactRouter.delete('/contacts/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id).then( result => {
        console.log(result)
        res.status(204).end()
    }).catch(error => next(error))
})

export default contactRouter