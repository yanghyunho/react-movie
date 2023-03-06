import { useEffect } from 'react'

const useOnClickOutsite = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
        //console.log(ref);
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
        handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler])
}

export default useOnClickOutsite;
