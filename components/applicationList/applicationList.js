'use strict';

/**
 * Application List component
 */
angular.module('applicationList', ['applicationFactory', 'ui.bootstrap', 'ui.bootstrap.toggledDisplay'])

  .controller('applicationListCtrl', function (ApplicationFactory) {
    var _this = this;

    //this.statusOrderFilter = function (item) {
    //  item.status
    //};

    this.applications = ApplicationFactory.getApplications();

    this.statusCode = ApplicationFactory.getStatusCode();

    this.removeApplication = function(index) {
      ApplicationFactory.removeApplication(index);
    };

    /**
     * Callback to update status. As well, update date to today to reflect last updated date
     * Used in application_list.html's nested ng-repeat for status dropdown menu
     * @param {Int} applicationIndex
     * @param {Int} statusCode
     */
    this.updateStatus = function (applicationIndex, statusCode) {
      ApplicationFactory.updateStatus(applicationIndex, statusCode);
      ApplicationFactory.updateDate(applicationIndex, Date.now());
    };

    /**
     * Return the textarea node given list index
     * @param {Int} index
     * @returns {Element}
     */
    var textarea = function (index) {
      return _this.listElement.find('textarea').eq(index);
    };

    /**
     * Push note content into textarea when it is opened. Conversely, update application note when closing.
     * Used in application_list.html's toggledDisplay
     * @param {Boolean} isOpen
     * @param {Int} index
     */
    this.textareaToggled = function(isOpen, index) {
      if (isOpen) {
        textarea(index).val( ApplicationFactory.getNote(index) );
      } else {
        ApplicationFactory.updateNote( index, textarea(index).val() );
      }
    };
  })

  .directive('applicationList', function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'components/applicationList/application_list.html',
      controller: 'applicationListCtrl',
      controllerAs: 'ctrl',
      link: function(scope, element, attrs, ctrl) {
        ctrl.listElement = element;
      }
    };
  });
