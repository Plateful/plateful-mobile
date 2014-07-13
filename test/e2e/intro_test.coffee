TestHelper = require './test_helper'

xdescribe 'intro', ->

  it 'should land on the intro page', ->
    expect(browser.getLocationAbsUrl()).toMatch '/intro'
