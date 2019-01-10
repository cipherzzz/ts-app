
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
