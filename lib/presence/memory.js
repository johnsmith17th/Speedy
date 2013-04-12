/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var Store = require('./store');

/**
 * Memory store.
 *
 * @api public
 */
function Memory() {
	Stroe.call(this);
	this.prs = {}; // presence information
	this.sub = {}; // subscribers of presentity
	this.wat = {}; // presentity watch
};


/**
 * Inherits from Store.
 */
Memory.prototype.__proto__ = Store.prototype;

/**
 * Get presence information.
 *
 * @api public
 */
Memory.prototype.get = function(key, fn) {
	fn(null, this.prs[key] === undefined ? null : this.prs[key]);
	return this;
};

/**
 * Query information of presentities.
 *
 * @api public
 */
Memory.prototype.query = function(keys, fn) {
	var result = [],
		key;
	if (Array.isArray(keys)) {
		for (var i in keys) {
			key = keys[i];
			if (this.prs[key]) {
				result.push(this.prs[key]);
			};
		};
	}
	fn(null, result);
	return this;
};

/**
 * Publish presence information.
 * Set presence to null to unpublish.
 *
 * @api public
 */
Memory.prototype.publish = function(key, presence, fn) {
	if (presence) {
		this.prs[key] = presence;
	} else {
		delete this.prs[key];
	}	
	this.emit('present', key, presence);
	fn && fn(null);
	return this;
};

/**
 * Subscribe presence.
 *
 * @api public
 */
Memory.prototype.subscribe = function(watcher, presentities, fn) {
	this.unsubscribe(watcher);
	if (Array.isArray(presentities)) {
		this.wat[watcher] = presentities;
		var key;
		for (var i in presentities) {
			key = presentities[i];
			if (this.sub[key] === undefined) {
				this.sub[key] = {};
			};
			this.sub[key][watcher] = true;
		};
	};
	fn && fn(null);
	return this;
};

/**
 * Unsubscribe presence.
 *
 * @api public
 */
Memory.prototype.unsubscribe = function(watcher, fn) {
	var presentities = this.wat[watcher];
	if (Array.isArray(presentities)) {
		var key;
		for (var i in presentities) {
			key = presentities[i];
			if (this.sub[key] && this.sub[key][watcher]) {
				delete this.sub[key][watcher];
			};
		};
	};
	fn && fn(null);
	return this;
};

/**
 * Get subscribers of presentity.
 *
 * @api public
 */
Memory.prototype.subscribers = function(presentity, fn) {
	fn(null, this.sub[presentity] ? Object.keys(this.sub[presentity]) : []);
	return this;
};

/**
 * Exports the constructor.
 */
module.exports = Memory;