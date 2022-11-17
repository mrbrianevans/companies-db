

export async function callApi(path: string, baseUrl: string, key: string){
  const headers = {Authorization: `Basic ${btoa(key + ':')}`}
  const res = await fetch(new URL(path, baseUrl), {method: 'GET', headers})
  if(res.ok) return await res.json()
  else{
    throw new Error('Could not call API. Status ' + res.status + ' ' + res.statusText)
  }
}
