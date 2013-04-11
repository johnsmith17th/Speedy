var express = require('express'),
    sio = require('socket.io'),
    http = require('http'),
    crypto = require('crypto'),
    connect = require('express/node_modules/connect'),
    cookie = require('express/node_modules/cookie');

var SessionStore = connect.middleware.session.MemoryStore,
    sessionSec = 'session-sec';

var app = module.exports = express();
var sockets = app.sockets = {};
var sessions = app.sessions = new SessionStore();
var handlers = app.handlers = require('./handler');
var services = app.services = require('../service');