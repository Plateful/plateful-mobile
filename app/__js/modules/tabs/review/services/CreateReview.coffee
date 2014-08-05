(->
  CreateReview = ()->
    review = {}

    get: (key)->
      if key then return review[key]
      review
    set: (key, val)->
      review[key] = val

  angular
    .module('app')
    .service('CreateReview', CreateReview)
)()
