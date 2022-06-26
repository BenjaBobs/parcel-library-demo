/**
 * Some JSDoc describing a {@link Person}
 */
export type Person = {
  gender: string;
  /**
   * JSDoc in the {@link name} of the {@link PErson}
   */
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

/**
 * Provides functions for fetching random people data
 */
export class PeopleService {
  /**
   * Fetches a {@link Person} from https://randomuser.me/
   *
   * @returns A {@link Person}
   */
  static async getPerson() {
    const response: { results: Person[] } = await (
      await fetch(`https://randomuser.me/api/`)
    ).json();

    return response.results[0];
  }
}
