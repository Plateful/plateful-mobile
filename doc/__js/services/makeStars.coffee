(->
  makeStars = ()->
    set: (item)->
      num = Math.random() * 5
      '★★★★★½'.slice(5.75-num, 6.25-Math.abs(num%1-0.5))
    get: (num)->
      '★★★★★½'.slice(5.75-num, 6.25-Math.abs(num%1-0.5))

  angular
    .module('app')
    .service('makeStars', makeStars)
)()
