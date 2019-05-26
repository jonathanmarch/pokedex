import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonService } from '../pokemon.service';
import { PokemonDetail } from '../pokemon-detail';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
    let { name } = route.snapshot.params;
    this.detailName = name;
  }

  error: object;
  loading: boolean = true;

  detailName: string = '';
  detail: PokemonDetail;

  ngOnInit() {
    this.pokemonService.getPokemonDetails(this.detailName)
    .subscribe(
      res => this.detail = res,
      err => this.error = err,
      () => this.loading = false
    );
  }

}
