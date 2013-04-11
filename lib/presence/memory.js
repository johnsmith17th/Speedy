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

function Memory () {
	Stroe.call(this);
};

/**
 * Inherits from Store.
 */
Memory.prototype.__proto__ = Store.prototype;

