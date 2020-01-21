export interface Supertypes {
  supertypes: string[];
}


export interface Pokemon {
  id: string;
  name: string;
  nationalPokedexNumber: number;
  imageUrl: string;
  imageUrlHiRes: string;
  text?: string;
  types: string[];
  supertype: string;
  subtype: string;
  hp: number;
  retreatCost: string[];
  convertedRetreatCost: number;
  number: number;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  attacks: Attacks[];
  resistances: ResistanceAndWekness;
  weaknesses: ResistanceAndWekness;
}


export interface Attacks {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface ResistanceAndWekness {
  cost: string;
  value: string;
}

export interface ListPokemon {
  headers: object;
  cards: Pokemon[];
}
export interface CardsPokemon {
  cards: Pokemon[];
}

export interface ParamsRoute {
  selection: string;
  currentPage: number;
  searchBy: string;
  totalPosts: number;
}
