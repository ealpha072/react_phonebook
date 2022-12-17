import dotenv from 'dotenv'
dotenv.config({ path:'./.env' })

const PORT = process.env.PORT
const url = process.env.NODE_ENV === 'test' ? process.env.TESTMONGODB_URL : process.env.MONGODB_URL


export default { PORT, url }