import { CounterButton, PeopleService, Person } from 'parcel-demo-lib';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const reactRootElement = document.body.appendChild(
  document.createElement("div")
);
const reactRoot = createRoot(reactRootElement);

reactRoot.render(
  <div>
    <div>
      Counter button: <CounterButton initial={0} step={1} />
    </div>
    <div>
      Person services test button: <PersonServicesTestButton />
    </div>
  </div>
);

function PersonServicesTestButton() {
  const [person, setPerson] = useState<Person>();

  return (
    <button onClick={async () => setPerson(await PeopleService.getPerson())}>
      Person: {person?.name?.first ?? "click to fetch"}
    </button>
  );
}
