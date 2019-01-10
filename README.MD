# TypeScript Webservice Template

This project is meant to be a template for new microservices with the best practices already wired up.


## Technologies Used
- [TypeScript](http://www.typescriptlang.org/)
- Backend
    - [Node.js](https://nodejs.org)
    - [Express](https://expressjs.com/)
    - [tsoa](https://github.com/lukeautry/tsoa)
        - Generates Express Routes from TypeScript controllers
        - Generates [OpenAPI ("Swagger")](https://swagger.io/docs/specification/about) specification, enabling automatic documentation and client library generation
    - [PostgreSQL](https://www.postgresql.org/) as RDBMS
        - [Knex](http://knexjs.org) for queries, migrations, etc.
    - [Redis](https://redis.io/) for caching/messaging
- Developer environment
    - Single `start-dev` script that compiles and reloads the API when a change occurs
    - VSCode [launch.json](./.vscode/launch.json) settings have been included to allow debugging
- Testing
    - Mocha/Chai tests for API

---    

## Getting Started

### System Requirements
- [VSCode IDE](https://code.visualstudio.com/)
- [Node.js 8+](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/en)

### Setup
- `yarn` to install dependencies
- Configure and start the cloudsql proxy as described in this [README.md](cloudsql/README.md)
- `yarn db:init` to create table and seed default data

### Start API in Development mode
- `yarn start-dev` to start development environment with a hot-reload for all typescript changes

---

## Developer Tools

### Start API in Debug mode
 - Refer to this [README.md](.vscode/README.md) for the steps needed to debug the api

### Swagger Doc Generation
- This project uses [tsoa](https://github.com/lukeautry/tsoa) to generate a `swagger.json` based on the `controller` code.
    - Generate it manually - `yarn tsoa:gen`

### Code Style and Format
- This project uses [tslint](https://github.com/palantir/tslint) to check code style as a part of the precommit hook
    - You may edit the tslint rules in [tslint.json](tslint.json) if you cannot get them to pass as a last resort
- This project uses [prettier](https://prettier.io/) to format the code as a part of the precommit hook
    - You may edit the rules in [.prettierrc.yml](.prettierrc.yml) upon agreement with the team
    - You may also ignore certain files from the format using the [.prettierignore](.prettierignore)   

### Unit Tests
- This project has an example test in `api/controllers` for reference
    - To run the project tests - `yarn test`

### Commit Hook
- This project uses [husky]() for a precommit hook that checks that the code has valid
    - Syntax - via typescript compilation
    - Style - via the tslint script
    - Format - via the prettier module
- If any of these checks fail the code will not be committed and you will need to fix the issues


---

## Additional Docs

### Database
 - Refer to this [README.md](database/README.md) for Posgresql operations and maintenance.
 - In order to run any database operations locally, you will need to setup the cloudsql proxy first as described in this [README.md](cloudsql/README.md)

### Local Deployment
 - Refer to this [README.md](deploy/README.md) for information on deploying to Google Cloud locally.

---