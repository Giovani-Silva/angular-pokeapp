import { Component, OnInit } from '@angular/core';
import { tap, map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Pokemon } from './../../models/pokemons.model';
import { PokemonService } from './pokemon.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemons$: Observable<Pokemon[]>;
  subscription$: Subscription = new Subscription();
  totalPosts: number;
  postsPerPage: number = 12;
  currentPage = 1;
  pageSizeOptions = [2, 10, 20, 40, 80, 100];
  selection = 'Pokémon';
  searchBy: string;


  constructor(private service: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
    this.getPokemons();
  }

  onChangePaginator(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getPokemons();
  }

  getPokemons() {
    this.pokemons$ = this.service.list(this.selection, this.postsPerPage, this.currentPage, this.searchBy)
      .pipe(
        tap(dados => {
          this.postsPerPage = +dados.headers.get('Page-Size');
          this.totalPosts = +dados.headers.get('Total-Count');
        } ),
        tap(dados => { this.postsPerPage, this.totalPosts}),
        map( dados => dados.body.cards.sort(this.orderByName) ),
        take(1)
      )
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
