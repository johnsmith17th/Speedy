/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var Store = require('./store'),
	Memory = require('./memory'),
	errors = require('../error');

/**
 * Presence service.
 *
 * @param app {object} application context
 * @param store {Store} presence store interface
 * @api public
 */
var $ = function PresenceService(app, store) {
	this.app = app;
	this.store = store;

	// user memory store as default
	if (!(this.store instanceof Store)) {
		this.store = new Memory();
	}

	// handle present event
	this.store.on('present', function(presentity, presence) {
		
	});
};