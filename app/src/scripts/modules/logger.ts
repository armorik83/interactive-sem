'use strict';

enum Level {
  OFF,
  FATAL,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE
}

class Logger {
  // set level
  static level = Level.TRACE;

  /**
   * @param {Level} level
   * @returns {Function}
   */
  private static logging(level: Level): Function {
    if (Logger.level === Level.OFF) {return () => {}}

    var levelBelow  = level <= Logger.level;
    if (level === Level.TRACE && levelBelow) {return console.log  .bind(console)}
    if (level === Level.DEBUG && levelBelow) {return console.log  .bind(console)}
    if (level === Level.INFO  && levelBelow) {return console.info .bind(console)}
    if (level === Level.WARN  && levelBelow) {return console.warn .bind(console)}
    if (level === Level.ERROR && levelBelow) {return console.error.bind(console)}
    if (level === Level.FATAL && levelBelow) {return console.error.bind(console, '[FATAL]')}
    return () => {};
  }

  static t() {
    return new Date().toISOString() + ' |';
  }

  static trace = Logger.logging(Level.TRACE);
  static debug = Logger.logging(Level.DEBUG);
  static info  = Logger.logging(Level.INFO);
  static warn  = Logger.logging(Level.WARN);
  static error = Logger.logging(Level.ERROR);
  static fatal = Logger.logging(Level.FATAL);
}

export = Logger;
