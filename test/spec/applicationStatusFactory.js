'use strict';

describe('applicationStatusFactory', function () {
  var ApplicationStatusFactory;

  beforeEach(module('applicationStatusFactory'));

  beforeEach(inject(function(_ApplicationStatusFactory_) {
    ApplicationStatusFactory = _ApplicationStatusFactory_;
  }));

  it('check the existence of ApplicationStatusFactory', function () {
    expect(ApplicationStatusFactory).toBeDefined();
  });

  it('should provide access a list of all status objects', function () {
    var applicationList = ApplicationStatusFactory.getStatusList();
    expect(Object.prototype.toString.call(applicationList)).toEqual('[object Array]');
    expect(applicationList.length).toBeGreaterThan(0);
    for (var i = 0; i < applicationList.length; i += 1) {
      expect(applicationList[i]).toEqual(jasmine.any(Object));
    }
  });

  describe('status object', function () {
    it('should have a `name` property of String type', function () {
      var prop;
      for (var item in ApplicationStatusFactory) {
        prop = ApplicationStatusFactory[item];
        if (ApplicationStatusFactory.hasOwnProperty(item) && Object.prototype.toString.call(prop) === '[object Object]') {
          expect(prop.name).toEqual(jasmine.any(String));
        }
      }
    });

    it('should have a `name` property of String type', function () {
      var prop;
      for (var item in ApplicationStatusFactory) {
        prop = ApplicationStatusFactory[item];
        if (ApplicationStatusFactory.hasOwnProperty(item) && Object.prototype.toString.call(prop) === '[object Object]') {
          expect(prop.order).toEqual(jasmine.any(Number));
        }
      }
    });
  });

  it('should look up status object given status name', function () {
    expect(ApplicationStatusFactory.getStatusObject('Submitted')).toEqual(ApplicationStatusFactory.SUBMIT);
    expect(ApplicationStatusFactory.getStatusObject('1st Interview')).toEqual(ApplicationStatusFactory.FIRST);
  });

  it('should look up status name give status object', function () {
    expect(ApplicationStatusFactory.SUBMIT.getName).toEqual('Submitted');
  })
});
