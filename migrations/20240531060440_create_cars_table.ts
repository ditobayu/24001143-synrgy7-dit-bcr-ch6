import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("name").notNullable();
    table.enu("category", ["SMALL", "MEDIUM", "LARGE"]).notNullable();
    table.integer("year").notNullable();
    table.string("color").notNullable();
    table.integer("price").notNullable();
    table.string("image").notNullable();
    table.uuid("created_by").references("id").inTable("users").notNullable();
    table.uuid("updated_by").references("id").inTable("users").notNullable();
    table.uuid("deleted_by").references("id").inTable("users").nullable();
    table.timestamp("deleted_at").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
