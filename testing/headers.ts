
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
export const headers =  {Authorization: 'Basic '+Buffer.from(process.env.RESTAPIKEY+':').toString('base64')}
