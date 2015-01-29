/*
 * The toggleDisplay directive is based on the dropdown directive of Angular Bootstrap
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * License: MIT
 */

/**
 * Added directive: toggledDisplay directive
 * Implementation is based on dropdown but prevents clicks on the "dropdown" (textareaToggled display area) from closing the display.
 * Prevention is implemented by checking if the click target is excluded from the closing logic, identified by the toggle-display-area directive.
 * There are two click handlers driving the toggle on/off, one registered on document, the other registered on the toggle directive.
 * The most straight-forward, yet ugly way to account for this is to have duplicated logic in both places.
 * Both are annotated in the respective comment with "HACK:" prefix.
 * Use textareaToggled-display-area directive to indicate the display area
 */
angular.module('ui.bootstrap.toggledDisplay', [])

.constant('toggledDisplayConfig', {
  openClass: 'open'
})

.service('toggledDisplayService', ['$document', function($document) {
  var openScope = null;

  this.open = function( toggledDisplayScope ) {
    if ( !openScope ) {
      $document.bind('click', closeToggledDisplay);
      $document.bind('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== toggledDisplayScope ) {
        openScope.isOpen = false;
    }

    openScope = toggledDisplayScope;
  };

  this.close = function( toggledDisplayScope ) {
    if ( openScope === toggledDisplayScope ) {
      openScope = null;
      $document.unbind('click', closeToggledDisplay);
      $document.unbind('keydown', escapeKeyBind);
    }
  };

  var closeToggledDisplay = function( evt ) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) { return; }

    var toggleElement = openScope.getToggleElement();
    if ( evt && toggleElement && toggleElement[0].contains(evt.target) ) {
        return;
    }

    /**
     * HACK:
     * Addition: Prevent display area from closing itself when clicked
     * Duplicated logic with the one in toggle directive
     * Take care of case when display is not a child of toggle
     */
    var displayElement = openScope.getDisplayElement();
    if ( event && displayElement && displayElement[0].contains(event.target) ) {
      return;
    }

    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
    if ( evt.which === 27 ) {
      openScope.focusToggleElement();
      closeToggledDisplay();
    }
  };
}])

.controller('toggledDisplayController', ['$scope', '$attrs', '$parse', 'toggledDisplayConfig', 'toggledDisplayService', '$animate', function($scope, $attrs, $parse, toggledDisplayConfig, toggledDisplayService, $animate) {
  var self = this,
      scope = $scope.$new(), // create a child scope so we are not polluting original one
      openClass = toggledDisplayConfig.openClass,
      getIsOpen,
      setIsOpen = angular.noop,
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

  this.init = function( element ) {
    self.$element = element;

    if ( $attrs.isOpen ) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }
  };

  this.toggle = function( open ) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

    scope.getDisplayElement = function() {
      return self.displayElement;
    };

  scope.focusToggleElement = function() {
    if ( self.toggleElement ) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function( isOpen, wasOpen ) {
    $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( isOpen ) {
      scope.focusToggleElement();
      toggledDisplayService.open( scope );
    } else {
      toggledDisplayService.close( scope );
    }

    setIsOpen($scope, isOpen);
    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
      toggleInvoker($scope, { open: !!isOpen });
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    scope.isOpen = false;
  });

  $scope.$on('$destroy', function() {
    scope.$destroy();
  });
}])

.directive('toggledDisplay', function() {
  return {
    controller: 'toggledDisplayController',
    link: function(scope, element, attrs, toggledDisplayCtrl) {
      toggledDisplayCtrl.init( element );
    }
  };
})

/**
 * Addition: Save reference to the display area
 * Enables check to prevent display area from closing itself when clicked
 */
  .directive('toggledDisplayArea', function() {
    return {
      require: '?^toggledDisplay',
      link: function(scope, element, attrs, toggledDisplayCtrl) {
        if ( !toggledDisplayCtrl ) {
          return;
        }
        toggledDisplayCtrl.displayElement = element;
      }
    };
  })

.directive('toggledDisplayToggle', function() {
  return {
    require: '?^toggledDisplay',
    link: function(scope, element, attrs, toggledDisplayCtrl) {
      if ( !toggledDisplayCtrl ) {
        return;
      }

      toggledDisplayCtrl.toggleElement = element;

      var toggleToggledDisplay = function(event) {
        event.preventDefault();

        /**
         * HACK:
         * Addition: Prevent display area from closing itself when clicked
         * Duplicated logic with the one toggle service
         * Take care of case when display is a child of toggle
         */
        var displayElement = toggledDisplayCtrl.displayElement;
        if ( event && displayElement && displayElement[0].contains(event.target) ) {
          return;
        }

        if ( !element.hasClass('disabled') && !attrs.disabled ) {
          scope.$apply(function() {
            toggledDisplayCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleToggledDisplay);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(toggledDisplayCtrl.isOpen, function( isOpen ) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleToggledDisplay);
      });
    }
  };
});
