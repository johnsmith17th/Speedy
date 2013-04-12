/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var errors = require('../error');

/**
 * Message service.
 *
 * @param app {object} application context
 * @param store {Store} message store interface
 * @api public
 */
function Message(app, store) {
	this.app = app;
	this.store = store;

}