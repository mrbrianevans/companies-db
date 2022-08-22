
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
export function getHeaders(key: string){
  return {Authorization: 'Basic '+Buffer.from(key+':').toString('base64')}
}
export const headers = getHeaders(process.env.RESTAPIKEY)

