import { useState } from 'react';

import { PeopleService, Person } from './PeopleService';

export default function Overview() {
  return (
    <>
      <h1>People service</h1>
      <div>
        <MyComp />
      </div>
    </>
  );
}

function MyComp() {
  const [person, setPerson] = useState<Person>();

  return (
    <button onClick={async () => setPerson(await PeopleService.getPerson())}>
      Person: {person?.name?.first ?? "click to fetch"}
    </button>
  );
}
