import { User } from '@/types/User';
import { ActionContext, ActionPayload, Module } from 'vuex';
import { RootState } from '.';

const endpoint = `${process.env.API_URL}/api/auth`;

export const auth: Module<AuthState, RootState> = {
    state: () => ({
        loggedIn: false,
        user: undefined,
    }),
    getters: {},
    mutations: {
        SET_USER(_state, _user: User) {
            console.log('Set user - Mutation');
        },
        CLEAR_USER(_state) {
            console.log('Clear user - Mutation');
        },
        SET_LOGGED_STATUS(_state, _loggedIn: boolean) {
            console.log('Set loggedIn status - Mutation');
        },
    },
    actions: {
        async login(
            _context: ActionContext<AuthState, RootState>,
            _payload: ActionPayload
        ) {
            console.log('Login - Action');
        },
        async logout(
            _context: ActionContext<AuthState, RootState>,
            _payload: ActionPayload
        ) {
            console.log('Logout - Action');
        },
        async register(
            _context: ActionContext<AuthState, RootState>,
            _payload: ActionPayload
        ) {
            console.log('Register - Action');
        },
        async getUser(
            _context: ActionContext<AuthState, RootState>,
            _payload: ActionPayload
        ) {
            console.log('Get user - Action');
        },
    },
};

export interface AuthState {
    loggedIn: boolean;
    user?: User;
}
