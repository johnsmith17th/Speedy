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

function Store() {

}

/**
 * Inherit from EventEmitter.
 */
Stroe.prototype.__proto__ = EventEmitter.prototype;

/**
 * Get presence information.
 *
 * @param key {string} key of presentity
 * @api public
 */
Store.prototype.get = function(key, fn) {

};

/**
 * Query information of presentities.
 *
 * @param keys {array} keys to query
 * @api public
 */
Store.prototype.query = function(keys, fn) {

};

/**
 * Publish presence information.
 *
 * @param key {string} key of presentity
 * @param presence {object}:
 *		- id (string) client/session id
 *		- available (boolean) if the presentity receive messages
 *		- status (string) status of presentity: online, busy, away, hide
 *		- client (string) client type: Android, iPhone, Web, etc.
 *		- agent (string) agent server id
 * @api public
 */
Store.prototype.publish = function(key, presence, fn) {

};

/**
 * Unpublish presence information.
 *
 * @param key {string} key of presentity
 * @api public
 */
Store.prototype.unpublish = function(key, fn) {

};

/**
 * Subscribe presence.
 *
 * @param watcher {string} key of watcher
 * @param presentities {array} presentities to watch
 * @api public
 */
Store.prototype.subscribe = function(watcher, presentities, fn) {

};

/**
 * Unsubscribe presence.
 *
 * @param watcher {string} key of watcher
 * @api public
 */
Store.prototype.unsubscribe = function(watcher, fn) {

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