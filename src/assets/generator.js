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
  "user-profiles": [
    {
      id: 1,
      userId: 1,
      userLogin: "abc123doremi",
    },
  ],
  users: [
    {
      id: 1,
      login: "abc123doremi",
      firstName: "Sebastian",
      lastName: "Soto",
      email: "ssotom@ucenfotec.ac.cr",
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
