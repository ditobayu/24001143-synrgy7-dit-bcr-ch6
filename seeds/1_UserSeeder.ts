import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      name: "super1",
      email: "super1@gmail.com",
      password: "super1",
      role: "SUPERADMIN",
    },
    {
      name: "super2",
      email: "super2@gmail.com",
      password: "super2",
      role: "SUPERADMIN",
    },
    {
      name: "super3",
      email: "super3@gmail.com",
      password: "super3",
      role: "SUPERADMIN",
    },
    {
      name: "super4",
      email: "super4@gmail.com",
      password: "super4",
      role: "SUPERADMIN",
    },
    {
      name: "super5",
      email: "super5@gmail.com",
      password: "super5",
      role: "SUPERADMIN",
    },
    {
      name: "admin1",
      email: "admin1@gmail.com",
      password: "admin1",
      role: "ADMIN",
    },
    {
      name: "admin2",
      email: "admin2@gmail.com",
      password: "admin2",
      role: "ADMIN",
    },
    {
      name: "member1",
      email: "member1@gmail.com",
      password: "member1",
      role: "MEMBER",
    },
    {
      name: "member2",
      email: "member2@gmail.com",
      password: "member2",
      role: "MEMBER",
    },
  ]);
}
