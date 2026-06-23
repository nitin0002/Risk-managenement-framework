import { useState, useEffect, useRef } from 'react';

export function useCountUp(targets, duration = 1400) {
  const [values, setValues] = useState(
    () => Object.fromEntries(Object.keys(targets).map(k => [k, 0]))
  );
  const rafRef = useRef();

  useEffect(() => {
    const ease = x => 1 - Math.pow(1 - x, 3);
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / duration);
      const e = ease(p);
      setValues(
        Object.fromEntries(Object.keys(targets).map(k => [k, Math.round(targets[k] * e)]))
      );
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return values;
}
