import { CounterButton } from './counter-button';

export default function CounterButtonDocs() {
  return (
    <div>
      This is a counter button with step={2}:{" "}
      <CounterButton initial={0} step={2} />
    </div>
  );
}
