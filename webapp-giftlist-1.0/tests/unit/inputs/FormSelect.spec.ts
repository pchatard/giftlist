import { shallowMount } from "@vue/test-utils";
import FormSelect from "@/components/Inputs/FormSelect.vue";

describe("FormSelect.vue", () => {
    it("exists", () => {
        const wrapper = shallowMount(FormSelect);
        expect(wrapper.exists()).toBeTruthy();
    });
});