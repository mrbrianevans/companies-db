# Services

Each service has its own databases (mongo and redis), and logic to load, update and retrieve data.

A service has a `docker-compose.yaml` in its root, which starts up the different components within the service. 
This is the intended way of deploying a service. Each component is its own Docker container.

For the purposes of development and testing, there is a `docker-compose.yaml` file in the services root which starts up all the 
webservices and uses a shared database for them all. This is not designed to be deployed, only for testing.


## Bulk loader
Each service has a bulk loader component to initially populate the database. 
This often consists of downloading a large file and inserting it row-by-row into MongoDB. 

This should run when a service is startup.

## Stream updater
This component of a service listens on real time data streams (provided by https://companies.stream) and updates the 
database when a change is made. 

This should run throughout the lifecycle of the service.

## Web service
This component uses Fastify to serve the data in the databases on HTTP REST endpoints. Ideally, the data should be stored in 
the same format as the API response, so the webservice is simply responding to requests with an object from the database. 
However, this is not practical in all cases, for example for search.

## Shared directory
This directory is shared between the components of a service, and manages common logic like connecting to databases.
This is not a component of the service and cannot be built alone as a Docker container.


# List of services

| Name                 | URL QTY | Bulk file | Bulk loading | Updating | Serving |
|----------------------|---------|-----------|--------------|----------|:--------|
| PSC                  | 8       | Yes       | 8/8          | 4/8      | 4/8     |
| Officers             | 4       | Yes       | 4/4          | 0/4      | 3/4     |
| Companies            | 3       | Yes       | 2/3          | 0/3      | 1/3     |
| Charges              | 2       | No        |              |          |         |
| Filing history       | 2       | No        |              |          |         |
| Insolvency           | 1       | No        |              |          |         |
| Officer disqualified | 3       | No        |              |          |         |
| Registers            | 1       | No        |              |          |         |
| UK Establishments    | 1       | No        |              |          |         |
| Dissolved companies  | 1       | No        |              |          |         |
