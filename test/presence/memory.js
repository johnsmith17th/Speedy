var Memory = require('../../lib/presence/memory');

var store = new Memory();

store.on('present', function(presentity, presence) {
	console.log('presentity: %s', presentity);
	console.log('presence: %j', presence);
});

module.exports.test = {

	setUp: function(callback) {
		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	'publish johnsmith': function(test) {
		var p = {
			id: 'a',
			status: 'online',
			client: 'test'
		};
		store.publish('johnsmith', p, function() {
			console.log(store.prs);
			test.expect(1);
			test.equal(1, Object.keys(store.prs).length);
			test.done();
		});
	},

	'get johnsmith': function(test) {
		store.get('johnsmith', function(e, r) {
			console.log(r);
			test.expect(1);
			test.notEqual(null, r);
			test.done();
		});
	},

	'get nothing': function(test) {
		store.get('nobody', function(e, r) {
			console.log(r);
			test.expect(1);
			test.equal(null, r);
			test.done();
		});
	},

	'publish jackfrost': function(test) {
		var p = {
			id: 'b',
			status: 'online',
			client: 'test'
		};
		store.publish('jackfrost', p, function() {
			console.log(store.prs);
			test.expect(1);
			test.equal(2, Object.keys(store.prs).length);
			test.done();
		});
	},

	'publish easterbunny': function(test) {
		var p = {
			id: 'c',
			status: 'online',
			client: 'test'
		};
		store.publish('easterbunny', p, function() {
			console.log(store.prs);
			test.expect(1);
			test.equal(3, Object.keys(store.prs).length);
			test.done();
		});
	},

	'publish nobody': function(test) {
		var p = {
			id: 'd',
			status: 'online',
			client: 'test'
		};
		store.publish('nobody', p, function() {
			console.log(store.prs);
			test.expect(1);
			test.equal(4, Object.keys(store.prs).length);
			test.done();
		});
	},

	'unpublish nobody': function(test) {
		store.publish('nobody', null, function() {
			console.log(store.prs);
			test.expect(1);
			test.equal(3, Object.keys(store.prs).length);
			test.done();
		});
	},

	'query': function(test) {
		store.query(['johnsmith', 'jackfrost', 'easterbunny', 'someoneelse'], function(e, r) {
			console.log(r);
			test.expect(1);
			test.equal(3, r.length);
			test.done();
		});
	},

	'subscribe': function(test) {
		store.subscribe('johnsmith', ['jackfrost', 'easterbunny'], function() {
			console.log(store.sub);
			console.log(store.wat);
			test.expect(3);
			test.equal(2, store.wat['johnsmith'].length);
			test.equal(true, store.sub['jackfrost']['johnsmith']);
			test.equal(true, store.sub['easterbunny']['johnsmith']);
			test.done();
		});
	},

	'subscribe again': function(test) {
		store.subscribe('jackfrost', ['johnsmith', 'easterbunny'], function() {
			console.log(store.sub);
			console.log(store.wat);
			test.expect(3);
			test.equal(2, store.wat['jackfrost'].length);
			test.equal(true, store.sub['johnsmith']['jackfrost']);
			test.equal(true, store.sub['easterbunny']['jackfrost']);
			test.done();
		});
	},

	'subscribers': function(test) {
		store.subscribers('easterbunny', function(e, r) {
			console.log(r);
			test.expect(1);
			test.equal(2, r.length);
			test.done();
		});
	},

	'subscribe replace': function(test) {
		store.subscribe('johnsmith', ['user1', 'user2'], function() {
			console.log(store.sub);
			console.log(store.wat);
			test.expect(5);
			test.equal(2, store.wat['johnsmith'].length);
			test.equal(undefined, store.sub['jackfrost']['johnsmith']);
			test.equal(undefined, store.sub['easterbunny']['johnsmith']);
			test.equal(true, store.sub['user1']['johnsmith']);
			test.equal(true, store.sub['user2']['johnsmith']);
			test.done();
		});
	},

	'unsubscribe': function(test) {
		store.unsubscribe('johnsmith', function() {
			console.log(store.sub);
			console.log(store.wat);
			test.expect(3);
			test.equal(undefined, store.wat['johnsmith']);
			test.equal(undefined, store.sub['user1']['johnsmith']);
			test.equal(undefined, store.sub['user2']['johnsmith']);
			test.done();
		});
	},

	'unsubscribe nobody': function(test) {
		store.unsubscribe('nobody', function() {
			console.log(store.sub);
			console.log(store.wat);
			test.expect(1);
			test.equal(undefined, store.wat['nobody']);
			test.done();
		});
	}

}