export const seed = async (knex, Promise) => {
    // delete ALL existing entries
    await knex('users').del()
    // then insert users with known credentials
    await knex('users').insert([
        {
            id: 1,
            email: 'test@demo.com',
            username: 'test',
            firstName: 'test',
            lastName: 'user',
            phoneNumber: '+13106999149',
            password: '$2b$12$ZP5ew000i6JTaQDKaPCi6uiiEuS5zzzd4esWlP3.iXWvG76BDxF2a',
            birthday: '1992-12-21',
            active: true,
        },
    ])
}
