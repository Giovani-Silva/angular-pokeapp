import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { ListPokemon } from './../../models/pokemons.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  list(selected: string,  pageSize: number, page: number, searchBy?: string ) {
    const name = searchBy ?  searchBy  : '';
    const params = {
      supertype: selected,
      pageSize: `${pageSize}`,
      page: `${page}`,
      name,
    }
    return this.http.get<ListPokemon>(`${environment.api.pokemontcg.uri}/cards`, {params,  observe: 'response'});
  }
}
