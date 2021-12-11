import { shallowMount } from "@vue/test-utils";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";

describe("FormInputNumber.vue", () => {
    it("exists", () => {
        const wrapper = shallowMount(FormInputNumber);
        expect(wrapper.exists()).toBeTruthy();
    });
});