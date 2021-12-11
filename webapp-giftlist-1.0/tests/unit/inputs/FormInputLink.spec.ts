import { shallowMount } from "@vue/test-utils";
import FormInputLink from "@/components/Inputs/FormInputLink.vue";

describe("FormInputLink.vue", () => {
    it("exists", () => {
        const wrapper = shallowMount(FormInputLink);
        expect(wrapper.exists()).toBeTruthy();
    });
});