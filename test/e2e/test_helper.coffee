module.exports =  

  # Shortcut-helper to automatically make the user signed in the application.
  signIn: ->
    @localStorage.setItem "user_email", "test@domain.com"
    @localStorage.setItem "user_token", "123"

  # localStorage helpers.
  localStorage:
    setItem: (key, value) ->
      protractor.getInstance().executeScript "window.localStorage.setItem(#{JSON.stringify(key)}, #{JSON.stringify(value)});"

    getItem: (key) ->
      protractor.getInstance().executeScript "window.localStorage.getItem(#{JSON.stringify(key)});"

    removeItem: (key) ->
      protractor.getInstance().executeScript "window.localStorage.removeItem(#{JSON.stringify(key)});"

    clear: ->
      protractor.getInstance().executeScript "window.localStorage.clear();"

    setObject: (key, value) ->
      @setItem(key, JSON.stringify(value))

    getObject: (key) ->
      JSON.parse(@getItem(key))
