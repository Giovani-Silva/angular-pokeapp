import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  { path: 'pokemon', loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule)},
  // { path: 'pokemon', component: PokemonComponent},
  // { path: '**', redirectTo: 'pokemon' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
