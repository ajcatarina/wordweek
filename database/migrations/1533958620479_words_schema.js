'use strict'

const Schema = use('Schema')

class WordsSchema extends Schema {
  up () {
    this.create('words', (table) => {
      table.increments()
      table.string('word',255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('words')
  }
}

module.exports = WordsSchema
