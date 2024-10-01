// A utility function to check if the code is running in the browser or not
export const isBrowser = typeof window !== "undefined";

export class LocalStorage {
    // A utility function to get a value from local storage by key
    static get(key) {
        if (!isBrowser) return
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (error) {
                return null;
            }
        }
        return null
    }
    // A utility function to set a value in local storage by key
    static set(key, value) {
        if (!isBrowser) return
        localStorage.setItem(key, JSON.stringify(value));
    }

    // A utility function to remove a value from local storage by key
    static remove(key) {
        if (!isBrowser) return
        localStorage.removeItem(key);
    }

    // A utility function to clear all values from local storage
    static clear() {
        if (!isBrowser) return
        localStorage.clear();
    }
}