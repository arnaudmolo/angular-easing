"use strict"

describe "Service: Data", () ->

  # load the service"s module
  beforeEach module "Easie"

  # instantiate service
  Easie = {}
  beforeEach inject (_Easie_) ->
    Easie = _Easie_

  it 'should launch every functions', ->
    for animation_name of Easie
      Easie[animation_name](0.5, 0, 1, 30)
        .should.be.a.Number