import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMobileChange = (e: any) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);
  return { isMobile };
};
