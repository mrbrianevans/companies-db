import pino from 'pino'
const logger = pino()
const apiUrl = 'https://api.company-information.service.gov.uk'
const headers = {
  Authorization:
    'Basic ' + Buffer.from(process.env.RESTAPIKEY + ':').toString('base64')
}

if (!process.env.AUTH_URL) logger.error('AUTH_URL environment variable not set')
if (!process.env.RESTAPIKEY)
  logger.error('RESTAPIKEY environment variable not set')

export async function reflect(path) {
  logger.info(
    { path, apiUrl, keySet: Boolean(process.env.RESTAPIKEY) },
    'Outgoing request to Official API'
  )
  const res = await fetch(apiUrl + path, { headers })
  logger.info(
    { path, status: res.status },
    'Requested official API - response status'
  )
  return await res.json()
}
export async function auth(headers) {
  const ratelimit = await fetch(process.env.AUTH_URL, { headers }).then((r) =>
    r.json()
  )
  logger.info({ ratelimit }, 'Fetched ratelimit from auth service')
  return ratelimit
}
