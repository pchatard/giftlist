import { Module } from "vuex";
import { RootState } from ".";

const managementToken = process.env.VUE_APP_AUTH0_MANAGEMENT_API_TOKEN;

export const preferences: Module<PreferencesState, RootState> = {
    state: () => ({
        displayList: undefined,
        bookingShowOthers: undefined,
    }),
    mutations: {
        SET_PREFERENCES: (state, preferences: PreferencesState) => {
            state.displayList = preferences.displayList;
            state.bookingShowOthers = preferences.bookingShowOthers;
        },
    },
    actions: {
        async initializePreferences(context, userId: string) {
            return new Promise<PreferencesState>((resolve, reject) => {
                fetch(
                    "https://giftlist-app.eu.auth0.com/api/v2/users/" +
                    userId +
                    "?fields=user_metadata",
                    {
                        headers: {
                            Authorization: `Bearer ${managementToken}`,
                        },
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((userMetadataResponse) => {
                        context.commit("SET_PREFERENCES", userMetadataResponse.user_metadata);
                        resolve(context.state);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        changePreferences(context, metadata) {
            context.commit("SET_PREFERENCES", metadata);
        },
        async changePreferencesWithSave(context, metadataPayload) {
            context.dispatch("changePreferences", metadataPayload.metadata);
            return context.dispatch("savePreferences", metadataPayload.userId);
        },
        async savePreferences(context, userId: string) {
            return new Promise<PreferencesState>((resolve, reject) => {
                fetch("https://giftlist-app.eu.auth0.com/api/v2/users/" + userId, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${managementToken}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ user_metadata: context.state }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((updatedUser) => {
                        context.commit("SET_PREFERENCES", updatedUser.user_metadata);
                        resolve(context.state);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
};

export interface PreferencesState {
    displayList?: boolean;
    bookingShowOthers?: boolean;
}

export interface PreferencesPayload {
    userId: string,
    metadata: {
        user_metadata: PreferencesState
    }
}