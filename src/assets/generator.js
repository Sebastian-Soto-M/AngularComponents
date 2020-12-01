"use strict";
const faker = require("faker");

const dbSize = 30;

const estatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  BLOCKED: "Blocked",
  PENDING: "Pending",
};

function randStatus() {
  let rand = Math.floor(Math.random() * Object.keys(estatus).length);
  return estatus[Object.keys(estatus)[rand]];
}

const tagTypes = [
  {
    id: 1,
    name: "salty",
    description: "description description description",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "sweet",
    description: "description description description",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "pet food",
    description: "description description description",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "origin",
    description: "description description description",
    status: "ACTIVE",
  },
];

function randListItem(list) {
  let rand = Math.floor(Math.random() * list.length);
  return list[rand];
}

let db = {
  ingredients: [],
  "recipe-tags": [],
  "ingredient-tags": [],
  carts: [
    {
      id: 1,
      created: new Date(),
      status: estatus.ACTIVE,
      userId: 1,
      userLogin: "snsm",
    },
  ],
  "cart-has-ingredients": [
    {
      amount: 100,
      cartId: 1,
      id: 2,
      ingredientId: 2,
      ingredientName: "name2",
      status: "ACTIVE",
    },
    {
      amount: 100,
      cartId: 1,
      id: 3,
      ingredientId: 3,
      ingredientName: "name3",
      status: "PENDING",
    },
    {
      amount: 300,
      cartId: 1,
      id: 4,
      ingredientId: 4,
      ingredientName: "name4",
      status: "ACTIVE",
    },
  ],
  "cart-has-recipes": [
    {
      cartId: 1,
      id: 1,
      recipeId: 1,
      recipeName: "string",
      status: "ACTIVE",
    },
  ],
};

for (let i = 0; i < dbSize; i++) {
  const type = randListItem(tagTypes);
  db["recipe-tags"].push({
    id: i + 1,
    name: faker.lorem.words(2),
    description: faker.lorem.sentence(3, 5),
    status: randStatus(),
    typeId: type["id"],
    typeName: type["name"],
  });
  db["ingredient-tags"].push({
    id: i + 1,
    name: faker.lorem.words(2),
    description: faker.lorem.sentence(3, 5),
    status: randStatus(),
    typeId: type["id"],
    typeName: type["name"],
  });
}

for (var i = 0; i < 40; i++) {
  db["ingredients"].push({
    id: i + 1,
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    unitAbbrev: randListItem(["cm", "ml", "l", "in", "dr"]),
    image: faker.image.food(),
    status: randStatus(),
  });
}

console.log(JSON.stringify(db));
