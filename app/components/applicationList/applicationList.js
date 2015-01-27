'use strict';

/**
 * Application List component
 */
angular.module('applicationList', ['applicationFactory'])

  .controller('applicationListCtrl', function (ApplicationFactory) {
    this.applications = ApplicationFactory.getApplications();
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
