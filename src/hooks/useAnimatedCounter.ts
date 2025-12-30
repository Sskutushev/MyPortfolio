import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  trigger?: boolean; // New prop to control when to start animation
}

export const useAnimatedCounter = ({
  from = 0,
  to,
  duration = 2000,
  trigger = true,
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(from);
  const [isCounting, setIsCounting] = useState(false);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(from);

  useEffect(() => {
    if (!trigger) return; // Only start if trigger is true

    const startCounter = () => {
      setIsCounting(true);
      startTimeRef.current = performance.now();
      startValueRef.current = from;
      setCount(from);
    };

    startCounter();

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [from, trigger]);

  useEffect(() => {
    if (!isCounting || !trigger) return;

    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time;
      }

      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const currentValue =
        startValueRef.current + (to - startValueRef.current) * easeOut;

      setCount(Math.floor(currentValue));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(
          animate,
        ) as unknown as number;
      } else {
        setCount(to);
        setIsCounting(false);
      }
    };

    requestRef.current = requestAnimationFrame(animate) as unknown as number;

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isCounting, to, duration, trigger]);

  return count;
};
