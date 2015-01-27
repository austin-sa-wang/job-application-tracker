'use strict';

/**
 * Application List component
 */
angular.module('applicationList', ['applicationFactory', 'ui.bootstrap'])

  .controller('applicationListCtrl', function (ApplicationFactory) {
    this.applications = ApplicationFactory.getApplications();

    this.statusList = ApplicationFactory.STATUS_CODE;

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
