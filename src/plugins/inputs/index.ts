import Client from "../../client";
import Chan, {Channel} from "../../models/chan";
import Network, {NetworkWithIrcFramework} from "../../models/network";

export type PluginInputHandler = (
	this: Client,
	network: NetworkWithIrcFramework,
	chan: Channel,
	cmd: string,
	args: string[]
) => void;

type Plugin = {
	commands: string[];
	input: (network: Network, chan: Chan, cmd: string, args: string[]) => void;
	allowDisconnected?: boolean | undefined;
};

const clientSideCommands = ["/collapse", "/expand", "/search"];

const passThroughCommands = [
	"/as",
	"/bs",
	"/cs",
	"/ho",
	"/hs",
	"/join",
	"/ms",
	"/ns",
	"/os",
	"/rs",
];

const userInputs = new Map<string, Plugin>();
const builtInInputs = [
	"action",
	"away",
	"ban",
	"connect",
	"ctcp",
	"disconnect",
	"ignore",
	"invite",
	"kick",
	"kill",
	"list",
	"mode",
	"msg",
	"nick",
	"notice",
	"part",
	"quit",
	"raw",
	"rejoin",
	"topic",
	"whois",
	"mute",
];

for (const input of builtInInputs) {
	import(`./${input}`).then(
		(plugin: {
			default: {
				commands: string[];
				input: (network: Network, chan: Chan, cmd: string, args: string[]) => void;
				allowDisconnected?: boolean;
			};
		}) => {
			plugin.default.commands.forEach((command: string) =>
				userInputs.set(command, plugin.default)
			);
		}
	);
}

// .reduce(async function (plugins, name) {
// 	return import(`./${name}`).then(
// 		(plugin: {
// 			default: {
// 				commands: string[];
// 				input: (network: Network, chan: Chan, cmd: string, args: string[]) => void;
// 				allowDisconnected?: boolean;
// 			};
// 		}) => {
// 			plugin.default.commands.forEach((command: string) => plugins.set(command, plugin));
// 		}
// 	);
// }, Promise.resolve(new Map()));

const pluginCommands = new Map();

const getCommands = () =>
	Array.from(userInputs.keys())
		.concat(Array.from(pluginCommands.keys()))
		.map((command) => `/${command}`)
		.concat(clientSideCommands)
		.concat(passThroughCommands)
		.sort();

const addPluginCommand = (packageInfo, command, func) => {
	func.packageInfo = packageInfo;
	pluginCommands.set(command, func);
};

export default {
	addPluginCommand,
	getCommands,
	pluginCommands,
	userInputs,
};
