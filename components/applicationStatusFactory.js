'use strict';

angular.module('applicationStatusFactory', [])

  .factory('ApplicationStatusFactory', function ApplicationStatusFactory () {
    var Status = function (_name, _order) {
      this.name = _name;
      this.order = _order;
    };

    Status.prototype.getName = function () {
      return this.name;
    };

    // Status object instantiations
    ApplicationStatusFactory.APPLY = new Status('To Apply', 0);
    ApplicationStatusFactory.SUBMIT = new Status('Submitted', 1);
    ApplicationStatusFactory.HR = new Status('HR Interview', 2);
    ApplicationStatusFactory.FIRST = new Status('1st Interview', 3);
    ApplicationStatusFactory.SECOND = new Status('2nd Interview', 4);
    ApplicationStatusFactory.ACCEPT = new Status('Accepted', 5);
    ApplicationStatusFactory.REJECT = new Status('Rejected', 6);

    var statusList = (/**
     * Construct a list containing all the defined status objects
     * @returns {Array}
     */
      function () {
      var list = [];
      var prop;
      for (var propName in ApplicationStatusFactory) {
        prop = ApplicationStatusFactory[propName];
        if (prop instanceof Status) {
          list.push(prop);
        }
      }
      return list;
    })();

    ApplicationStatusFactory.getStatusList = function () {
      return statusList;
    };

    ApplicationStatusFactory.getStatusValueFunction = function () {
      return function (entry) {
        return entry.status.order;
      };
    };

    /**
     * Get the status object given a status name
     * @param {String} name
     * @returns {!Status}
     */
    ApplicationStatusFactory.getStatusObject = function (name) {
      var status;
      for (var i = 0; i < statusList.length; i+=1) {
        status = statusList[i];
        if (status.name === name) {
          break;
        }
      }
      return status;
    };

    return ApplicationStatusFactory;
  });
