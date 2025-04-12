import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiGetCurrentUser } from '../apis/user';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            access_token: null,
            hasHydrated: false,

            setUser: (user, access_token) =>
                set({
                    user,
                    access_token,
                    isLoggedIn: !!user,
                }),

            logout: () =>
                set({
                    user: null,
                    access_token: null,
                    isLoggedIn: false,
                }),

            setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),

            // fetchUser: async () => {
            //     const response = await apiGetCurrentUser()
            //     if (response.statusCode === 200) {
            //         const userData = response?.data?.user;
            //         set({ user: userData, isLoggedIn: !!userData });
            //     } else {
            //         set({ user: null, isLoggedIn: false });
            //     }
            // },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                access_token: state.access_token,
                isLoggedIn: state.isLoggedIn,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (!error && state) {
                    state.setHasHydrated(true);
                }
            },
        }
    )
);