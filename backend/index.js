/* eslint-disable semi */
import config from './utils/config.js'
import express from 'express'
const app = express()
app.use(express.static('dist'))
import mongoose from 'mongoose'
import cors from 'cors'
import logger from './utils/logger.js'
import contactRouter from './Controllers/contact.js'
import middleware from './utils/middleware.js'

logger.info('Connecting to ', config.url)

mongoose.connect(config.url)
    .then(() => {
        logger.info('Connected to MONGODB')
        app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`))
    })
    .catch(err => logger.info(err.message))


//middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/contacts', contactRouter)

app.use(middleware.unKnownEndPoints)
app.use(middleware.errorHandler)

export default app


