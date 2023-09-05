# UShort - URL shortening service

This project has no other purpose than having fun coding.

## How to?

Classic nodejs project commands:

```sh
npm install
npm build
npm start
# or
npm install
npm dev
```

It will connect to a local PostGres DB (check details in ./src/services/db.ts) - TODO: make configurable

You can run one with `docker-compose up`

You must create a redirections table - see migrate_db.sql

## URLs

### POST /redirections {url, slug}

`curl -X POST -H "Content-Type: application/json" -d '{"slug": "curl", "url": "https://curl.se/"}' http://127.0.0.1:3000/redirections`

### /:slug

## Project steps

1. MVP
  - CRUD + redirect API only
  - nodejs + typescript
  - fastify
  - postgres DB
  - DX: simple testing, dev mode, docker image

2. Client
  - switch to monorepo
  - React static site generator
