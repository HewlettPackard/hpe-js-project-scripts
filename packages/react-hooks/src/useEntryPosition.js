import { useState, useEffect } from 'react';
import { buildThresholdArray } from './utils';
import useIntersect from './useIntersection';

// These values respond better outside of the scope of
// the component. Until React has a better way to
// batch state updates this may be necessary.
// TODO: figure out if this is best practice.
let prevTop = 0;

const POSITION_STATUS = {
  LEAVING: 'leaving',
  ENTERING: 'entering',
  VISIBLE: 'visible',
};

const SCROLL_DIRECTION = {
  UP: 'up',
  DOWN: 'down',
};

export const useEntryPosition = () => {
  const [setEntry, entryObserver] = useIntersect({
    threshold: buildThresholdArray(),
  });
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [target, setTarget] = useState();
  const [entryPos, setEntryPos] = useState({
    elementIs: undefined,
    direction: undefined,
  });
  const [onScroll, setOnScroll] = useState();

  const handleScroll = () => {
    // Setting a function to state requires an extra return.
    const { top, bottom } = entryObserver.target.getBoundingClientRect();
    let direction;
    let elementIs;

    if (top < prevTop || prevTop === 0) {
      direction = SCROLL_DIRECTION.DOWN;
    } else if (top > prevTop) {
      direction = SCROLL_DIRECTION.UP;
    }

    if (top < 0) {
      if (direction === SCROLL_DIRECTION.DOWN) {
        elementIs = POSITION_STATUS.LEAVING;
      }
      if (direction === SCROLL_DIRECTION.UP) {
        elementIs = POSITION_STATUS.ENTERING;
      }
    }

    if (bottom > window.innerHeight) {
      if (direction === SCROLL_DIRECTION.DOWN) {
        elementIs = POSITION_STATUS.ENTERING;
      }
      if (direction === SCROLL_DIRECTION.UP) {
        elementIs = POSITION_STATUS.LEAVING;
      }
    }

    // TODO: add coverage for elements thats are taller than
    // TODO: the browser height.
    if (top > 0 && bottom < window.innerHeight) {
      elementIs = POSITION_STATUS.VISIBLE;
    }

    prevTop = top;
    setEntryPos({ direction, elementIs });
  };

  useEffect(() => {
    if (!target && entryObserver.target) {
      setTarget(entryObserver.target);
      // Trigger single event for initial render.
      handleScroll();
      // Store scroll handler in state so we can keep track
      // of it to remove later.
      setOnScroll(() => handleScroll);
    }

    if (entryObserver.isIntersecting && target && onScroll) {
      document.addEventListener('scroll', onScroll);
    }

    if (!entryObserver.isIntersecting && target) {
      document.removeEventListener('scroll', onScroll);
    }

    if (entryObserver.intersectionRatio !== intersectionRatio) {
      setIntersectionRatio(entryObserver.intersectionRatio);
      // Re-attach scroll listener to remove stale React state data.
      setOnScroll(() => handleScroll);
    }

    // 🧹 Clean up when we're done.
    return () => document.removeEventListener('scroll', onScroll);
  }, [onScroll, target, entryObserver, intersectionRatio]); // eslint-disable-line react-hooks/exhaustive-deps

  return [setEntry, entryPos, entryObserver];
};

export default useEntryPosition;
