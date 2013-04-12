/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

module.exports = function handler(app, socket, data) {

	var type = data.body.type;

	// to publish
	if (type == 'publish') {
		var key = socket.session.uid;
		var presence = {
			id = socket.session.cid,
			status = data.body.publish.status,
			client = data.body.publish.client
		};
		app.presence.publish(key, presence);
	}
	// to destory
	else if (type == 'destory') {
		var key = socket.session.uid;
		app.presence.publish(key, null);
	}
	// to subscribe
	else if (type == 'subscribe') {
		var watcher = socket.session.uid,
			presentities = data.body.subscribe;
		// do subscribe
		app.presence.subscribe(watcher, presentities);
		// then notify
		app.presence.query(presentities, function(err, result) {
			if (result) {
				app.message.notify(socket, result);
			}
		});
	}
	// to unsubscribe
	else if (type == 'unsubscribe') {
		var watcher = socket.session.uid;
		app.presence.unsubscribe(watcher);
	}
	// to fetch
	else if (type == 'fetch') {
		var keys = data.body.fetch;
		app.presence.query(keys, function(err, result) {
			if (result) {
				app.message.notify(socket, result);
			}
		});
	}
};