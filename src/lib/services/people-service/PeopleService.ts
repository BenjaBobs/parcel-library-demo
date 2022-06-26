export type Person = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

export class PeopleService {
  static async getPerson() {
    const response: { results: Person[] } = await (
      await fetch(`https://randomuser.me/api/`)
    ).json();

    return response.results[0];
  }
}
