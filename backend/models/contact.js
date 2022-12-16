import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    number:Number,
    date: Date,
    important:Boolean
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Contact = mongoose.model('Contact', contactSchema)
export default Contact