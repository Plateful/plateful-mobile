###
A simple example service that returns some data.
###
angular.module("app")

.factory "PetService", ->

  # Might use a resource here that returns a JSON array

  # Some fake testing data
  pets = [
    {
      id: 0
      title: "Cats"
      description: "Furry little creatures. Obsessed with plotting assassination, but never following through on it."
    }
    {
      id: 1
      title: "Dogs"
      description: "Lovable. Loyal almost to a fault. Smarter than they let on."
    }
    {
      id: 2
      title: "Turtles"
      description: "Everyone likes turtles."
    }
    {
      id: 3
      title: "Sharks"
      description: "An advanced pet. Needs millions of gallons of salt water. Will happily eat you."
    }
  ]
  all: ->
    pets

  get: (petId) ->

    # Simple index lookup
    pets[petId]
