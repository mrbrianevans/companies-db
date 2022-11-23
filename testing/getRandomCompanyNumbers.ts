

export async function getRandomCompanyNumbers(count = 1){
  const res = await fetch('https://companies.stream/events/randomCompanyNumbers?count='+count)
  const numbers = await res.json()
  return numbers
}
