import { useState } from 'react';

export function CounterButton(props: { initial: number }) {
  const [count, setCount] = useState(props.initial);

  return (
    <button className="counter-button" onClick={() => setCount((x) => x + 1)}>
      Count: {count}
    </button>
  );
}
