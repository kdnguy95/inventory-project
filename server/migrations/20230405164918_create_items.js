/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // ID, foreign key userID, item name, description, quantity
  return knex.schema.createTable('items', table => {
    table.increments('id');
    table.integer('userID');
    table.foreign('userID').references('users.id');
    table.string('itemName').notNullable();
    table.string('description', 1000);
    table.integer('quantity').notNullable();
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('items', table => {
    table.dropForeign('userID');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('items');
  })
};
