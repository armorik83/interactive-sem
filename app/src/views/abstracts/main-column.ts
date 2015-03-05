'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        height: styles.mainDisplay.height,
        float: 'left',
        position: 'absolute'
      }).css({
        width: ['calc(', '100%', '-', styles.subColumn.width, ')'].join(' '),
        height: styles.mainDisplay.height
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    return {
      compile: Definition.compile,
      restrict: 'E',
      template: ''
    };
  }
}

angular.module(app.appName).directive('isemMainColumn', Definition.ddo);