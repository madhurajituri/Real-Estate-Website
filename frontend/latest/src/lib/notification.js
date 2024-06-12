import { create } from 'zustand'
import apirequest from './apirequest'

export const useNotificationStore = create((set) => ({
    number: 0,
    fetch: async () => {
        const res = await apirequest("user/notification");
        set({ number: res.data });
    },
    decrease: () => {
        set((prev) => ({ number: prev.number - 1 }))
    },
    reset: () => { 
        set({ number: 0 }) 
    }
}))