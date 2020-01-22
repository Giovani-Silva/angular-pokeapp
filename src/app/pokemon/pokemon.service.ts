import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from './../../environments/environment';
import { ParamsRoute, ListPokemon } from './../models/pokemons.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  paramsRoute: ParamsRoute;

  constructor(private http: HttpClient) { }

  list(selected: string,  pageSize: number, page: number, searchBy?: string ) {
    const name = searchBy ?  searchBy  : '';
    const params = {
      supertype: selected,
      pageSize: `${pageSize}`,
      page: `${page}`,
      name,
    };
    return this.http.get<ListPokemon>(`${environment.api.pokemontcg.uri}/cards`, {params,  observe: 'response'});
  }


  getById(id: string) {
    const params = { id };
    return this.http.get<any>(`${environment.api.pokemontcg.uri}/cards`, { params });
  }


  setParams(selection: string, currentPage: number, searchBy: string, totalPosts: number) {
    this.paramsRoute = { selection, currentPage, searchBy, totalPosts };
  }

  getParams() {
    return this.paramsRoute;
  }

  saveCardsSession(cards) {
    sessionStorage.setItem('cards', JSON.stringify(cards));
  }

  getCardsSession() {
    return of( JSON.parse(sessionStorage.getItem('cards')) );
  }

}
