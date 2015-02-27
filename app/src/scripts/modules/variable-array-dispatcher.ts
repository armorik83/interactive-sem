'use strict';
import angular = require('angular');

export interface IVariableArrayDispatcher {
  init(): void;
  registerOnAddVariable(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
  registerOnImportFile(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
}

class VariableArrayDispatcher {
  private $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  init() {
    var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
    this.$rootScope = rootElement.scope();
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  registerOnAddVariable(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on('isem:addVariable', listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  registerOnImportFile(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on('isem:importFile', listener);
  }
}

export var singleton = new VariableArrayDispatcher();
