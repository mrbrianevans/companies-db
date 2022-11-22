# Persons with significant control service
This service has 8 endpoints:
- [x] get corporate entities
- [x] get individual
- [x] get legal persons
- [x] get super secure person
- [ ] get statement
- [ ] get exemptions
- [ ] list persons with significant control
- [ ] list statements

# Database
The database has these collections:
 - getCorporateEntities
 - getExemptions
 - getIndividual
 - getLegalPersons
 - getStatement
 - getSuperSecurePerson

Futhermore, some summary information about the bulk files is stored in a collection named `summary`. 
This is for developers only, and is not served on any public endpoint.

The total database size is between 2GB and 3GB, and holds about 10 million records.

# Beneficial owners
After the development of this service, there was added the beneficial owner endpoints to the official companies house API.
These have not yet been developed in this service.
- [ ] get corporate entity beneficial owner
- [ ] get individual beneficial owner
- [ ] get legal person beneficial owner
- [ ] get super secure beneficial owner


# Benchmark
Run on 22 November 2022, with the `companiesdb.co.uk` server being a Digital Ocean droplet with 1vCPU and 2GB of RAM:
```
For URL: https://companiesdb.co.uk

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬───────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max   │
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼───────┤
│ Latency │ 22 ms │ 25 ms │ 36 ms │ 42 ms │ 26.53 ms │ 5.78 ms │ 91 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 15      │ 15      │ 37      │ 39      │ 33.34   │ 8.44    │ 15      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 15.3 kB │ 15.3 kB │ 36.3 kB │ 43.7 kB │ 34.7 kB │ 9.24 kB │ 15.3 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 6

200 requests in 6.11s, 208 kB read


For URL: https://api.company-information.service.gov.uk

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼────────┤
│ Latency │ 27 ms │ 32 ms │ 41 ms │ 46 ms │ 32.75 ms │ 6.84 ms │ 113 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 20      │ 20      │ 30      │ 31      │ 28.58   │ 3.74    │ 20      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 30.2 kB │ 30.2 kB │ 44.1 kB │ 50.2 kB │ 43.9 kB │ 6.05 kB │ 30.2 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 7

200 requests in 7.04s, 307 kB read
```

This benchmark was run only on the 4 endpoints that have been developed. The summary is:
 - `https://companiesdb.co.uk` averaged 26.53 ms
 - `https://api.company-information.service.gov.uk` averaged 32.75 ms
