'use strict';

/**
 * ApplicationFactory
 * Manage applications.
 */
angular.module('applicationFactory', [])

  .factory('ApplicationFactory', function ApplicationFactory () {
    var STORAGE_IDENTIFIER = 'applications';

    var STATUS_CODE = [
      'Submitted',
      'HR Interview',
      '1st Interview',
      '2nd Interview',
      'Accepted',
      'Rejected'
    ];

    // Initialize applications list from localStorage, else initialize to empty array
    var applications = JSON.parse(localStorage.getItem(STORAGE_IDENTIFIER)) || [];

    // TOFIX: This doesn't protect the data
    ApplicationFactory.getApplications = function () {
      return applications;
    };

    ApplicationFactory.getStatusCode = function () {
      return STATUS_CODE;
    };

    /**
     * Add a new application to the list
     * @param {Object} applicationEntry
     */
    ApplicationFactory.addApplication = function (applicationEntry) {
      applications.push(applicationEntry);

      // TODO: Reverse the direction. Observe changes to applications instead of calling manually
      ApplicationFactory.updateStorage();
    };

    /**
     * Update application status
     * @param {int} applicationEntry
     * @param {int} newStatus
     */
    ApplicationFactory.updateStatus = function (applicationIndex, statusCode) {
      applications[applicationIndex].status = STATUS_CODE[statusCode];

      // TODO: Reverse the direction. Observe changes to applications instead of calling manually
      ApplicationFactory.updateStorage();
    };

    /**
     * Update local storage to persist state
     * Currently this is triggered manually. Ideally we should observe the model and update accordingly.
     */
    ApplicationFactory.updateStorage = function () {
      // Use angular.Json to filter out ng-repeat book-keeping headers ($$hash)
      localStorage.setItem(STORAGE_IDENTIFIER, angular.toJson(applications));
    };

    return ApplicationFactory;
  });
