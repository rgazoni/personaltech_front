import { useEffect, useRef } from "react";

export const useTimeout = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>(() => { });
  const timeout = useRef<NodeJS.Timeout>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    timeout.current = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(timeout.current);
  }, [delay]);
}

