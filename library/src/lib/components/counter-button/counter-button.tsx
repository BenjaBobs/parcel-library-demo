import './counter-button.scss';

import { useState } from 'react';

export function CounterButton(props: { initial?: number; step?: number }) {
  const [count, setCount] = useState(props.initial ?? 0);

  return (
    <button
      className="counter-button"
      onClick={() => setCount((x) => x + (props.step ?? 1))}
    >
      Count: {count}
    </button>
  );
}
