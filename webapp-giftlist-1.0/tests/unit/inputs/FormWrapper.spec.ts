import { shallowMount, VueWrapper } from "@vue/test-utils";
import FormWrapper from "@/components/Inputs/FormWrapper.vue";

describe("FormWrapper.vue", () => {
	let props: any;
	let wrapper: VueWrapper<any>;

	beforeEach(() => {
		props = {
			label: "Label",
			isError: false,
			helperText: "Helper text",
			errorMessage: "Error message",
			copied: false,
			selected: false,
		};
		wrapper = shallowMount(FormWrapper, { props });
	});

	it("exists", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("renders a fieldset element", () => {
		expect(wrapper.find("fieldset")).toBeTruthy();
	});

	it("contains a label", () => {
		expect(wrapper.find("label").exists()).toBeTruthy();
	});

	it("contains an helper text section", () => {
		expect(wrapper.find("span.input-helper").exists()).toBeTruthy();
	});

	it("has props", () => {
		expect(wrapper.props()).toMatchObject(props);
	});

	it('has a required string "label" prop', () => {
		const propType = wrapper.vm.$options.props.label.type.name;
		const propIsRequired = wrapper.vm.$options.props.label.required;

		expect(wrapper.props().label).toBe(props.label);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeTruthy();
	});

	it('has a boolean "isError" prop which defaults to false', async () => {
		const propType = wrapper.vm.$options.props.isError.type.name;
		const propIsRequired = wrapper.vm.$options.props.isError.required;

		expect(wrapper.props().isError).toBe(props.isError);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();

		const propsWithoutIsError = {
			...props,
			isError: undefined,
		};

		await wrapper.setProps(propsWithoutIsError);
		expect(wrapper.props().isError).toBe(false);
	});

	it('has a string "helperText" prop', () => {
		const propType = wrapper.vm.$options.props.helperText.type.name;
		const propIsRequired = wrapper.vm.$options.props.helperText.required;

		expect(wrapper.props().helperText).toBe(props.helperText);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a string "errorMessage" prop', () => {
		const propType = wrapper.vm.$options.props.errorMessage.type.name;
		const propIsRequired = wrapper.vm.$options.props.errorMessage.required;

		expect(wrapper.props().errorMessage).toBe(props.errorMessage);
		expect(propType).toBe("String");
		expect(propIsRequired).toBeFalsy();
	});

	it('has a boolean "copied" prop', () => {
		const propType = wrapper.vm.$options.props.copied.type.name;
		const propIsRequired = wrapper.vm.$options.props.copied.required;
		const propValue = wrapper.props().copied;

		expect(propValue).toBe(props.copied);
		expect(propType).toBe("Boolean");
		expect(propIsRequired).toBeFalsy();
	});

	it("displays label prop content in label tag", () => {
		const label = wrapper.find("label");
		expect(label.text()).toBe(props.label);
	});

	it("displays a blank space in the input-helper span if isError is false and input isn't selected", () => {
		const inputHelperSpan = wrapper.find("span.input-helper");
		expect(inputHelperSpan.text()).toBe("");
	});

	it("displays helperText in the input-helper span if isError is false and input is selected", async () => {
		const inputHelperSpan = wrapper.find("span.input-helper");
		await wrapper.setProps({
			...props,
			selected: true,
		});
		expect(inputHelperSpan.text()).toBe(props.helperText);
	});

	it("displays errorMessage prop content in the input-helper span if isError is true", async () => {
		await wrapper.setProps({
			...props,
			isError: true,
		});

		const inputHelperSpan = wrapper.find("span.input-helper");
		expect(inputHelperSpan.text()).toBe(props.errorMessage);
	});

	it("show error state when isError prop is true", async () => {
		await wrapper.setProps({
			...props,
			isError: true,
		});

		const label = wrapper.find("label");
		const inputContainer = wrapper.find(".input-container");
		const helperText = wrapper.find("span.input-helper");

		expect(label.classes()).toContain("text-red-600");
		expect(inputContainer.classes()).toContain("border-red-600");
		expect(helperText.classes()).toContain("text-red-600");
		expect(helperText.text()).toBe(props.errorMessage);
	});

	it("show normal state when isError prop is false selected is false", async () => {
		await wrapper.setProps({
			...props,
			isError: false,
			selected: false,
		});

		const label = wrapper.find("label");
		const inputContainer = wrapper.find(".input-container");
		const helperText = wrapper.find("span.input-helper");

		expect(label.classes()).toContain("text-gray-600");
		expect(inputContainer.classes()).toContain("border-gray-300");
		expect(helperText.classes()).toContain("text-gray-500");
		expect(helperText.text()).toBe("");
	});

	it("show focused state when isError prop is false and input is selected", async () => {
		await wrapper.setProps({
			...props,
			isError: false,
			selected: true,
		});

		const label = wrapper.find("label");
		const inputContainer = wrapper.find(".input-container");
		const helperText = wrapper.find("span.input-helper");

		expect(label.classes()).toContain("text-indigo-600");
		expect(inputContainer.classes()).toContain("border-indigo-600");
		expect(helperText.classes()).toContain("text-gray-500");
		expect(helperText.text()).toBe(props.helperText);
	});
});
