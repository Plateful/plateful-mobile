angular.module 'app'

.factory 'ObserverFactory', ->
  class ObserverFactory
    constructor: ->
      @listeners = {}

    on: (eventName, listener) ->
      @listeners[eventName] ?= []
      @listeners[eventName].push listener

    once: (eventName, listener) ->
      listener.__once__ = true
      @on eventName, listener

    off: (eventName, listener) ->
      return unless @listeners[eventName]

      return delete @listeners[eventName] if !listener

      for i, v in @listeners[eventName]
        if @listeners[eventName] == listener
          @listeners.splice i, 1
          break

    fireEvent: (eventName, params...) ->
      return unless @listeners[eventName]?.length

      for v in @listeners[eventName]
        v.apply(@, params)
        @off eventName, v if v.__once__
