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
      link: ''
    };

    var clearInputFields = function (model) {
      model.company = '';
      model.position = '';
      model.link = '';
    };

    this.addApplication = function () {
      var newApplication = JSON.parse(JSON.stringify(this.application));
      clearInputFields(this.application);

      newApplication.status = ApplicationFactory.getStatusCode()[0];
      newApplication.date = Date.now();
      newApplication.note = '';

      ApplicationFactory.addApplication(newApplication);
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
