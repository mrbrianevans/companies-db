# Company Profile service
This service has 3 endpoints: 
 - [x] get company profile
 - [x] get registered office address
 - [ ] search company by name

# Database
The database collection for company profiles is also used for registered office address, and uses ~ 1.2GB of storage when loaded in MongoDB.


# Benchmark
Benchmarking the service running on a Digital Ocean droplet and comparing it against the official Companies House API gave similar results, 
both average about **30ms** for a response.

You can run the benchmark in the `/testing` directory.

This was the output for 200 requests (20 unique company numbers x 10 requests each): 
```
For URL: https://companiesdb.co.uk

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬───────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max   │
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼───────┤
│ Latency │ 22 ms │ 24 ms │ 32 ms │ 36 ms │ 25.45 ms │ 4.56 ms │ 76 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬───────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5% │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 7       │ 7       │ 38      │ 40    │ 33.34   │ 11.82   │ 7       │
├───────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 9.29 kB │ 9.29 kB │ 50.1 kB │ 53 kB │ 44.2 kB │ 15.6 kB │ 9.28 kB │
└───────────┴─────────┴─────────┴─────────┴───────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 6                                                                  
                                                                                 
200 requests in 6.09s, 265 kB read                                               


For URL: https://api.company-information.service.gov.uk

┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 27 ms │ 33 ms │ 54 ms │ 75 ms │ 35.17 ms │ 11.86 ms │ 164 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg   │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┤
│ Req/Sec   │ 3       │ 3       │ 28      │ 31      │ 25    │ 8.58    │ 3       │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┤
│ Bytes/Sec │ 6.46 kB │ 6.46 kB │ 63.4 kB │ 69.6 kB │ 56 kB │ 19.3 kB │ 6.46 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 8

200 requests in 8.07s, 448 kB read

```

Note that the official API is returning more data (448 kB vs 247 kB).

With that caveat in mind, this service running on `companiesdb.co.uk` averaged `25.45 ms` and the official Companies House API averaged `35.17 ms` per response.

The test was repeated on different days and gave very similar results (within a millisecond).
