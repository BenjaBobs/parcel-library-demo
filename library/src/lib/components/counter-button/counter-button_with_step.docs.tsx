import { CounterButton } from './counter-button';

export default function CounterButtonDocs() {
  return (
    <div>
      This is a counter button with custom step
      <div>
        <pre>{`<CounterButton initial={0} step={2} />`}</pre>
      </div>
      <CounterButton initial={0} step={2} />
    </div>
  );
}
