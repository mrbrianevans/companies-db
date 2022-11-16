# Company Profile service
This service has 3 endpoints: 
 - [x] get company profile
 - [x] get registered office address
 - [ ] search company by name

# Database
The database collection for company profiles is also used for registered office address, and uses ~ 1.2GB of storage when loaded in MongoDB.


# Benchmark
Benchmarking the service locally and comparing it against the official Companies House API gave similar results, 
both average about **30ms** for a response.

You can run the benchmark in the `/testing` directory.

This was the output on my machine for 200 requests (20 unique company numbers x 10 requests each): 
```

For URL: localhost:3000

┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬───────┐   
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Max   │   
├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼───────┤   
│ Latency │ 17 ms │ 26 ms │ 41 ms │ 42 ms │ 26.66 ms │ 5.58 ms │ 44 ms │   
└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴───────┘   
┌───────────┬────────┬────────┬────────┬────────┬────────┬───────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼───────┼────────┤
│ Req/Sec   │ 200    │ 200    │ 200    │ 200    │ 200    │ 0     │ 200    │
├───────────┼────────┼────────┼────────┼────────┼────────┼───────┼────────┤
│ Bytes/Sec │ 247 kB │ 247 kB │ 247 kB │ 247 kB │ 247 kB │ 0 B   │ 247 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴───────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 1

200 requests in 1.03s, 247 kB read


For URL: https://api.company-information.service.gov.uk

┌─────────┬───────┬───────┬───────┬────────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%    │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼────────┼──────────┼──────────┼────────┤
│ Latency │ 24 ms │ 31 ms │ 97 ms │ 102 ms │ 35.78 ms │ 17.43 ms │ 135 ms │
└─────────┴───────┴───────┴───────┴────────┴──────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬───────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼───────┼────────┤
│ Req/Sec   │ 200    │ 200    │ 200    │ 200    │ 200    │ 0     │ 200    │
├───────────┼────────┼────────┼────────┼────────┼────────┼───────┼────────┤
│ Bytes/Sec │ 448 kB │ 448 kB │ 448 kB │ 448 kB │ 448 kB │ 0 B   │ 448 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴───────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 1

200 requests in 1.05s, 448 kB read

```

Note that this API is at an advantage because its running on localhost so there is less distance for the data to travel over network, and also the official API is returning more data (448 kB vs 247 kB).

With those caveats in mind, this service running on `localhost` averaged `26.66 ms` and the official Companies House API averaged `35.78 ms` per response.
