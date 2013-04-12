/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var Store = require('./store'),
	Memory = require('./memory'),
	errors = require('../error'),
	EventEmitter = require('events').EventEmitter;

/**
 * Presence service.
 *
 * @param app {object} application context
 * @param store {Store} presence store interface
 * @api public
 */
function Presence(app, store) {
	this.app = app;
	this.store = store;

	// user memory store as default
	if (!(this.store instanceof Store)) {
		this.store = new Memory();
	}

	// exports the store interfaces
	this.get = this.store.get;
	this.query = this.store.query;
	this.publish = this.store.publish;
	this.subscribe = this.store.subscribe;
	this.unsubscribe = this.store.unsubscribe;
	this.subscribers = this.store.subscribers;

	// Handle present event.
	// calling publish() of store will trigger a present event
	// to notify the subscribers of presentity that presence has been changed
	this.store.on('present', function(presentity, presence) {
		this.subscribers(presentity, function(err, result) {
			if (result && result.length) {
				var key;
				for (var i in result) {
					key = result[1];
					this.emit('notify', key, presentity, presence);
				};
			}
		});
	});

	// handle notify event
	// find the socket connection of subscriber
	// and send the presence notification to client via the socket
	// ignoring the message format
	// this will call app.message.notify() to send the message
	this.on('notify', function(subscriber, presentity, presence) {
		this.get(subscriber, function(err, result) {
			if (result && result.id) {
				var socket = this.app.getSocket(result.id);
				if (socket) {
					var data = {
						uid: presentity
					};
					if (presence) {
						data.available = true;
						data.status = presence.status;
						data.client = presence.client;
					} else {
						data.available = false;
					}
					this.app.message.notify(socket, data);
				}
			}
		});
	});
}

/**
 * Inherit from EventEmitter.
 */
Presence.prototype.__proto__ = EventEmitter.prototype;

/**
 * Exports the constructor.
 */
module.exports = Presence;