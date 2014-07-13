# mocha.setup
#   bail: false
#   ignoreLeaks: true

window.GLOBALS = 
  ENV: 'test'
  BACKEND_URL: ''

beforeEach module('ionicstarter')
beforeEach module('ionicstarter-templates')

afterEach ->
  inject ($httpBackend) ->
    $httpBackend.verifyNoOutstandingRequest()
    $httpBackend.verifyNoOutstandingExpectation()

  sessionStorage.clear()
  localStorage.clear()

