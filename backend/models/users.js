import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    name:String,
    passwordHash: String,
    contacts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Contact'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //DELETE PASSWORDHASH
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
export default User