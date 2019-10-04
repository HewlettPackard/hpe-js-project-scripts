import { useState, useEffect, useRef } from 'react';

export const useIntersection = ({
  root = null, // defaults to viewport when null.
  rootMargin, // expands or contracts the intersection root hit area
  threshold = 0, // intersection ratio value, also accepts arrays
  repeats = true,
  debug = false,
} = {}) => {
  const [observerEntry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new window.IntersectionObserver(
      ([currEntry]) => {
        if (debug) console.log(currEntry); // eslint-disable-line no-console
        // Only trigger once if repeat option is false
        if (!repeats && currEntry.isIntersecting) {
          // Pull the observer after the event fires
          observer.current.disconnect();
          updateEntry(currEntry);
        }
        if (repeats) {
          updateEntry(currEntry);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    ),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [
    setNode, // Sets dom node to watch, expects a ref
    observerEntry, // Intersection observer entry output
  ];
};

export default useIntersection;
