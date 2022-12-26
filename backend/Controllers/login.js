import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/users.js'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res, next) => {

    const { username, password } = req.body

    try {
        const user =  await User.findOne({ username })

        console.log(user)
        const checkPass = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if(!(user && checkPass)){
            res.status(404).json({
                error:'invalid username or passoword'
            })
        }

        const userForToken = {
            username: user.username,
            id:user._id
        }

        const token = jwt.sign(
            userForToken,
            process.env.SECRET,
            { expiresIn: 60*60 }
        )

        res.status(200).send({ token, username:user.username, name:user.name })
    } catch (error) {
        next(error)
    }
})

export default loginRouter