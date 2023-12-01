import {Knex} from 'knex'
exports.up = function (knex: Knex):Promise<void>  {
    return knex.schema.createTable('user', (table:any) => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.timestamps(true, true)
    })
};


exports.down = function (knex:Knex){
    return knex.schema.dropTable('user')
};
