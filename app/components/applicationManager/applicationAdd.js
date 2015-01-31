'use strict';

/**
 * Application Add component
 * UI to add applications
 */
angular.module('applicationAdd', ['applicationFactory', 'applicationStatusFactory'])

  .controller('applicationAddCtrl', function (ApplicationFactory, ApplicationStatusFactory) {
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

    /**
     * Add a new application to the list
     * Set initial status to 'To Apply', date to today, and note to empty string
     */
    this.addApplication = function () {
      var newApplication = JSON.parse(JSON.stringify(this.application));
      clearInputFields(this.application);

      newApplication.status = ApplicationStatusFactory.APPLY.name;
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
