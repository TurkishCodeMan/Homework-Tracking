import React from "react";

function useLocalStorage(
    key,
    initialValue,
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
    const prevKeyRef = React.useRef(key);
    const [state, setState] = React.useState(get());

    function get() {
        const storagedValue = localStorage.getItem(key);
        if (storagedValue) {
            try {
                return deserialize(storagedValue);
            } catch (error) {
                localStorage.removeItem(key)
            }
        }
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    }


    React.useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== key) {
            localStorage.removeItem(prevKey)
        }
        prevKeyRef.current = key;
        localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])

    return [state, setState]
}

export { useLocalStorage }