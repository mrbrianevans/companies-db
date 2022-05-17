# Generate server stubs

First download the Swagger/OpenAPI spec and convert to YAML:
```bash
cd ../spec && npm run start
```

Then run this script (with [zx](https://github.com/google/zx)):
```bash
zx genFastifyServices.mjs
```

It creates stubs of the different services using Fastify as the framework.
