import { Component, OnInit } from '@angular/core';
import { tap, map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { PokemonBarService } from './pokemon-bar/pokemon-bar.service';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemons.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemons$: Observable<Pokemon[]>;
  subscription$: Subscription = new Subscription();
  totalPosts: number;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOptions = [2, 10, 20, 40, 80, 100];
  selection = 'Pokémon';
  searchBy: string;


  constructor(private service: PokemonService, private selected: PokemonBarService) { }

  ngOnInit() {
    this.getSelected();
    this.search();
    this.getPokemons();
  }

  onChangePaginator(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.setParamRoute();
    this.getPokemons();
  }

  getPokemons() {
    if ( !this.getStorage() ) {
      this.pokemons$ = this.service.list(this.selection, this.postsPerPage, this.currentPage, this.searchBy)
        .pipe(
          tap(dados => {
            this.postsPerPage = +dados.headers.get('Page-Size');
            this.totalPosts = +dados.headers.get('Total-Count');
            this.setParamRoute();
          } ),
          tap( dados => {this.service.saveCardsSession(dados.body.cards.sort(this.orderByName)); }),
          map( dados => dados.body.cards.sort(this.orderByName) ),
          take(1)
      );
    }
  }

  getSelected() {
    this.subscription$.add(this.selected.selectedChanged.subscribe( (selected: string) => {
      this.selection = selected;
      this.currentPage = 1;
      this.setParamRoute();
      this.getPokemons();
      })
    );
  }

  search() {
    this.subscription$.add(this.selected.searchBy.subscribe( (searchBy: string) => {
      this.searchBy = searchBy;
      this.currentPage = 1;
      this.setParamRoute();
      this.getPokemons();
      })
    );
  }

  getStorage() {
    const data = JSON.parse(sessionStorage.getItem('page'));
    if ( data ) {
      sessionStorage.removeItem('page');
      this.pokemons$ = this.service.getCardsSession();
      this.selection = data.selection;
      this.currentPage = data.currentPage;
      this.totalPosts = data.totalPosts;
      this.searchBy = data.searchBy;
      return true ;
    }
    return false;
  }


  setParamRoute() {
    this.service.setParams(this.selection, this.currentPage, this.searchBy,  this.totalPosts);
  }


  private orderByName(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

}
