'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var localized = IsemInjector.localized();

var directiveName = 'isemDialogRenameVariable';

interface DialogData {
  vertexId: number;
  variableName: string;
}

interface Scope extends ng.IScope, DialogData {
  localized: any;
  locale(): string;

  dialog: cw.DialogInstance<DialogData>;
}

export class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    // DO NOT call #init() here because $scope hasn't been set yet.
  }

  init() {
    log.trace(log.t(), __filename, '#init()', this.$scope);
    this.$scope.variableName = this.$scope.dialog.data.variableName;
    this.$scope.vertexId     = this.$scope.dialog.data.vertexId;

    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }

  /**
   * @param {string} u
   * @param {string} label
   * @returns {void}
   */
  rename(u: number, label: string) {
    log.trace(log.t(), __filename, '#rename()');
    var data = {
      u: u,
      label: label
    };
    this.$rootScope.$broadcast(constants.RENAME_VARIABLE, data);
    this.$scope.dialog.close();
  }

  /**
   * @returns {void}
   */
  cancel() {
    log.trace(log.t(), __filename, '#cancel()');
    this.$scope.dialog.close();
  }
}

export function open(data: DialogData) {
  log.debug(log.t(), __filename, 'open()', arguments);
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog: cw.DialogStatic = rootElement.injector().get('Dialog');

  var dialog = new Dialog<DialogData>({
    template: '<isem-dialog-rename-variable isem-io-locale="$root.locale" />'
  });
  dialog.open(data);
}

export class Definition {
  static link($scope: Scope, _: any, __: any, controllers: any) {
    var cwModal = controllers[0];
    var self    = controllers[1];

    $scope.dialog = cwModal.dialog;
    self.init();
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      link: Definition.link,
      require: ['^cwModal', directiveName],
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.dialogs + 'rename-variable.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);