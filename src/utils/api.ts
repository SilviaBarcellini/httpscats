//import { createElement } from "typescript";

//get single character
//api data is listed ... every li has a value on the card
export type APICAT = {
  id: number;
  name: number;
  status: string;
  image: string;
  url: string;
};

//get multiple characters
//organize the results in an array []!!!
export type APICATs = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: APICAT[];
};

//CREATE FUNCTION = GET SINGLE CHARACTER
//get data through API method ... such as bring this data from this address.
//id is the identification of requested data ... such as number of card
//as usual do not forget to return!
export async function getCharacter(id) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  if (!response.ok) {
    const result = await response.json();
    return {
      imgSrc: "https://http.cat/404",
      name: result.error,
      status: "cat not found 😾",
    };
  }

  //https://http.cat/${id} error: failed to fetch(storybook)
  //SLACK SOLUTION TO ISSUE
  //`https://api.thecatapi.com/v1/images/search?mime_types=gif`,
  //{
  //headers: {
  //"x-api-key": "4ed34816-c19f-4144-9082-b2ffc3df0e40",
  //tried, did not work
  //},
  //}
  //);
  //https://http.cat/${id} error: failed to fetch(storybook)

  const result = (await response.json()) as APICAT;
  const character = {
    imgSrc: result.image,
    name: result.name,
    status: result.status,
  };
  return character;
}

//CREATE FUNCTION = GET MULTIPLE CHARACTERS + MAP RESULTS IN A MAP
export async function getCharacters() {
  const response = await fetch(`https://rickandmortyapi.com/api/character/`);
  //fallbackplan (same as single character)
  if (!response.ok) {
    return [];
  }
  const result = (await response.json()) as APICATs;
  const characters = result.results.map((apiCat) => ({
    imgSrc: apiCat.image,
    name: apiCat.name,
    status: apiCat.status,
  }));
  return characters;
}
