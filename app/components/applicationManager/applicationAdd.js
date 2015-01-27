'use strict';

/**
 * Application Add component
 * UI to add applications
 */
angular.module('applicationAdd', ['applicationFactory'])

  .controller('applicationAddCtrl', function (ApplicationFactory) {
    this.company = '';

    this.addApplication = function () {
      var newEntry = {
        company: this.company
      };

      ApplicationFactory.addApplication(newEntry);
    };
  })

  .directive('applicationAdd', function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'components/applicationManager/application_add.html',
      controller: 'applicationAddCtrl',
      controllerAs: 'ctrl'
    };
  });
