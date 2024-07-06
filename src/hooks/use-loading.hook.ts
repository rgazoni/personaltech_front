import { useEffect, useRef, useState } from "react";

export const useLoading = (loading_flag: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const onLoadPage = () => {
      timeout.current = setTimeout(() => {
        if (!loading_flag)
          setIsLoading(false);
      }, 1000);
    };
    onLoadPage();
    return () => clearTimeout(timeout.current);
  }, [loading_flag]);

  return { isLoading, setIsLoading };
}
