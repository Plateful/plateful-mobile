window.GLOBALS = {
  ENV: 'test',
  BACKEND_URL: ''
}

beforeEach(module('app'))
// beforeEach(module('app-templates'))
beforeEach(function(){
  localStorage.setItem("user_id", 39086);
})
afterEach(function(){
  inject(function ($httpBackend){

    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });
  // sessionStorage.clear();
  // localStorage.clear();
})
