import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  totalPosts = 1000;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOptions = [2, 10, 20, 40, 80, 100];

  constructor() { }

  ngOnInit() {
  }

  onChangePaginator(event: any) {
    this.currentPage = event.pageIndex + 1;
  }

}
