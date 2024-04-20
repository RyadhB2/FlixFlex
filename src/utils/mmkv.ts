import { MMKV } from "react-native-mmkv";
import { Storage } from "redux-persist";

const MMKVstorage = new MMKV()

export const reduxStorage: Storage = {
    setItem: (key, value) => {
        MMKVstorage.set(key, value);
        return Promise.resolve(true);
    },
    getItem: (key) => {
        const value = MMKVstorage.getString(key);
        return Promise.resolve(value);
    },
    removeItem: (key) => {
        MMKVstorage.delete(key);
        return Promise.resolve();
    },
};

export default MMKVstorage