/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;

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
	this.handlers = require('./handler');
}

/**
 * Inherit from EventEmitter.
 */
Message.prototype.__proto__ = EventEmitter.prototype;

/**
 * Handle message.
 *
 * @api public
 */
Message.prototype.handle = function(socket, message) {
	if (this.handlers[message.type]) {
		this.handlers[message.type](this.app, socket, message);
	}
};

/**
 * Send presence notify.
 *
 * @api public
 */
Message.prototype.notidy = function(socket, data) {
	var msg = {
		type: 'presense',
		body: {
			type: 'notify',
			notify: Array.isArray(data) ? data : [data];
		}
	};
	socket.emit('speedy', msg);
};

/**
 * Send message.
 *
 * @api public
 */
Message.prototype.send = function(socket, data) {
	socket.emit('speedy', data);
};