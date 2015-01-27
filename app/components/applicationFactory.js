'use strict';

/**
 * ApplicationFactory
 * Manage applications.
 */
angular.module('applicationFactory', [])

  .factory('ApplicationFactory', function ApplicationFactory () {
    var STORAGE_IDENTIFIER = 'applications';

    // Initialize applications list from localStorage, else initialize to empty array
    var applications = JSON.parse(localStorage.getItem(STORAGE_IDENTIFIER)) || [];

    // TOFIX: This doesn't protect the data
    ApplicationFactory.getApplications = function () {
      return applications;
    };

    ApplicationFactory.addApplication = function (applicationEntry) {
      var entryClone = JSON.parse(JSON.stringify(applicationEntry));
      applications.push(entryClone);

      // TODO: Reverse the direction. Observe changes to applications instead of calling manually
      // Use angular.Json to filter out ng-repeat book-keeping headers ($$hash)
      localStorage.setItem(STORAGE_IDENTIFIER, angular.toJson(applications));
    };

    return ApplicationFactory;
  });
