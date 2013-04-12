/*!
 * Copyright(c) 2011 JohnSmith <john.smith.17th@gmail.com>
 * MIT Licensed
 */

module.exports = function handler(app, socket, data) {

	var type = data.body.context,
		to = data.body.to;

	if (type == 'chat' || type == 'invite') {
		app.presence.get(to, function(err, result) {
			if (result) {
				var socket = app.getSocket(result.id);
				app.message.send(socket, data);
			} else {
				app.message.store(data);
			}
		});
	}
};