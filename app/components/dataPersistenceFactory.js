'use strict';

angular.module('dataPersistenceFactory', ['applicationStatusFactory'])
  .constant('LOCAL_STORAGE_KEY', 'applications')

  .factory('DataPersistenceFactory', function DataPersistenceFactory (LOCAL_STORAGE_KEY, ApplicationStatusFactory) {

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
     * Get applications list from localStorage.
     * Replace status names with status objects.
     * Initialize to empty array if list does not exist in localStorage.
     * @returns {Array} applications
     */
    DataPersistenceFactory.getApplications = function () {
      var applications = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
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
    };

    /**
     * Update local storage data
     * @param {Array} applicationList
     */
    DataPersistenceFactory.persist = function (applicationList) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applicationList, toJsonReplacer));
    };

    /**
     * Get serialized application list
     * @returns {String} JSON
     */
    DataPersistenceFactory.getSerializedApplicationList = function () {
      return localStorage.getItem(LOCAL_STORAGE_KEY);
    };

    /**
     *
     * @param data
     */
    DataPersistenceFactory.restoreApplications = function (data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, data);
    };

    return DataPersistenceFactory;
  });
