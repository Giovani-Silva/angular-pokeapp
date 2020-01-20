import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonBarService {

  constructor(private http: HttpClient) { }

  selectedChanged = new EventEmitter<string>();
  searchBy =  new EventEmitter<string>();

  list() {
    return this.http.get<any>(`${environment.api.pokemontcg.uri}/supertypes`)
      .pipe(
          map(dados => {
            return dados.supertypes;
          })
      );
  }


}
