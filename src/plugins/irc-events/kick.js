"use strict";

const Chan = require("../../models/chan");
const Msg = require("../../models/msg");

module.exports = function (irc, network) {
	const client = this;

	irc.on("kick", function (data) {
		const chan = network.getChannel(data.channel);

		if (typeof chan === "undefined") {
			return;
		}

		const msg = new Msg({
			type: Msg.Type.KICK,
			time: data.time,
			from: chan.getUser(data.nick),
			target: chan.getUser(data.kicked),
			text: data.message || "",
			highlight: data.kicked === irc.user.nick,
			self: data.nick === irc.user.nick,
		});
		chan.pushMessage(client, msg);

		if (data.kicked === irc.user.nick) {
			chan.users = new Map();
			chan.state = Chan.State.PARTED;

			client.emit("channel:state", {
				chan: chan.id,
				state: chan.state,
			});

			if(client.config.clientSettings.autoRejoin) {
				irc.join(chan.name);
			}
		} else {
			chan.removeUser(msg.target);
		}
	});
};
