require('coffee-script/register');
TestHelper = require('./test_helper');

exports.config = {
  baseUrl: 'http://localhost:4400',

  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: [
    {
      'browserName': 'chrome'
    },
    {
      'browserName': 'phantomjs'
    }
  ],

  specs: ['./**/*.coffee'],

  jasmineNodeOpts: {
    showColors: true, 
  },

  onPrepare: function() {
    beforeEach(function(){
      browser.get('/');
    })

    afterEach(function(){
      protractor.getInstance().manage().deleteAllCookies();
      TestHelper.localStorage.clear();
    });
  }
};
