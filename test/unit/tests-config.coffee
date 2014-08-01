# mocha.setup
#   bail: false
#   ignoreLeaks: true

window.GLOBALS =
  ENV: 'test'
  BACKEND_URL: ''

beforeEach module('app')


afterEach ->
  inject ($httpBackend) ->
    $httpBackend.verifyNoOutstandingRequest()
    $httpBackend.verifyNoOutstandingExpectation()

  sessionStorage.clear()
  localStorage.clear()
