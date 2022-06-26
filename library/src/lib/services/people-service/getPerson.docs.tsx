import { useState } from 'react';

import { PeopleService, Person } from './PeopleService';

export default function Overview() {
  const [person, setPerson] = useState<Person>();

  return (
    <>
      <h1>PeopleService.getPerson()</h1>
      <pre>{`<button onClick={async () => setPerson(await PeopleService.getPerson())}>
    Fetch new person
</button>
{person && <pre>{JSON.stringify(person?.name, null, " ")}</pre>}`}</pre>
      <div>
        <button
          onClick={async () => setPerson(await PeopleService.getPerson())}
        >
          Fetch new person
        </button>
        {person && <pre>{JSON.stringify(person?.name, null, " ")}</pre>}
      </div>
    </>
  );
}
