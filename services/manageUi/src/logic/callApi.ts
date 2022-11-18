
export function getAuthorizationHeader(key: string){
  return `Basic ${btoa(key + ':')}`
}

export interface ApiResponse{
  body: any, status: number,
  statusText: string,
  headers: Headers,
  isJson: boolean,
  duration: number
}

class CorsError extends Error{
  constructor(url: string) {
    super(`Blocked by CORS. Server not returning necessary headers to request from this domain.`);
    this.name = 'CorsError'
  }
}

export async function callApi(path: string, baseUrl: string, key: string): Promise<ApiResponse>{
  const headers = {Authorization: getAuthorizationHeader(key)}
  const url = new URL(path, baseUrl)
  const startTime = performance.now()
  try {
    const res = await fetch(url, {method: 'GET', headers})
    const {headers: responseHeaders, status, statusText} = res
    const isJson = responseHeaders.get('content-type')?.toLowerCase().includes('application/json')??false
    // const body = isJson ? await res.json() : await res.text()
    const body = await res.text()
    const duration = performance.now() - startTime
    return {headers: responseHeaders, status, statusText, body, isJson, duration}
  }catch (e) {
    const blockedByCors = await isBlockedByCors(url, headers)
    if(blockedByCors){
      throw new CorsError(url.toString())
    }else throw e
  }
}

// returns true if the URL is blocked by CORS
async function isBlockedByCors(url: URL, headers: Record<string, string>){
  try {
    await fetch(url, {headers, mode: 'no-cors'})
    try{
      await fetch(url, {headers, mode: 'cors'})
      // site was reachable with CORS
      return false
    }catch (e) {
      // site was reachable with CORS disabled, but not when CORS is enabled
      return true
    }
  }catch (e) {
    // site is not reachable at all, even when cors is disabled
    return false
  }
}
