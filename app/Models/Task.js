'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  project() {
    return this.belongsTo('App/Models/Project')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  /** If a task has many files, you need create a pivot table
   *  and the relation should be belongsToMany, check adonis docs.
   */
  file() {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
