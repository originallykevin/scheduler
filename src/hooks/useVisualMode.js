import { useState } from "react";

export default function useVisualMode(initial) {
  // Setting the Initial Mode
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition
  function transition(newMode, replace = false) {

    if (replace) {
      // [1, 2, 3] => [1, 2] newMode = 4 => [1, 2, 4]
      setHistory(prev => {
        prev.pop();
        return [...prev, newMode];
      });
    } else {
      // if replace true, pop, add newMode, set that arr to setHitory
      setHistory(prev => ([...prev, newMode]));
    }
    setMode(newMode);
  }

  // Transition back to previous
  function back() {
    // copy of history array
    const arr = [...history];

    if (history.length > 1) {
      setMode(history[history.length - 2]);
      arr.pop();
      setHistory(arr);
    }
    else {
      setMode(initial); // last item in array
    }
  }

  return {
    mode,
    transition,
    back
  };
};