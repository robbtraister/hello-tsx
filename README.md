# TSX App

This is a boilerplate for an SSR React application.

## Running

You can run the application either natively, or in docker. Running natively will generally be faster, but requires that you have node/npm installed and that you manually install the external node_modules yourself. Running in docker may incur some performance overhead, but is essentially guaranteed to work as long as you have docker/docker-compose installed.

### Native

Install the node_modules:

```sh
npm install
```

Run in developer mode (will run a server and watch for file changes):

```sh
npm run dev
```

Run in production mod (will build once minified, then run a server):
```sh
npm run prod
```

### Docker

```sh
docker-compose up --build; docker-compose down
```

## Authentication

### Google OAuth

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables and the app will automatically enable google oauth. You can login by visiting

## Environment Variables

The following environment variables are supported (with their defaults)

1.  APP_ID = `app`
1.  COOKIE = `jwt-token`
1.  FILE_LIMIT = `16384` (16KB)
1.  GOOGLE_CLIENT_ID [no default]
1.  GOOGLE_CLIENT_SECRET [no default]
1.  HOST = `http://localhost:${PORT}`
1.  PORT = `8080`
1.  SECRET [no default; must be provided]
1.  WORKER_COUNT [# of CPUs]
