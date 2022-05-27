import test from 'node:test'
import assert from 'node:assert'
import {CompanyNumberRegex} from "../CompanyNumberRegex.js";
import sampleCompanyNumbers from './sampleCompanyNumbers.json' assert {type: 'json'}

test('company number regex should match real company numbers', async function (t) {
  await t.test('sample company numbers', function(){
    for (const companyNumber of sampleCompanyNumbers) {
      assert.match(companyNumber, CompanyNumberRegex)
    }
  })

  await t.test('8 digit numeric company numbers', function(){
    assert.match('04777441', CompanyNumberRegex)
  })

  await t.test('scottish company numbers', function(){
    assert.match('SC647790', CompanyNumberRegex)
  })
});

test('company number regex should NOT match non-company number strings', async function(t){
  await t.test('contains lowercase letters', function(){
    assert.doesNotMatch('sc652935', CompanyNumberRegex)
  })
  await t.test('unrecognised prefix', function(){
    assert.doesNotMatch('MI652935', CompanyNumberRegex)
  })
  await t.test('letter suffix', function(){
    assert.doesNotMatch('006529GH', CompanyNumberRegex)
  })
})
