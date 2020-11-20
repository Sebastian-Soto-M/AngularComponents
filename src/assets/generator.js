"use strict";
const faker = require("faker");

const dbSize = 30;

const ingredientNames = [
  "baking powder",
  "eggs",
  "all-purpose flour",
  "raisins",
  "milk",
  "white sugar",
  "sugar",
  "egg yolks",
  "corn starch",
  "cream of tartar",
  "bananas",
  "vanilla wafers",
  "milk",
  "vanilla extract",
  "toasted pecans",
  "egg whites",
  "light rum",
  "sausage links",
  "fennel bulb",
  "fronds",
  "olive oil",
  "cuban peppers",
  "onions",
  "meat cuts",
  "file powder",
  "smoked sausage",
  "okra",
  "shrimp",
  "andouille sausage",
  "water",
  "paprika",
  "hot sauce",
  "garlic cloves",
  "browning",
  "lump crab meat",
  "vegetable oil",
  "all-purpose flour",
];

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

function randListItem(list) {
  let rand = Math.floor(Math.random() * list.length);
  return list[rand];
}

let db = {
  ingredients: [],
  "recipe-tag": [],
};

for (let i = 0; i < dbSize; i++) {
  const type = randListItem(tagTypes);
  db["recipe-tag"].push({
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
    name: randListItem(ingredientNames),
    description: faker.lorem.sentence(),
    units: randListItem(["cm", "ml", "l", "in", "dr"]),
    image: faker.image.food(),
    status: randStatus(),
  });
}

console.log(JSON.stringify(db));
