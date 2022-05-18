


export function getCompanyProfileRequests(testData){
  const {companyNumbers} = testData
  const requests = companyNumbers.map(cn=>({path: `/company/${cn}`}))
  return requests
}
