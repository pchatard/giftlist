import { shallowMount, VueWrapper } from "@vue/test-utils";
import FormDatePicker from "@/components/Inputs/FormDatePicker.vue";

describe("FormDatePicker.vue", () => {
	let props: any;
	let wrapper: VueWrapper<any>;

	beforeEach(() => {
		props = {
			label: "Label",
			value: "",
			disabled: false,
			isError: false,
			helperText: "Helper text",
			errorMessage: "Error message",
		};
		wrapper = shallowMount(FormDatePicker, { props });
	});

	it("exists", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("renders a FormWrapper component", () => {
		expect(wrapper.findComponent({ name: "FormWrapper" })).toBeTruthy();
	});

	// it("contains an input of type date", () => {
	//     const formWrapper = wrapper.findComponent({ name: "FormWrapper" });
	//     expect(formWrapper.find("input[type=date]").exists()).toBeTruthy();
	// });

	// it("contains a label", () => {
	//     expect(wrapper.find("label").exists()).toBeTruthy();
	// });

	// it("contains an helper text section", () => {
	//     expect(wrapper.find("span.input-helper").exists()).toBeTruthy();
	// });

	it("has props", () => {
		expect(wrapper.props()).toMatchObject(props);
	});

	it("has a required label prop of type String", () => {
		const propType = wrapper.vm.$options.props.label.type.name;
		const propIsRequired = wrapper.vm.$options.props.label.required;
		const propValue = wrapper.props().label;

		expect(propValue).toBe(props.label);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeTruthy();
	});

	it("has a required value prop of type String", () => {
		const propType = wrapper.vm.$options.props.value.type.name;
		const propIsRequired = wrapper.vm.$options.props.value.required;
		const propValue = wrapper.props().value;

		expect(propValue).toBe(props.value);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeTruthy();
	});

	it('has a "value" prop with a validator', async () => {
		const propValidator = wrapper.vm.$options.props.value.validator;

		expect(propValidator("text")).toBe(false);
		expect(propValidator("0000-00-00")).toBe(true);
		expect(propValidator("00-00-0000")).toBe(false);
		expect(propValidator("1234-00-00")).toBe(true);
		expect(propValidator("")).toBe(false);
	});

	it("has a disabled prop of type Boolean", () => {
		const propType = wrapper.vm.$options.props.disabled.type.name;
		const propIsRequired = wrapper.vm.$options.props.disabled.required;
		const propValue = wrapper.props().disabled;

		expect(propValue).toBe(props.disabled);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a string "disabled" prop which defaults to "false"', async () => {
		const propsWithoutDisabled = {
			...props,
			disabled: undefined,
		};
		await wrapper.setProps(propsWithoutDisabled);

		const propValue = wrapper.props().disabled;

		expect(propValue).toBe(false);
	});

	it("has a isError prop of type Boolean", () => {
		const propType = wrapper.vm.$options.props.isError.type.name;
		const propIsRequired = wrapper.vm.$options.props.isError.required;
		const propValue = wrapper.props().isError;

		expect(propValue).toBe(props.isError);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a string "isError" prop which defaults to "false"', async () => {
		const propsWithoutIsError = {
			...props,
			isError: undefined,
		};
		await wrapper.setProps(propsWithoutIsError);

		const propValue = wrapper.props().isError;

		expect(propValue).toBe(false);
	});

	it("has a helperText prop of type String", () => {
		const propType = wrapper.vm.$options.props.helperText.type.name;
		const propIsRequired = wrapper.vm.$options.props.helperText.required;
		const propValue = wrapper.props().helperText;

		expect(propValue).toBe(props.helperText);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});

	it("has a errorMessage label prop of type String", () => {
		const propType = wrapper.vm.$options.props.errorMessage.type.name;
		const propIsRequired = wrapper.vm.$options.props.errorMessage.required;
		const propValue = wrapper.props().errorMessage;

		expect(propValue).toBe(props.errorMessage);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});

	it("has a dateValue ref equal to value prop", () => {
		expect(wrapper.vm.dateValue).toBe(props.value);
	});

	it("emits a change event when dateValue changes", async () => {
		wrapper.vm.dateValue = "2021-12-01";
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("change")).toBeTruthy();
	});

	// it("displays label prop content in label tag", () => {
	//     const label = wrapper.find("label");
	//     expect(label.text()).toBe(props.label);
	// });

	// it("displays an input with its value matching the value prop", () => {
	//     const input = wrapper.find("input");
	//     expect(input.element.value).toBe(props.value);
	// });

	// it("disables the input depending on disabled prop", async () => {
	//     const input = wrapper.find("input");
	//     expect(input.element.disabled).toBe(props.disabled);

	//     await wrapper.setProps({
	//         ...props,
	//         disabled: !props.disabled
	//     });
	//     expect(input.element.disabled).toBe(wrapper.props().disabled);
	// });

	// it("displays a blank space in the input-helper span if isError is false and input isn't selected", () => {
	//     const inputHelperSpan = wrapper.find("span.input-helper");
	//     expect(inputHelperSpan.text()).toBe("");
	// });

	// it("displays helperText in the input-helper span if isError is false and input is selected", async () => {
	//     const inputHelperSpan = wrapper.find("span.input-helper");
	//     await wrapper.find("input").element.focus();
	//     expect(inputHelperSpan.text()).toBe(props.helperText);
	// });

	// it("displays errorMessage prop content in the input-helper span if isError is true", async () => {
	//     await wrapper.setProps({
	//         ...props,
	//         isError: true
	//     });

	//     const inputHelperSpan = wrapper.find("span.input-helper");
	//     expect(inputHelperSpan.text()).toBe(props.errorMessage);
	// });

	// it("show error state when isError prop is true", async () => {
	//     await wrapper.setProps({
	//         ...props,
	//         isError: true,
	//     });

	//     const label = wrapper.find("label");
	//     const inputContainer = wrapper.find(".input-container");
	//     const helperText = wrapper.find("span.input-helper");

	//     expect(label.classes()).toContain("text-red-600");
	//     expect(inputContainer.classes()).toContain("border-red-600");
	//     expect(helperText.classes()).toContain("text-red-600");
	//     expect(helperText.text()).toBe(props.errorMessage);
	// });

	// it("show normal state when isError prop is false and input isn't selected", async () => {
	//     await wrapper.setProps({
	//         ...props,
	//         isError: false
	//     });

	//     const label = wrapper.find("label");
	//     const inputContainer = wrapper.find(".input-container");
	//     const input = wrapper.find("input");
	//     await input.element.blur();
	//     const helperText = wrapper.find("span.input-helper");

	//     expect(label.classes()).toContain("text-gray-600");
	//     expect(inputContainer.classes()).toContain("border-gray-300");
	//     expect(helperText.classes()).toContain("text-gray-500");
	//     expect(helperText.text()).toBe("");
	// });

	// it("show focused state when isError prop is false and input is selected", async () => {
	//     await wrapper.setProps({
	//         ...props,
	//         isError: false
	//     });

	//     const label = wrapper.find("label");
	//     const inputContainer = wrapper.find(".input-container");
	//     const input = wrapper.find("input");
	//     await input.element.focus();
	//     const helperText = wrapper.find("span.input-helper");

	//     expect(label.classes()).toContain("text-indigo-600");
	//     expect(inputContainer.classes()).toContain("border-indigo-600");
	//     expect(helperText.classes()).toContain("text-gray-500");
	//     expect(helperText.text()).toBe(props.helperText);
	// });
});
