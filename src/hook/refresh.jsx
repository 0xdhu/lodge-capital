import { useState, useEffect, useRef } from 'react';

function useRefreshHook(interval) {
    const [refreshCount, setRefreshCount] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRefreshCount((prevCount) => {
                return prevCount + 1;
            });
        }, interval);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [interval]);

    return {
        refreshCount,
        forceRefresh: () => {
            setRefreshCount((prevCount) => prevCount + 1);
        }
    }
}

export default useRefreshHook;