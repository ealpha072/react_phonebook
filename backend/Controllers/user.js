import User from '../models/users.js'
import express from 'express'
import bcrypt from 'bcrypt'

const userRouter = express.Router()

//user routes
userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('contacts', { name:1, number:1 })
    res.json(users)
})

userRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    try {
        const existingUser = await User.findOne({ username })

        if(existingUser){
            return res.status(400).json({
                error:'User already exists'
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser = new User({
            username, name, passwordHash
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

export default userRouter