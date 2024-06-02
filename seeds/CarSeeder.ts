import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      name: "Car 1",
      category: "SMALL",
      year: 2021,
      color: "Red",
      price: 100000000,
      image: "car1.jpg",
      created_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      updated_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
    },
    {
      name: "Car 2",
      category: "MEDIUM",
      year: 2021,
      color: "Blue",
      price: 200000000,
      image: "car2.jpg",
      created_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      updated_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
    },
    {
      name: "Car 3",
      category: "LARGE",
      year: 2021,
      color: "Green",
      price: 300000000,
      image: "car3.jpg",
      created_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      updated_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
    },
    {
      name: "Car 4",
      category: "SMALL",
      year: 2021,
      color: "Yellow",
      price: 400000000,
      image: "car4.jpg",
      created_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      updated_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
    },
    {
      name: "Car 5",
      category: "MEDIUM",
      year: 2021,
      color: "Black",
      price: 500000000,
      image: "car5.jpg",
      created_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
      updated_by: "a11297b7-25c6-49de-a81f-23e71e0a1bbd",
    },
  ]);
}
