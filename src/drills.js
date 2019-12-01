const knex = require('knex')
const knexInstance = knex({
  client: 'pg',
  // connection: process.env.DB_URL
  connection: 'postgresql://dunder_mifflin:1111@localhost/knex-practice'
})
console.log('knex and driver installed correctly')

function searchByProduceName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

function paginateProducts(pageNumber) {
  const productsPerPage = 6
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

function daysAgo(days) {
  knexInstance
    .select('id', 'name', 'price', 'date_added')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('shopping_list')
    .then(result => {
      console.log(result)
    })
}
function costPerCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY')
      console.log(result)
    })
}
