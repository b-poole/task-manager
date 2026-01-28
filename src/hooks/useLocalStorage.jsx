import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        const storedValue = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];

}