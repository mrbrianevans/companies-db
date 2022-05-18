import assert from 'assert';
import testData from '../testData.json' assert { type: 'json' }
import {getCompanyProfileRequests} from "../companyProfile";
import {baseUrl} from "../url";
import {headers} from "../headers";

// test using mocha
describe('/company/{company_number}', function () {
  it('company number path parameter set', async function () {
    const requests = getCompanyProfileRequests(testData)
    for (const request of requests) {
      const url = baseUrl+request.path
      const res = await fetch(url, {headers})
      assert(res.ok, 'Failed with status code ' + res.status + ' ' + res.statusText + ' on url ' + res.url)
    }
  });
});
