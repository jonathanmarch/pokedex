import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Pokemon } from '../app/pokemon';
import { PokemonDetail } from '../app/pokemon-detail';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getOriginalPokemon() : Observable<Pokemon[]> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=151`).pipe(
      map(res => res['results']),
      map(pokemon => pokemon.map(item => {
        if (item.name !== 'mr-mime') {
          item.name = item.name.replace(/\-/g, ''); // fix for images when referencing pokestadium gifs (Nidoran-f, Nidoran-m)
        }
        return item;
      })),
      tap(_ => console.log('Fetched pokemon list'))
    );
  }

  getPokemonDetails(name: string) : Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${name}`).pipe(
      tap(_ => console.log('Fetched pokemon detail'))
    );
  }

}
