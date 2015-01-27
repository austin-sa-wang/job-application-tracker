'use strict';

/**
 * Application Add component
 * UI to add applications
 */
angular.module('applicationAdd', ['applicationFactory'])

  .controller('applicationAddCtrl', function (ApplicationFactory) {
    this.application = {
      company: ''
    };

    var clearInputFields = function () {
      this.application.company = '';
    };

    this.addApplication = function () {
      ApplicationFactory.addApplication(this.application);
      clearInputFields.call(this);
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
