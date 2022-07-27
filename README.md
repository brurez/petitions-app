# Municipal Petition App

## Live application
**https://final-project-two-opal.vercel.app/**

## Stack
- Ruby on Rails: GraphQL, Pundit
- NextJS: MUI, Google Maps, Apollo
- Postgres

## How to execute locally
This application was configured to run locally using the host machine for the
Ruby on Rails and Next JS server but use Docker to run the Postgres database.
To be able to upload fields you need to setup the `GOOGLE_APPLICATION_CREDENTIALS` environment
variable as described on "Steps".

### Steps
1. Stop host Postgres if any to release port 5432
2. Execute `docker-compose up`
3. Install RoR dependencies: `bundle install`
4. Install JS dependencies: `cd client` and `yarn install`
5. Set up database: `bin/rails db:create`, `bin/rails db:migrate`
6. Create an `.env` file at the root of the project and add `GOOGLE_APPLICATION_CREDENTIALS` variable.
7. Run the RoR and Next JS servers: `yarn dev`

## How to run tests

### Back end
`bundle exec rspec`

### Front end
`yarn test`
