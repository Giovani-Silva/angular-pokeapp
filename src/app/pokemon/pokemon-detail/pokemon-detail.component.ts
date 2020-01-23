import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PokemonService } from './../pokemon.service';
import { Pokemon, ParamsRoute } from './../../models/pokemons.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {

  id: string;
  pokemon: Pokemon;
  params: ParamsRoute;
  subscription$: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, private service: PokemonService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.subscription$.add(this.service
      .getById(this.id)
      .pipe(map(data => data.cards))
      .subscribe(data => this.pokemon = data[0])
    )

    this.params = this.service.getParams();
  }

  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }

  back() {

    if (!!this.params) {
      sessionStorage.setItem('page', JSON.stringify(this.params));
    }

    this.router.navigate(['/']);
  }

}
