'use strict';

angular.module('backupManager', ['dataPersistenceFactory'])

  .controller('backupPopupCtrl', function (DataPersistenceFactory) {
    var _this = this;
    this.backupButtonToggled = function (isOpen) {
      if (isOpen) {
        _this.popupElement.val(DataPersistenceFactory.getSerializedApplicationList());
      }
    };
  })

  .directive('backupPopup', function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'components/applicationManager/backup_popup.html',
      controller: 'backupPopupCtrl',
      controllerAs: 'ctrl',
      link: function(scope, element, attrs, ctrl) {
        ctrl.popupElement = element.find('textarea');
      }
    };
  })

  .controller('restorePopupCtrl', function (DataPersistenceFactory) {
    var EMPTY_MSG = 'Empty';
    var INVALID_MSG = 'Invalid restoration data';
    var _this = this;

    this.errorText = '';

    /**
     * Clear error text and input field
     * @param isOpen
     */
    this.backupButtonToggled = function (isOpen) {
      if (!isOpen) {
        _this.errorText = '';
        _this.popupElement.val('');
      }
    };

    /**
     * Restore application data with the data which the user provides
     */
    this.restoreApplications = function () {
      var data = _this.popupElement.val();

      if ( !(data.length > 0) ) {
        _this.errorText = EMPTY_MSG;
        return;
      }

      // Check if valid JSON
      try {
        JSON.parse(data);
      } catch (e) {
        _this.errorText = INVALID_MSG;
        return;
      }
      DataPersistenceFactory.restoreApplications(data);

      // Do a hard page reload to load the restored data
      // TODO: Update model data without hard reload
      location.reload();
    };
  })

  .directive('restorePopup', function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'components/applicationManager/restore_popup.html',
      controller: 'restorePopupCtrl',
      controllerAs: 'ctrl',
      link: function(scope, element, attrs, ctrl) {
        ctrl.popupElement = element.find('textarea');
      }
    };
  });
