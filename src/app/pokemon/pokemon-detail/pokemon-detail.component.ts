import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { PokemonService } from './../pokemon.service';
import { Pokemon, ParamsRoute } from './../../models/pokemons.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  id: string;
  pokemon: Pokemon;
  params: ParamsRoute;

  constructor(private router: Router, private route: ActivatedRoute, private service: PokemonService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.service
    .getById(this.id)
    .pipe(map(data => data.cards))
    .subscribe(data => this.pokemon = data[0]);

    this.params = this.service.getParams();
  }

  back() {

    if (!!this.params) {
      sessionStorage.setItem('page', JSON.stringify(this.params));
    }

    this.router.navigate(['/']);
  }

}
