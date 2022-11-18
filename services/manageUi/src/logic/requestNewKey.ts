

export async function requestNewKey(): Promise<{key:string}>{
  const res = await fetch('/new')
  if(res.ok){
    return await res.json()
  }else{
    throw new Error('Could not create new key')
  }
}
