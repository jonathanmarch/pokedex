import { Component, OnInit } from '@angular/core';

import { sortBy } from 'lodash';

import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  error: object;
  loading: boolean = true;
  
  unfiltered: Pokemon[] = [];
  list: Pokemon[] = [];
  nameFilter: string = '';
  nameSort: string = '';

  ngOnInit() {

    this.pokemonService.getOriginalPokemon()
    .subscribe(pokemon => {
      this.unfiltered = pokemon;
      this.list = [...this.unfiltered];
    },
    err => this.error = err,
    () => this.loading = false);

  }

  onFilterChanged(nosort: boolean) {
    this.list = this.unfiltered.filter(item => item.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1);

    if (!nosort) this.onSortChanged();
  }

  onSortChanged() {

    if (this.nameSort === '') { // reset to default sort
      this.onFilterChanged(true);
    } else {
      this.list = sortBy(this.list, 'name');

      if (this.nameSort === 'z-a') {
        this.list.reverse();
      }
    }

  }
}
