import logger from './logger.js'

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('-----')
    next()
}

const unKnownEndPoints = (request, response) => {
    response.status(404).send({ error:'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
    if(error.name === 'CastError'){
        return res.status(404).json({ error:'Malformatted id' })
    } else if(error.name === 'ValidationError'){
        return res.status(404).json({ error:error.message })
    } else if(error.name === 'JsonWebTokenError'){
        return res.status(401).json({ error: 'Invalid token' })
    }else if(error.name === 'TokenExpiredError'){
        return res.status(401).json({ error: 'Expired token' })
    }
    next(error)
}


export default { requestLogger, unKnownEndPoints, errorHandler }