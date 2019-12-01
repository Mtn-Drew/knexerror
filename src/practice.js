// require("dotenv").config();
const dotenv = require("dotenv").config();
const knex = require("knex");
console.log(process.env.DB_URL);
const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
  // connection: "postgresql://dunder_mifflin:1111@localhost/knex-practice"
});

console.log("knex and driver installed correctly");

knexInstance
  .from("amazong_products")
  .select("*")
  .then(result => {
    console.log(result);
  });
