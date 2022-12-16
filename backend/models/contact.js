import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    number:{
        type:Number,
        minLength:10,
        required:true
    },
    date: {
        type:Date,
        required:true
    },
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