'use strict';

/**
 * ApplicationFactory
 * Manage applications.
 */
angular.module('applicationFactory', ['applicationStatusFactory'])

  .factory('ApplicationFactory', function ApplicationFactory (ApplicationStatusFactory) {
    var STORAGE_IDENTIFIER = 'applications';

    var applications = (/**
       * Initialize applications list from localStorage, replacing status names with status objects
       * Initialize to empty array if existing list does not exist
       * @returns {Array}
       */
        function () {
        var applications = JSON.parse(localStorage.getItem(STORAGE_IDENTIFIER));
        if (Object.prototype.toString.call(applications) === '[object Array]') {
          // Replace status names with status objects
          var currentAppl;
          for (var i = 0; i < applications.length; i+=1) {
            currentAppl = applications[i];
            currentAppl.status = ApplicationStatusFactory.getStatusObject(currentAppl.status);
          }
          return applications;
        } else {
          return [];
        }
      })();

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
     * JSON replacer function to
     * 1. remove AngularJS ngRepeat array bookkeeping overhead, and
     * 2. replace status object with its name.
     *
     * @param key
     * @param value
     * @returns {*}
     */
    var toJsonReplacer = function (key, value) {
      var val = value;
      if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
        val = undefined;
      } else if (key === 'status') {
        val = value.name;
      }
      return val;
    };

    /**
     * Update local storage to persist state
     * TODO: Currently this is triggered manually. Ideally we should observe the model and update accordingly.
     */
    ApplicationFactory.updateStorage = function () {
      localStorage.setItem(STORAGE_IDENTIFIER, JSON.stringify(applications, toJsonReplacer));
    };

    return ApplicationFactory;
  });
