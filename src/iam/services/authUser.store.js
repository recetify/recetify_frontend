import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('authUser', {
    state: () => ({
        userId: null, // El valor por defecto para userId
    }),
    getters: {
        getUserId(state) {
            return state.userId; // Lógica para obtener el userId
        },
    },
    actions: {
        setUserId(userId) {
            this.userId = userId; // Establece el userId en el estado
        },
    },
});
