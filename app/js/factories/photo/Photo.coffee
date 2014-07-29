angular.module('app.factory.photo', [])

.factory 'Photo', ['Restangular', (Rest)->
  Photo = Rest.all('photos')
  find: (id)->
    # api/photos
    Rest.one('photos', id)
  getUserAlbum: (user_id)->
    Photo.one('user', user_id)
  getItemGallery: (item_id)->
    Photo.one('item', item_id)
  getByReview: (review_id)->
    Photo.one('review', review_id)
]
