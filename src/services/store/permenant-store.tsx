import { create } from 'zustand'

interface StoreType {
    auth: {
        loginUsername: string;
        loginPassword: string;
    };
    setPermenantAuth: (auth: StoreType['auth']) => void;
}

const usePermenantStore = create<StoreType>((set) => ({
    auth: {
        loginUsername: '',
        loginPassword: '',
    },
    setPermenantAuth: (auth) => set({ auth }),
}))

export default usePermenantStore;