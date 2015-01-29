Job Application Tracker
===========
Web app to tracker job application status.
This application is intended as a minimal solution for personal use.

As for now, data is stored in JSON on HTML5 local storage.

Custom AngularJS UI Bootstrap
------
####toggledDisplay - A generalized `dropdown` directive
This directive is extended from the `dropdown` directive of Angular UI Bootstrap.
The modifications are that:

1. It uses customized css rules for show&hide instead of the default Twitter Bootstrap "dropdown-menu" class
2. The element which gets toggled does not close (toggle close) itself when clicked on. This element should be identified with the `toggled-display-area` directive

Instead of replacing the official library with a custom build, this component is segregated into its own module at `components/toggledDisplayDirective.js`.

Framework, Library, Tooling
------
AngularJS, AngularJS UI Bootstrap, Twitter Bootstrap, Bower, Grunt
