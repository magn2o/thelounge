<template>
	<span
		:class="['user', {active: active}]"
		:style="nickColor"
		:data-name="user.nick"
		role="button"
		v-on="onHover ? {mouseenter: hover} : {}"
		@click.prevent="openContextMenu"
		@contextmenu.prevent="openContextMenu"
		><slot><span class="mode">{{ mode }}</span>{{ user.nick }}</slot></span
	>
</template>

<script>
import eventbus from "../js/eventbus";
import colorClass from "../js/helpers/colorClass";

export default {
	name: "Username",
	props: {
		user: Object,
		active: Boolean,
		onHover: Function,
		channel: Object,
		network: Object,
	},
	computed: {
		mode() {
			// Message objects have a singular mode, but user objects have modes array
			if (this.user.modes) {
				return this.user.modes[0];
			}

			return this.user.mode;
		},
		nickColor() {
			const coloredNicks = parseInt(this.$store.state.settings.coloredNicks);

			if (coloredNicks === 3) {
				return;
			}

			return colorClass(this.user.nick, coloredNicks === 1);
		},
	},
	methods: {
		hover() {
			return this.onHover(this.user);
		},
		openContextMenu(event) {
			eventbus.emit("contextmenu:user", {
				event: event,
				user: this.user,
				network: this.network,
				channel: this.channel,
			});
		},
	},
};
</script>
