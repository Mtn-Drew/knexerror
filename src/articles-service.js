const ArticlesService = {
  getAllArticles(knex) {
    // return 'all the articles!!'
    // return Promise.resolve('all the articles!!')
    return knex.select('*').from('blogful_articles')
  },
  insertArticle(knex, newArticle) {
    return knex
      .insert(newArticle)
      .into('blogful_articles')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('blogful_articles').select('*')
  }
}
module.exports = ArticlesService
