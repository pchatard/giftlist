import { shallowMount, VueWrapper } from "@vue/test-utils";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import { SwitchGroup } from "@headlessui/vue";

describe("FormInputToggle.vue", () => {
	let props: any;
	let wrapper: VueWrapper<any>;

	beforeEach(() => {
		props = {
			value: false,
			label: "Label",
			disabled: false,
			helperText: "Helper text",
			inline: false,
		};
		wrapper = shallowMount(FormInputToggle, {
			props,
		});
	});

	it("exists", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("renders a fieldset element", () => {
		expect(wrapper.element.tagName).toBe("FIELDSET");
	});

	it("contains a SwitchGroup component", () => {
		expect(wrapper.findComponent(SwitchGroup).exists()).toBeTruthy();
	});

	it("has props", () => {
		expect(wrapper.props()).toMatchObject(props);
	});

	it('has a required boolean "value" prop', () => {
		const propType = wrapper.vm.$options.props.value.type.name;
		const propIsRequired = wrapper.vm.$options.props.value.required;

		expect(wrapper.props().value).toBe(props.value);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeTruthy();
	});

	it('has a required string "label" prop', () => {
		const propType = wrapper.vm.$options.props.label.type.name;
		const propIsRequired = wrapper.vm.$options.props.label.required;

		expect(wrapper.props().label).toBe(props.label);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeTruthy();
	});

	it('has a boolean "disabled" prop which defaults to false', async () => {
		const propType = wrapper.vm.$options.props.disabled.type.name;
		const propIsRequired = wrapper.vm.$options.props.disabled.required;

		expect(wrapper.props().disabled).toBe(props.disabled);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();

		const propsWithoutDisabled = {
			...props,
			disabled: undefined,
		};

		await wrapper.setProps(propsWithoutDisabled);
		expect(wrapper.props().disabled).toBe(false);
	});

	it('has a string "helperText" prop', () => {
		const propType = wrapper.vm.$options.props.helperText.type.name;
		const propIsRequired = wrapper.vm.$options.props.helperText.required;

		expect(wrapper.props().helperText).toBe(props.helperText);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a boolean "inline" prop which defaults to false', async () => {
		const propType = wrapper.vm.$options.props.inline.type.name;
		const propIsRequired = wrapper.vm.$options.props.inline.required;

		expect(wrapper.props().inline).toBe(props.inline);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();

		const propsWithoutInline = {
			...props,
			inline: undefined,
		};

		await wrapper.setProps(propsWithoutInline);
		expect(wrapper.props().inline).toBe(false);
	});

	it("has a refValue equal to value prop", () => {
		expect(wrapper.vm.refValue).toBe(props.value);
	});

	it("emits a change event when refValue changes", async () => {
		wrapper.vm.refValue = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("change")).toBeTruthy();
	});
});
