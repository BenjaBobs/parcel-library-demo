import { CounterButton } from './counter-button';

export default function CounterButtonDocs() {
  return (
    <div>
      This is a counter button:
      <div>
        <pre>{`<CounterButton initial={0} />`}</pre>
      </div>
      <div>
        <CounterButton initial={0} />
      </div>
    </div>
  );
}
