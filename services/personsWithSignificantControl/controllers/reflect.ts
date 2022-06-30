import pino from 'pino'
const logger = pino()
const apiUrl = 'https://api.company-information.service.gov.uk'
const headers = {
  Authorization:
    'Basic ' + Buffer.from(getEnv('RESTAPIKEY') + ':').toString('base64')
}

/** Get an environment variable, or throw if its not set */
export function getEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined)
    throw new Error(`${name} environment variable not set`)
  return value
}

export async function reflect(path) {
  logger.info({ path, apiUrl }, 'Outgoing request to Official API')
  const res = await fetch(apiUrl + path, { headers })
  logger.info(
    { path, status: res.status },
    'Requested official API - response status'
  )
  if (res.ok) return await res.json()
  else return null
}
export async function auth(headers) {
  try {
    const url = new URL(getEnv('AUTH_URL'))
    const ratelimit = await fetch(url.toString(), { headers }).then((r) =>
      r.ok ? r.json() : null
    )
    logger.info({ ratelimit }, 'Fetched ratelimit from auth service')
    return ratelimit
  } catch (e) {
    logger.error('Failed to get authorization headers')
    throw e
  }
}
