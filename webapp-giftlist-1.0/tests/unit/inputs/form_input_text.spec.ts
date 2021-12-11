import { shallowMount } from "@vue/test-utils";
import FormInputText from "@/components/Inputs/FormInputText.vue";

describe("FormInputText.vue", () => {
    it("exists", () => {
        const wrapper = shallowMount(FormInputText);
        expect(wrapper.exists()).toBeTruthy();
    });

    it("renders a fieldset element", () => {
        const wrapper = shallowMount(FormInputText);
        expect(wrapper.element.tagName).toBe("FIELDSET");
    })
});