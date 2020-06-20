'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
Route.get('files/:id', 'FileController.show')


/** Routes that can be accessed only logged users */
Route.group(() => {
  Route.post('files', 'FileController.store')

  /** Create all apiOnly routes for controller using resource */
  Route.resource('projects', 'ProjectController').apiOnly()
}).middleware(['auth'])

