# fastify-sequelize

Boilerplate with includes sequelize auto models 

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public

- For Migrations and Seeders we use Prisma @prisma/migrate for SQL friendly migration

\*\*To Create a new migration

```bash
npm run migrate:create
```

\*\*To Run All Migrations

```bash
npm run  migrate
```

\*\*To Run All Seeders:

```bash
npm run seed
```

\*\*To pull a prisma code from db

```bash
npx prisma db pull
```

\*\*To generate prisma schema

```bash
npx prisma generate
```

\*\*To generate sequelize model

```bash
npm run model
```

\*\*To run new Migration file

```bash
npx prisma migrate dev --name file_name
```

\*\*Production and testing environments

```bash
npx prisma migrate deploy
```
