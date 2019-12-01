// require("dotenv").config();
// const dotenv = require("dotenv").config();
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const knex = require('knex')
console.log(process.env.DB_URL)
const knexInstance = knex({
  client: 'pg',
  // connection: process.env.DB_URL
  connection: 'postgresql://dunder_mifflin:1111@localhost/knex-practice'
})

console.log('knex and driver installed correctly')
function searchByProduceName(searchTerm) {
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

// searchByProduceName('holo');

function paginateProducts(page) {
  const productsPerPage = 10
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

paginateProducts(2)

// getProductsWithImages()

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' }
    ])
    .then(result => {
      console.log(result)
    })
}

mostPopularVideosForDays(30)
