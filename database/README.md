# Using Knex for Database operations
Our app uses a library named `knex` to handle our connection to the cloudsql db. Whenever a change to the database needs to be done, you should generate a migration as below

## Creating Migrations
```
yarn db:migrate:create <informative name>
```
This does a couple things:
- Generate an empty migration file for you in the `database/migrations` directory of the app
- Registers a migration in the `knex_migrations` and `knex_migrations_lock` tables of the db
- The above tables keep your migrations pristine and atomic

```
  exports.up = function (knex, Promise) {}
  
  exports.down = function (knex, Promise){}
  ```

  Fill it in with the appropriate code - in the example below we are creating the table `widget`

  ```
exports.up = function (knex, Promise) {
    return Promise.all([
      knex.schema.createTable('widget', table => {
        table.increments('id').primary()
        table.string('color')
        table.string('label')
      })
    ])
  }
  
  exports.down = function (knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('widget')
    ])
  }
  ```

## Running Migrations
The migrations should be run automatically as a part of the cloudbuild process, but it will not hurt to run them manually in integration to verify they are valid.

### Manually
```
yarn db:migrate
```