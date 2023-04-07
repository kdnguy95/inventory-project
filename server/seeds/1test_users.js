/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // id, firstName, lastName, username, password
  await knex('users').del()
  await knex('users').insert([
    {firstName: 'John', lastName: 'Smith', username: 'johnsmith', password: 'password'},
    {firstName: 'Jane', lastName: 'Doe', username: 'janedoe', password: 'password1'},
  ]);
};
