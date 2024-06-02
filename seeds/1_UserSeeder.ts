import { Knex } from "knex";
import encryptPassword from "../helper/encryptPassword";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      name: "super1",
      email: "super1@gmail.com",
      password: encryptPassword("super1"),
      role: "SUPERADMIN",
    },
    {
      name: "super2",
      email: "super2@gmail.com",
      password: encryptPassword("super2"),
      role: "SUPERADMIN",
    },
    {
      name: "super3",
      email: "super3@gmail.com",
      password: encryptPassword("super3"),
      role: "SUPERADMIN",
    },
    {
      name: "super4",
      email: "super4@gmail.com",
      password: encryptPassword("super4"),
      role: "SUPERADMIN",
    },
    {
      name: "super5",
      email: "super5@gmail.com",
      password: encryptPassword("super5"),
      role: "SUPERADMIN",
    },
    {
      name: "admin1",
      email: "admin1@gmail.com",
      password: encryptPassword("admin1"),
      role: "ADMIN",
    },
    {
      name: "admin2",
      email: "admin2@gmail.com",
      password: encryptPassword("admin2"),
      role: "ADMIN",
    },
    {
      name: "member1",
      email: "member1@gmail.com",
      password: encryptPassword("member1"),
      role: "MEMBER",
    },
    {
      name: "member2",
      email: "member2@gmail.com",
      password: encryptPassword("member2"),
      role: "MEMBER",
    },
  ]);
}
