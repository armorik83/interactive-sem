'use strict';
import AbstractDispatcher = require('../abstracts/dispatcher');
import Injector = require('../injector');
var angular = Injector.angular();

// DO NOT change var name of 'constants'
// by reason of the convenience to find/replace
import IsemInjector = require('../isem-injector');
var constants = IsemInjector.constants();

declare var lsnrType: (ev: ng.IAngularEvent, ...args: any[]) => any;
interface Handlers {
  addEgmHandlers:       typeof lsnrType;
  addRelation:          typeof lsnrType;
  addVariable:          typeof lsnrType;
  disableVertexDisplay: typeof lsnrType;
  enableVertexDisplay:  typeof lsnrType;
  importFile:           typeof lsnrType;
  redrawDiagram:        typeof lsnrType;
  removeRelation:       typeof lsnrType;
  toggleVertexDisplay:  typeof lsnrType;
  updateDiagram:        typeof lsnrType;
}

export interface API {
  addHandlers(handlers: any): void;
}

class Dispatcher extends AbstractDispatcher {
  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    super();
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  protected init() {
    super.init();
  }

  /**
   * @param {*} handlers
   */
  addHandlers(handlers: Handlers) {
    super.on(constants.ADD_EGM_HANDLERS,       handlers.addEgmHandlers);
    super.on(constants.ADD_LATENT_VARIABLE,    handlers.addVariable);
    super.on(constants.ADD_RELATION,           handlers.addRelation);
    super.on(constants.DISABLE_VERTEX_DISPLAY, handlers.disableVertexDisplay);
    super.on(constants.ENABLE_VERTEX_DISPLAY,  handlers.enableVertexDisplay);
    super.on(constants.IMPORT_FILE,            handlers.importFile);
    super.on(constants.REDRAW_DIAGRAM,         handlers.redrawDiagram);
    super.on(constants.REMOVE_RELATION,        handlers.removeRelation);
    super.on(constants.TOGGLE_VERTEX_DISPLAY,  handlers.toggleVertexDisplay);
    super.on(constants.UPDATE_DIAGRAM,         handlers.updateDiagram);
    super.on(constants.UPDATE_DIAGRAM,         handlers.updateDiagram);
  }
}

export var singleton = new Dispatcher();
