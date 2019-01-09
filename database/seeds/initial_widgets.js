exports.seed = function (knex, Promise) {
    return knex('widget').del().then(() => {
      return knex('widget').insert([
          {label: 'Widget 1', color: 'red'},
          {label: 'Widget 2', color: 'yellow'},
          {label: 'Widget 3', color: 'blue'},
          {label: 'Widget 4', color: 'green'},
      ])
    })
  }