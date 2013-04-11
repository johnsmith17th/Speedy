/*!
 * Copyright(c) 2013 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;

/**
 * Presence store interface.
 */
function Store () {

}

/**
 * Inherit from EventEmitter.
 */
Stroe.prototype.__proto__ = EventEmitter.prototype;

/**
 * Get presence information.
 * 
 * @param presentity {string} key of presentity
 * @api public
 */
Store.prototype.get = function(presentity, fn) {

};

/**
 * Query information of presentities.
 *
 * @param presentities {array} keys to query
 * @api public
 */
Store.prototype.query = function(presentities, fn) {

};

/**
 * Publish presence information.
 *
 * @param presentity {string} key of presentity
 * @param presence {object}:
 *		- id (string) client/session id
 *		- available (boolean) if the presentity receive messages
 *		- status (string) status of presentity: online, busy, away, hide
 *		- client (string) client type: Android, iPhone, Web, etc.
 *		- agent (string) agent server id
 * @api public
 */
Store.prototype.publish = function(presentity, presence) {

};

/**
 * Unpublish presence information.
 * 
 * @param presentity {string} key of presentity
 * @api public
 */
Store.prototype.unpublish = function(presentity) {

};

/**
 * Subscribe presence.
 * 
 * @param watcher {string} key of watcher
 * @param presentities {array} presentities to watch
 * @api public
 */
Store.prototype.subscribe = function(watcher, presentities) {

};

/**
 * Unsubscribe presence.
 * 
 * @param watcher {string} key of watcher
 * @param presentities {array} presentities to unwatch
 * @api public
 */
Store.prototype.unsubscribe = function(watcher, presentities) {

};

/**
 * Get subscribers of presentity.
 *
 * @param presentity {string} key of presentity
 * @api public
 */
Store.prototype.subscribers = function(presentity, fn) {

};

/**
 * Exports the constructor.
 */
 module.exports = Store;