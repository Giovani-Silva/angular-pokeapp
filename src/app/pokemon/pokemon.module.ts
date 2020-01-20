import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonComponent } from './pokemon.component';
import { PokemonBarComponent } from './pokemon-bar/pokemon-bar.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonRoutingModule } from './pokemon-routing.module';



@NgModule({
  declarations: [PokemonComponent, PokemonDetailComponent, PokemonBarComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
  ]
})
export class PokemonModule { }
