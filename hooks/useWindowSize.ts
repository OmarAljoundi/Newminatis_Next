import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [width, setWidth] = useState(0);

  const windowListener = debounce(() => {
    if (window) setWidth(window.innerWidth);
  }, 250);

  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", windowListener);
    }

    return () => {
      windowListener.cancel();
      window && window.removeEventListener("resize", windowListener);
    };
  }, [windowListener]);

  return width;
};

export default useWindowSize;
