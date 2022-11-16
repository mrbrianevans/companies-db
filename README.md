# Companies Data

A data platform for data from Companies House.

## Data sources
 - bulk data products
 - streaming API (for keeping up-to-date)
 - FTP data products

## Aims
This project aims to achieve the following goals:
- automate downloading and inserting the bulk files into a queryable database
- keep the database up-to-date or in sync with Companies House by listening on the streaming API and using bulk update files
- serve the data through HTTP endpoints, following the same interface as the official Companies House API (where possible)


## Technologies

This system uses **MongoDB** as the primary database, with **Redis** used for caching and full text search capabilities.

The programming language used is **TypeScript** (compiled to ES modules) and PNPM as package manager.

**Docker** and Docker Compose are used extensively for packaging the code into independent runnable units.

## Design

There are independent services for each data group, determined by the source of the data. 
Eg: all the logic for dealing with the companies bulk file is in the `companyProfile` service.

Each service contains these modules (which are packaged as Docker containers):
 - bulk data loader
 - stream updater
 - web service
 - (optionally) search

More details about service design can be found in the [services readme](services/README.md).

## Testing
End-to-end testing is done in the `/testing` directory.  

This testing is using a predefined list of URLs, and calls the API for them, validating the result with a JSON schema.

There is also a benchmark in the testing directory, which calls this API a few hundred times and the official Companies House API for the same URLs and measures the response time.
This can be used to compare speed performance between this project and the official API.

## Web services (code gen)
Much of the code for the web services is generated from an openapi(swagger) specification found in `/spec/openapi.yaml`, which
was originally downloaded from Companies House, but has been modified since. The generator code is written in pure JavaScript
and can be found in `/gen`.

Ideally, the data should be stored in the desired API response format, so that responding to a HTTP request simply returns a document from the database.
Any transformation to the data structure should happen at the time of bulk loading the data rather than when responding to a request.
