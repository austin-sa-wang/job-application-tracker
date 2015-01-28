'use strict';

/**
 * Application List component
 */
angular.module('applicationList', ['applicationFactory', 'ui.bootstrap'])

  .controller('applicationListCtrl', function (ApplicationFactory) {
    this.applications = ApplicationFactory.getApplications();

    this.statusCode = ApplicationFactory.getStatusCode();

    /**
     * Callback to update status
     * Used in application_list.html's nested ng-repeat for status dropdown menu
     * @param {int} applicationIndex
     * @param {int} statusCode
     */
    this.updateStatus = function (applicationIndex, statusCode) {
      ApplicationFactory.updateStatus(applicationIndex, statusCode);
    };
  })

  .directive('applicationList', function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'components/applicationList/application_list.html',
      controller: 'applicationListCtrl',
      controllerAs: 'ctrl'
    };
  });
