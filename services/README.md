# Services

Each service has its own databases (MongoDB and Redis), and logic to load, update and retrieve data.

A service has a `docker-compose.yaml` in its root, which starts up the different components within the service. 
This is the intended way of deploying a service. Each component is its own Docker container.

There is a `docker-compose.yaml` file in the services root which provides some services that connect the individual data services, 
such as an authentication system, API gateway and shared logging.

## Bulk loader
Each service has a bulk loader component to initially populate the database. 
This often consists of downloading a large file, parsing and inserting it into MongoDB. 

This should run when a service is startup.

## Stream updater
This component of a service listens on real time data streams and updates the database when a change is made. 

This should run throughout the lifecycle of the service.

## Web service
This component uses [Fastify](https://www.fastify.io/) to serve the data in the databases on HTTP REST endpoints. Ideally, the data should be stored in 
the same format as the API response, so the webservice is simply responding to requests with an object from the database. 
However, this is not practical in all cases, for example for search.

## Shared directory
This directory is shared between the components of a service, and manages common logic like connecting to databases.
This is not a component of the service and cannot be built alone as a Docker container.

## Databases
MongoDB is used as the primary database for storing documents that are ready to be served on an API endpoint (this is static data such as a company profile). 
The collections in MongoDB are compressed using [zstd](https://facebook.github.io/zstd/) to reduce storage size. 

Redis is used for text search, such as find officer by name. For this the RediSearch module is used. 
It requires a few gigabytes of RAM to run each search service.

# List of services

| Name                 | URL QTY | Bulk file | Bulk loading | Updating | Serving |
|----------------------|---------|-----------|--------------|----------|:--------|
| PSC                  | 8       | Yes       | 8/8          | 5/8      | 4/8     |
| Officers             | 4       | Yes       | 4/4          | 0/4      | 3/4     |
| Companies            | 3       | Yes       | 2/3          | 2/3      | 1/3     |
| Charges              | 2       | No        |              |          |         |
| Filing history       | 2       | No        |              |          |         |
| Insolvency           | 1       | No        |              |          |         |
| Officer disqualified | 3       | No        |              |          |         |
| Registers            | 1       | No        |              |          |         |
| UK Establishments    | 1       | No        |              |          |         |
| Dissolved companies  | 1       | No        |              |          |         |

Services without publicly available bulk files have not been developed yet. 
Some of these could be developed using the private FTP data products, [listed here](https://chguide.co.uk/bulk-data/bulk-products.html).

The undeveloped services are only generated code, so not worth looking at. 

The services which are ready to be run are:
 - [`companyProfile`](companyProfile/README.md)
 - [`officers`](officers)
 - [`personsWithSignificantControl`](personsWithSignificantControl)

This is because there are bulk files easily available for these data sets.

More information about each service can be found in its dedicated README file.

# How to run
To start a service:
- make sure the central service is running (`docker compose up -d --build` in this directory)
- `cd` into the directory of the service you want to run (eg `cd companyProfile`)
- `docker compose up -d --build` to start the service (this will init a DB and start bulk loading)
