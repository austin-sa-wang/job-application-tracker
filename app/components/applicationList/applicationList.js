'use strict';

/**
 * Application List component
 */
angular.module('applicationList', ['applicationFactory', 'applicationStatusFactory', 'ui.bootstrap', 'ui.bootstrap.toggledDisplay'])

  .controller('applicationListCtrl', function (ApplicationFactory, ApplicationStatusFactory) {
    var _this = this;

    //this.statusOrderFilter = function (item) {
    //  item.status
    //};

    this.applications = ApplicationFactory.getApplications();

    this.statusList = ApplicationStatusFactory.getStatusList();

    this.removeApplication = function(applicationEntry) {
      ApplicationFactory.removeApplication(applicationEntry);
    };

    /**
     * Callback to update status. As well, update date to today to reflect last updated date
     * Used in application_list.html's nested ng-repeat for status dropdown menu
     * @param {!Application} applicationEntry
     * @param {String} status
     */
    this.updateStatus = function (applicationEntry, status) {
      ApplicationFactory.updateStatus(applicationEntry, status);
      ApplicationFactory.updateDate(applicationEntry, Date.now());
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
     * @param {!Application} applicationEntry
     */
    this.textareaToggled = function(isOpen, index, applicationEntry) {
      if (isOpen) {
        textarea(index).val( ApplicationFactory.getNote(applicationEntry) );
      } else {
        ApplicationFactory.updateNote( applicationEntry, textarea(index).val() );
      }
    };

    // List ordering
    this.predicate = 'company';
    this.reverse = false;
    var prevPredicate = '';

    this.orderByDate = 'date';
    this.orderByStatus = ApplicationStatusFactory.getStatusValueFunction();

    var toggleOrder = function () {
      _this.reverse = !_this.reverse;
    };

    /**
     * Change predicate for ordering the applications
     * @param {String|Function|Array} newPredicate
     */
    this.changePredicate = function (newPredicate) {
      if (prevPredicate === newPredicate) {
        toggleOrder();
      }
      _this.predicate = newPredicate;
      prevPredicate = _this.predicate;
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
