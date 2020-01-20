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

  selected = 'Pokémon';
  supertypes$: Observable<any[]>;
  queryField$: Observable<any>;
  queryField = new FormControl;

  constructor(private service: PokemonBarService) { }

  ngOnInit() {
    this.supertypes$ = this.service.list();

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



}
