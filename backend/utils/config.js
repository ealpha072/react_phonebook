import dotenv from 'dotenv'
dotenv.config({ path:'./.env' })

const PORT = process.env.PORT
const url = process.env.MONGODB_URL


export default { PORT, url }