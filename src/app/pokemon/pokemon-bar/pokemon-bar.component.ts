import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, last, tap } from 'rxjs/operators';

import { PokemonService } from './../pokemon.service';
import { PokemonBarService } from './pokemon-bar.service';

@Component({
  selector: 'app-pokemon-bar',
  templateUrl: './pokemon-bar.component.html',
  styleUrls: ['./pokemon-bar.component.scss']
})
export class PokemonBarComponent implements OnInit {

  selected: string;
  supertypes$: Observable<any[]>;
  queryField$: Observable<any>;
  queryField = new FormControl;

  constructor(private service: PokemonBarService, private servicePokemon: PokemonService) { }

  ngOnInit() {
    this.supertypes$ = this.service.list();

    this.selected = this.getSelectSession();
    this.queryField.setValue( this.getSearchSession() ) ;
    this.service.selectedChanged.emit(this.selected);

    this.queryField.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap( value => this.service.searchBy.emit(value)),
      last()
    ).subscribe();

  }

  emitSelected(event){
    this.service.selectedChanged.emit(this.selected);
    this.queryField.setValue('');
    this.service.searchBy.emit('')
  }

  getSelectSession() {
    if ( !!this.servicePokemon.getParams() ){
      return this.servicePokemon.getParams().selection;
    }
    return 'Pokémon';
  }

  getSearchSession() {
    if ( !!this.servicePokemon.getParams() ){
      return this.servicePokemon.getParams().searchBy;
    }
    return '';
  }



}
