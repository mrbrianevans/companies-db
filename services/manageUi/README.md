# Manage UI

This service is a public facing web UI that allows users to create API keys and interact with the auth service.

It could also allow users to test various endpoints of the API, run benchmarks or see usage statistics.

## Technology
Created with [React](https://reactjs.org/), written in [TypeScript](https://www.typescriptlang.org/), built with [Vite](https://vitejs.dev/).

## Requirements
The initial (naive) auth model user story is this:
 - user visits website and clicks "create key"
 - the new key is shown to them one time only
 - the key becomes their password to access the manage UI in future
 - keys are expired after 60 days if not used
 - users get allocated a default rate limit of 600
 - users can request an increase to their rate limit, which automatically goes up to 1,200 after 24 hours.
