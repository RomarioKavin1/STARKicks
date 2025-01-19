import { useState, useEffect } from "react";

interface PreGameCountdownProps {
  onComplete: () => void;
}

export function PreGameCountdown({ onComplete }: PreGameCountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-pixel mb-8">GET READY!</h2>
        <div className="text-8xl font-pixel text-yellow-400 animate-pulse">
          {count}
        </div>
      </div>
    </div>
  );
}
