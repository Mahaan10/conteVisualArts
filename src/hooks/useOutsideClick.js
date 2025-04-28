import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function clickHandler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", clickHandler, listenCapturing);

    return () =>
      document.removeEventListener("click", clickHandler, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
