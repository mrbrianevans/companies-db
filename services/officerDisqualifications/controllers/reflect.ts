import pino from 'pino'
const logger = pino()
const apiUrl = 'https://api.company-information.service.gov.uk'
const headers = {
  Authorization:
    'Basic ' + Buffer.from(process.env.RESTAPIKEY + ':').toString('base64'),
}

export async function reflect(path) {
  const res = await fetch(apiUrl + path, { headers })
  logger.info({ path, status: res.status }, 'Requesting official API')
  return await res.json()
}
export async function auth(headers) {
  const ratelimit = await fetch('http://auth-service:3000', { headers }).then(
    (r) => r.json()
  )
  logger.info({ ratelimit }, 'Fetched ratelimit from auth service')
  return ratelimit
}
