import { shallowMount, VueWrapper } from "@vue/test-utils";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";

describe("FormInputNumber.vue", () => {

    let props: any;
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        props = {
            value: 10,
            min: 0,
            max: 100,
            label: "Label",
            placeholder: "Placeholder",
            disabled: false,
            isError: false,
            helperText: "Helper text",
            errorMessage: "Error message",
            copy: true
        };
        wrapper = shallowMount(FormInputNumber, { props });
    });

    it("exists", () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it("renders a fieldset element", () => {
        expect(wrapper.element.tagName).toBe("FIELDSET");
    });

    it("contains an input with type number", () => {
        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.element.type).toBe("number");
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

    it("has a required number \"value\" prop", () => {
        const propType = wrapper.vm.$options.props.value.type.name;
        const propIsRequired = wrapper.vm.$options.props.value.required;

        expect(wrapper.props().value).toBe(props.value);
        expect(propType).toBe("Number");
        expect(propIsRequired).toBeTruthy();
    });

    it("has a number \"min\" prop", () => {
        const propType = wrapper.vm.$options.props.min.type.name;
        const propIsRequired = wrapper.vm.$options.props.min.required;
        const propValidator = wrapper.vm.$options.props.min.validator;
        const propValue = wrapper.props().min;

        expect(propValue).toBe(props.min);
        expect(propType).toBe("Number");
        expect(propIsRequired).toBeFalsy();
        expect(propValidator(propValue)).toBe(true);
    });

    it("has a number \"min\" prop with a validator", async () => {
        const propValidator = wrapper.vm.$options.props.min.validator;

        expect(propValidator(0)).toBe(true);
        expect(propValidator(-2)).toBe(false);
        expect(propValidator(100)).toBe(true);
        expect(propValidator(0.01)).toBe(true);
        expect(propValidator(-0.01)).toBe(false);

    });

    it("has a string \"min\" prop which defaults to \"0\"", async () => {
        const propsWithBadType = {
            ...props,
            min: undefined
        };
        await wrapper.setProps(propsWithBadType);

        const propValidator = wrapper.vm.$options.props.min.validator;
        const propValue = wrapper.props().min;

        expect(propValue).toBe(0);
        expect(propValidator(propValue)).toBe(true);
    });

    it("has a number \"max\" prop", () => {
        const propType = wrapper.vm.$options.props.max.type.name;
        const propIsRequired = wrapper.vm.$options.props.max.required;
        const propValue = wrapper.props().max;

        expect(propValue).toBe(props.max);
        expect(propType).toBe("Number");
        expect(propIsRequired).toBeFalsy();
    });

    it("has a required string \"label\" prop", () => {
        const propType = wrapper.vm.$options.props.label.type.name;
        const propIsRequired = wrapper.vm.$options.props.label.required;

        expect(wrapper.props().label).toBe(props.label);
        expect(propType).toBe("String");
        expect(propIsRequired).toBeTruthy();
    });

    it("has a string \"placeholder\" prop", () => {
        const propType = wrapper.vm.$options.props.placeholder.type.name;
        const propIsRequired = wrapper.vm.$options.props.placeholder.required;

        expect(wrapper.props().placeholder).toBe(props.placeholder);
        expect(propType).toBe("String");
        expect(propIsRequired).toBeFalsy();
    });

    it("has a boolean \"disabled\" prop which defaults to false", async () => {
        const propType = wrapper.vm.$options.props.disabled.type.name;
        const propIsRequired = wrapper.vm.$options.props.disabled.required;

        expect(wrapper.props().disabled).toBe(props.disabled);
        expect(propType).toBe("Boolean");
        expect(propIsRequired).toBeFalsy();

        const propsWithoutDisabled = {
            ...props,
            disabled: undefined
        };

        await wrapper.setProps(propsWithoutDisabled);
        expect(wrapper.props().disabled).toBe(false);
    });

    it("has a boolean \"isError\" prop which defaults to false", async () => {
        const propType = wrapper.vm.$options.props.isError.type.name;
        const propIsRequired = wrapper.vm.$options.props.isError.required;

        expect(wrapper.props().isError).toBe(props.isError);
        expect(propType).toBe("Boolean");
        expect(propIsRequired).toBeFalsy();

        const propsWithoutIsError = {
            ...props,
            isError: undefined
        };

        await wrapper.setProps(propsWithoutIsError);
        expect(wrapper.props().isError).toBe(false);
    });

    it("has a string \"helperText\" prop", () => {
        const propType = wrapper.vm.$options.props.helperText.type.name;
        const propIsRequired = wrapper.vm.$options.props.helperText.required;

        expect(wrapper.props().helperText).toBe(props.helperText);
        expect(propType).toBe("String");
        expect(propIsRequired).toBeFalsy();
    });

    it("has a string \"errorMessage\" prop", () => {
        const propType = wrapper.vm.$options.props.errorMessage.type.name;
        const propIsRequired = wrapper.vm.$options.props.errorMessage.required;

        expect(wrapper.props().errorMessage).toBe(props.errorMessage);
        expect(propType).toBe("String");
        expect(propIsRequired).toBeFalsy();
    });

    it("has a boolean \"copy\" prop", () => {
        const propType = wrapper.vm.$options.props.copy.type.name;
        const propIsRequired = wrapper.vm.$options.props.copy.required;
        const propValue = wrapper.props().copy;

        expect(propValue).toBe(props.copy);
        expect(propType).toBe("Boolean");
        expect(propIsRequired).toBeFalsy();
    });

    it("has a boolean \"copy\" prop which defaults to false", async () => {
        await wrapper.setProps({
            ...props,
            copy: undefined
        });

        expect(wrapper.props().copy).toBe(false);
    });

    it("has a refValue equal to value prop", () => {
        const setupData = wrapper.vm.$options.setup(props);
        expect(setupData.refValue.value).toBe(props.value);
    });

    it("emits a change event", () => {
        wrapper.vm.$emit("change");
        wrapper.vm.$nextTick();

        expect(wrapper.emitted("change")).toBeTruthy();
    });

    it("displays label prop content in label tag", () => {
        const label = wrapper.find("label");
        expect(label.text()).toBe(props.label);
    });

    it("displays an input with its value matching the value prop", () => {
        const input = wrapper.find("input");
        expect(input.element.value).toEqual(`${props.value}`);
    });

    it("displays an input with min and max value equal to props", () => {
        const input = wrapper.find("input");
        expect(input.element.min).toBe(`${props.min}`);
        expect(input.element.max).toBe(`${props.max}`);
    })

    it("displays a placeholder with the placeholder prop value", () => {
        const input = wrapper.find("input");
        expect(input.element.placeholder).toBe(props.placeholder);
    });

    it("disables the input depending on disabled prop", async () => {
        const input = wrapper.find("input");
        expect(input.element.disabled).toBe(props.disabled);

        await wrapper.setProps({
            ...props,
            disabled: !props.disabled
        });
        expect(input.element.disabled).toBe(wrapper.props().disabled);
    });

    it("displays a blank space in the input-helper span if isError is false and input isn't selected", () => {
        const inputHelperSpan = wrapper.find("span.input-helper");
        expect(inputHelperSpan.text()).toBe("");
    });

    it("displays helperText in the input-helper span if isError is false and input is selected", async () => {
        const inputHelperSpan = wrapper.find("span.input-helper");
        await wrapper.find("input").element.focus();
        expect(inputHelperSpan.text()).toBe(props.helperText);
    });

    it("displays errorMessage prop content in the input-helper span if isError is true", async () => {
        await wrapper.setProps({
            ...props,
            isError: true
        });

        const inputHelperSpan = wrapper.find("span.input-helper");
        expect(inputHelperSpan.text()).toBe(props.errorMessage);
    });

    it("doesn't render any button when copy prop is set to false", async () => {
        await wrapper.setProps({
            ...props,
            copy: false
        });
        expect(wrapper.find("button").exists()).toBeFalsy();
    });

    it("renders a button when copy prop is set to true", async () => {
        await wrapper.setProps({
            ...props,
            copy: true
        });
        expect(wrapper.find("button").exists()).toBeTruthy();
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

    it("show normal state when isError prop is false and input isn't selected", async () => {
        await wrapper.setProps({
            ...props,
            isError: false
        });

        const label = wrapper.find("label");
        const inputContainer = wrapper.find(".input-container");
        const input = wrapper.find("input");
        await input.element.blur();
        const helperText = wrapper.find("span.input-helper");

        expect(label.classes()).toContain("text-gray-600");
        expect(inputContainer.classes()).toContain("border-gray-300");
        expect(helperText.classes()).toContain("text-gray-500");
        expect(helperText.text()).toBe("");
    });

    it("show focused state when isError prop is false and input is selected", async () => {
        await wrapper.setProps({
            ...props,
            isError: false
        });

        const label = wrapper.find("label");
        const inputContainer = wrapper.find(".input-container");
        const input = wrapper.find("input");
        await input.element.focus();
        const helperText = wrapper.find("span.input-helper");

        expect(label.classes()).toContain("text-indigo-600");
        expect(inputContainer.classes()).toContain("border-indigo-600");
        expect(helperText.classes()).toContain("text-gray-500");
        expect(helperText.text()).toBe(props.helperText);
    });

    it("copies input content to clipboard when button is clicked", async () => {
        await wrapper.setProps({
            ...props,
            copy: true
        });

        document.execCommand = jest.fn();

        const button = wrapper.find("button");
        await button.element.click();

        expect(document.execCommand).toHaveBeenCalledWith("copy");
    });
});