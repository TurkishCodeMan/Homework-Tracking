import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

function useSafeDispatch(dispatch) {
    const mounted = useRef(false);
    useLayoutEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])

    return useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch])
}

const defaultInitialState = { status: 'idle', data: null, error: null };

function useAsync(initialState) {
    const initialStateRef =
        useRef({ ...defaultInitialState, ...initialState });
    const [{ status, data, error }, setState] =
        useReducer((s, a) => ({ ...s, ...a }), initialStateRef.current);

    const safeSetState = useSafeDispatch(setState);

    const setData = useCallback((data) => safeSetState({ data, status: 'resolved' }), [safeSetState]);
    const setError = useCallback((error) => safeSetState({ error, status: 'rejected' }), [safeSetState]);
    const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

    const run = useCallback((promise) => {
        if (!promise || !promise.then) {
            throw new Error(`The argument passed to useAsync().run must be a promise.`)
        }
        safeSetState({ status: 'pending' })
        return promise.then(
            data => {
                setData(data);
                return data;
            },
            error => {
                setError(error);
                return Promise.reject(error);
            }
        )
    }, [safeSetState, setData, setError]);

    return {
        // using the same names that react-query uses for convenience
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    }
}

export { useAsync };