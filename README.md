# Companies V2

Version 2 of a Companies House database system. 

## Data categories
 - people (pscs and officers)
 - companies
 - accounts (annual financial accounts filed)

## Levels
1. Keep an up-to-date database for each of the data categories
2. Offer an API serving the data, and bulk downloads from the databases
3. Web app interface for non-technical users to access the data
4. Web app interface for users to filter the data


## Design

This system uses MongoDB as the primary database, with Redis used for caching and full text search capabilities.

The programming language used is TypeScript, with ES modules and PNPM as package manager.

There are independent services for each data group, determined by the source of the data. 
Eg: all the logic for dealing with the companies bulk file is in the `companyProfile` service.

Each service contains these modules (which are packaged as Docker containers):
 - bulk data loader
 - stream updater
 - web service
 - (optionally) search

More details about service design can be found in the [services readme](services/README.md).

Testing is done in the `/testing` directory.

Most of the code for services is generated from an openapi(swagger) specification found in `/spec/openapi.yaml`, which
was originally downloaded from Companies House, but has been modified since. The generator code is written in pure JavaScript
and can be found in `/gen`.

