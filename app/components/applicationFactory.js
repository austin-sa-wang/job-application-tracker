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
     * Remove an existing application from the list
     * @param {!Application} applicationEntry
     */
    ApplicationFactory.removeApplication = function (applicationEntry) {
      applications.splice(applications.indexOf(applicationEntry), 1);

      // TODO: Reverse the direction. Observe changes to applications instead of calling manually
      ApplicationFactory.updateStorage();
    };

    /**
     * Update application status
     * @param {!Application} applicationEntry
     * @param {Int} statusCode
     */
    ApplicationFactory.updateStatus = function (applicationEntry, status) {
      applicationEntry.status = status;

      // TODO: Reverse the direction. Observe changes to applications instead of calling manually
      ApplicationFactory.updateStorage();
    };

    /**
     *
     * @param {!Application} applicationEntry
     * @param {!Date} newDate Javascript Native Date Object
     */
    ApplicationFactory.updateDate = function (applicationEntry, newDate) {
      applicationEntry.date = newDate;
    };

    /**
     * Update application note
     * @param {Int} applicationEntry
     * @param {Int} newNote
     */
    ApplicationFactory.updateNote = function (applicationEntry, newNote) {
      applicationEntry.note = newNote;

      // TODO: Reverse the direction. Observe changes to applications instead of calling manually
      ApplicationFactory.updateStorage();
    };

    /**
     * Get application note give list index
     * @param {!Application} applicationEntry
     * @returns {String}
     */
    ApplicationFactory.getNote = function (applicationIndex) {
      return applicationIndex.note;
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
