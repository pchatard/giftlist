import { defineComponent } from 'vue';

export default defineComponent({
	name: "NavbarItem",
	props: {
		path: String,
		text: String,
		outline: Boolean,
	},
});
