import { defineComponent } from "vue";

export default defineComponent({
	name: "TableData",
	props: {
		content: {
			type: String,
		},
	},
});
