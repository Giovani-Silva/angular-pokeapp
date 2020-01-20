import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


import { PokemonComponent } from './pokemon.component';
import { PokemonBarComponent } from './pokemon-bar/pokemon-bar.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonRoutingModule } from './pokemon-routing.module';



@NgModule({
  declarations: [PokemonComponent, PokemonDetailComponent, PokemonBarComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class PokemonModule { }
