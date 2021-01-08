import { mount } from '@vue/test-utils';
import UserForm from '@/components/UserForm.vue';

describe('Logo', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(UserForm);
        expect(wrapper.vm).toBeTruthy();
    });
});
