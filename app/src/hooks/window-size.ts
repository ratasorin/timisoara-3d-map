import { useState, useEffect, useCallback } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0,
    });
  }, []);

  useEffect(() => {
    if (window === undefined) return;

    window.addEventListener("resize", handleSize);
    handleSize();
  }, [handleSize]);

  return windowSize;
};
