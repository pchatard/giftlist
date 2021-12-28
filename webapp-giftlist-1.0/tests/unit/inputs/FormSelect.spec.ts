import { shallowMount, VueWrapper } from "@vue/test-utils";
import FormSelect from "@/components/Inputs/FormSelect.vue";

describe("FormSelect.vue", () => {
	let props: any;
	let wrapper: VueWrapper<any>;

	beforeEach(() => {
		props = {
			value: {},
			options: [],
			label: "",
			helperText: "",
			isError: false,
			errorMessage: "",
			writable: false,
		};
		wrapper = shallowMount(FormSelect, { props });
	});

	it("exists", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("renders a fieldset", () => {
		expect(wrapper.find("fieldset").exists()).toBeTruthy();
	});

	it("renders a Listbox component", () => {
		expect(wrapper.findComponent({ name: "Listbox" }).exists()).toBeTruthy();
	});

	it("has props", () => {
		expect(wrapper.props()).toMatchObject(props);
	});

	it('has a required "value" prop of type object', () => {
		const propType = wrapper.vm.$options.props.value.type.name;
		const propIsRequired = wrapper.vm.$options.props.value.required;

		expect(wrapper.props().value).toStrictEqual(props.value);
		expect(propType).toBe("Object");
		expect(propIsRequired).toBeTruthy();
	});

	it('has a required "options" prop of type List<Object>', () => {
		const propType = wrapper.vm.$options.props.options.type.name;
		const propIsRequired = wrapper.vm.$options.props.options.required;

		expect(wrapper.props().options).toStrictEqual(props.options);
		expect(propType).toBe("Array");
		expect(propIsRequired).toBeTruthy();
	});
	it('has a required "label" prop of type String', () => {
		const propType = wrapper.vm.$options.props.label.type.name;
		const propIsRequired = wrapper.vm.$options.props.label.required;

		expect(wrapper.props().label).toBe(props.label);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeTruthy();
	});
	it('has a "helperText" prop of type String', () => {
		const propType = wrapper.vm.$options.props.helperText.type.name;
		const propIsRequired = wrapper.vm.$options.props.helperText.required;

		expect(wrapper.props().helperText).toBe(props.helperText);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});
	it('has a "isError" prop of type Boolean', () => {
		const propType = wrapper.vm.$options.props.isError.type.name;
		const propIsRequired = wrapper.vm.$options.props.isError.required;

		expect(wrapper.props().isError).toBe(props.isError);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a "isError" prop of type Boolean which defaults to false', async () => {
		const propsWithoutIsError = {
			...props,
			isError: undefined,
		};
		await wrapper.setProps(propsWithoutIsError);

		const propValue = wrapper.props().isError;

		expect(propValue).toBe(false);
	});

	it('has a "errorMessage" prop of type String', () => {
		const propType = wrapper.vm.$options.props.errorMessage.type.name;
		const propIsRequired = wrapper.vm.$options.props.errorMessage.required;

		expect(wrapper.props().errorMessage).toBe(props.errorMessage);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a "writable" prop of type Boolean', () => {
		const propType = wrapper.vm.$options.props.writable.type.name;
		const propIsRequired = wrapper.vm.$options.props.writable.required;

		expect(wrapper.props().writable).toBe(props.writable);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a "writable" prop of type Boolean which defaults to false', async () => {
		const propsWithoutWritable = {
			...props,
			writable: undefined,
		};
		await wrapper.setProps(propsWithoutWritable);

		const propValue = wrapper.props().writable;

		expect(propValue).toBe(false);
	});

	it('has a "selectedOption" ref equal to the "value" prop', () => {
		expect(wrapper.vm.selectedOption).toStrictEqual(props.value);
	});

	it('has a "openWithInput" ref set to false by default', () => {
		expect(wrapper.vm.openWithInput).toStrictEqual(false);
	});

	it('has a "inputSelect" ref equal to the "value.name" prop', () => {
		expect(wrapper.vm.inputSelect).toStrictEqual(props.value.name);
	});

	it('has a "filteredOptions" ref equal to the "options" prop', () => {
		expect(wrapper.vm.filteredOptions).toStrictEqual(props.options);
	});

	describe("openOrHideOptions method", () => {
		it("returns nothing", () => {
			const returnValue = wrapper.vm.openOrHideOptions();
			expect(returnValue).toBeFalsy();
			expect(returnValue).toBeUndefined();
		});

		it('sets "openWithInput"\'s value to true when "inputSelect" is not empty', () => {
			wrapper.vm.inputSelect = "Test";
			wrapper.vm.openOrHideOptions();
			expect(wrapper.vm.openWithInput).toBeTruthy();
			expect(wrapper.vm.openWithInput).toBe(true);
		});

		it('sets "openWithInput"\'s value to false when "inputSelect" is empty', () => {
			wrapper.vm.inputSelect = "";
			wrapper.vm.openOrHideOptions();
			expect(wrapper.vm.openWithInput).toBeFalsy();
			expect(wrapper.vm.openWithInput).toBe(false);
		});
	});

	it("emits a change event when selectedOption changes", async () => {
		wrapper.vm.selectedOption = { name: "new text" };
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("change")).toBeTruthy();
	});
});
