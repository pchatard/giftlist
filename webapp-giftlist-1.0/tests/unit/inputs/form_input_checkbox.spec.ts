import { shallowMount } from "@vue/test-utils";
import FormInputCheckbox from "@/components/Inputs/FormInputCheckbox.vue";

describe("FormInputCheckbox.vue", () => {
    it("exists", () => {
        const wrapper = shallowMount(FormInputCheckbox);
        expect(wrapper.exists()).toBeTruthy();
    });
});