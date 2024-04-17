import { useState, useLayoutEffect } from "react";

/**
 * Hook that returns if app is phone size screen.
 *
 * @returns
 */
export const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(true);

  useLayoutEffect(() => {
    const onResize = () => {
      setIsPhone(window.innerWidth <= 700);
    };
    window.addEventListener("resize", onResize);
    onResize;
    return () => window.removeEventListener("resize", onResize);
  }, [setIsPhone]);

  return isPhone;
};
