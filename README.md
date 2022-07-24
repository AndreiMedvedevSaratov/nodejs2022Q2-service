# Home Library Service

## Docker Compose

- Docker Hub - [nodejs2022q2-service_api](https://hub.docker.com/r/andreimedvedevsaratov/nodejs2022q2-service_api)
(Unfortunately I wasn't able to push it to Docker Hub account)

```
docker compose -f "docker-compose.yml" up --build
```

## Dockerfile `build` and `run`

Build `Dockerfile` for `API`

```
docker build --pull --rm -f "Dockerfile" -t nodejs2022q2service_api:latest "." 
docker run --env-file .env --rm -it -p 4000:4000/tcp nodejs2022q2service_api:latest
```

Build `Dockerfile` for `Database`

```
docker build --pull --rm -f "database/dockerfile" -t nodejs2022q2service_database:latest "." 
docker run --env-file .env --rm -it -p 5432:5432/tcp nodejs2022q2service_database:latest
```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
cd nodejs2022Q2-service
git checkout dev
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging