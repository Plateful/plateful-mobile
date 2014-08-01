(->

  MenusData = ()->
    geocoder = new google.maps.Geocoder()
    data = []
    get: ()->
      data
    set: (StateData)->
      data = StateData

  angular
    .module('app.modules.tabs.menus.services', [])
    .service('MenusData', MenusData)

)()
