angular.module('app.factory.user', [])

.service 'User', ['Restangular', (Rest)->
  User = Rest.all('users')
  get: ()->
    User
  find: (id)->
    Rest.one('users', id)
  post: (data)->
    User.post( data )
  update: (id, data)->

  destroy: (id)->
]
