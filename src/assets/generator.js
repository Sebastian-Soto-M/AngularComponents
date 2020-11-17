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

function randTagType() {
  let rand = Math.floor(Math.random() * tagTypes.length);
  return tagTypes[rand];
}

let db = {
  "recipe-tag": [],
};

for (let i = 0; i < dbSize; i++) {
  const type = randTagType();
  db["recipe-tag"].push({
    id: i + 1,
    name: faker.lorem.words(2),
    description: faker.lorem.sentence(3, 5),
    status: randStatus(),
    typeId: type["id"],
    typeName: type["name"],
  });
}

console.log(JSON.stringify(db));
