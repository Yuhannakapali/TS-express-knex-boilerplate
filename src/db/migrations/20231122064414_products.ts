import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("products", (table)=> {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('user');
        table.string('product_category').notNullable();
        table.string('product_name').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products')
}

