import test from 'node:test';
import assert from 'node:assert';
import {getCompanyProfileRequests} from "./companyProfile.js";
import testData from "./testData.json" assert {type:'json'};
import {baseUrl} from "./url.js";
import {headers} from "./headers.js";

// test using nodejs built in test module
test('/company/{company_number}', async (t)=>{
  await t.test('company number path parameter set',async () => {
    const requests = getCompanyProfileRequests(testData)
    for (const request of requests) {
      const url = baseUrl + request.path
      const res = await fetch(url, {headers})
      assert(res.ok, 'Failed with status code ' + res.status + ' ' + res.statusText + ' on url ' + res.url)
    }
  })
})
