'use strict';

/**
 * ApplicationFactory
 * Manage applications.
 */
angular.module('applicationFactory', [])

  .factory('ApplicationFactory', function ApplicationFactory () {
    var applications = [];

    // Fix: This doesn't protect the data
    ApplicationFactory.getApplications = function () {
      return applications;
    };

    ApplicationFactory.addApplication = function (applicationEntry) {
      applications.push(applicationEntry);
    };

    return ApplicationFactory;
  });
