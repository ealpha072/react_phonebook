import express, { json } from 'express'

const app = express()
const contacts = [
    {
        "id": 4,
        "name": "Charity Chege",
        "number": "07984567309",
        "date": "2019-05-30T17:30:31.098Z",
        "important": false
      },
      {
        "id": 5,
        "name": "Felix Odiuor",
        "number": "0796754532",
        "date": "2022-12-13T18:12:57.682Z",
        "important": true
      },
      {
        "id": 1,
        "name": "Lucille Adere",
        "number": "076545339",
        "date": "2022-12-13T18:18:33.647Z",
        "important": false
      },
      {
        "id": 7,
        "name": "Alpha Ochieng",
        "number": "556757",
        "date": "2022-12-13T19:01:14.817Z",
        "important": false
      },
      {
        "id": 8,
        "name": "Teddy Ogoti",
        "number": "0765456677",
        "date": "2022-12-14T18:51:32.803Z",
        "important": true
      }
]

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('-----');
    next()
}

//middleware
app.use(express.json())
app.use(requestLogger)


//routes
app.post('/contacts', (req, res)=>{
    const contact = req.body
    res.json(contact)
})

app.get('/contacts', (req, res) => {
    res.json(contacts)
})


app.get('/contacts/:id', (req, res)=>{
    const id = Number(req.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if(contact){
        res.json(contact)
    } else{
        res.status(404).end()
    }
})

app.delete('/contacts/:id', (req, res) =>{
    const id = Number(req.params.id)
    const contact = contacts.filter(n => n.id !== id)

    res.status(204).end()
})

const unKnownEndPoints = (request, response) => {
    response.status(404).send({error:'Unknown endpoint'})
}
app.use(unKnownEndPoints)

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

