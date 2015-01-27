'use strict';

/**
 * Application Add component
 * UI to add applications
 */
angular.module('applicationAdd', ['applicationFactory'])

  .controller('applicationAddCtrl', function (ApplicationFactory) {
    this.application = {
      company: '',
      position: '',
      status: '',
      date: '',
      note: ''
    };

    var clearInputFields = function (vm) {
      vm.company = '';
      vm.position = '';
      vm.status = '';
      vm.date = '';
      vm.note = '';
    };

    this.addApplication = function () {
      ApplicationFactory.addApplication(this.application);
      clearInputFields(this.application);
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
