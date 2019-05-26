import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { PokemonDetail } from './pokemon-detail';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  let apiUrl = 'https://pokeapi.co/api/v2';

  const getOriginalPokemonTestData = {
    results: [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }
    ]
  };

  const getPokemonDetailsTestData: PokemonDetail = {
    "name": "bulbasaur",
    "sprites": [],
    "types": [],
    "stats": [],
    "moves": []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    service = TestBed.get(PokemonService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service).toBeTruthy();
  });

  it('getOriginalPokemon should return value from observable', () => {
    service.getOriginalPokemon().subscribe(pokemon => {
      expect(pokemon).toEqual(getOriginalPokemonTestData.results);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/pokemon?limit=151`);
    expect(req.request.method).toEqual('GET');

    req.flush(getOriginalPokemonTestData);

    httpTestingController.verify();
  });

  it('getPokemonDetails should return value from observable', () => {
    let name: string = "bulbasaur";

    service.getPokemonDetails(name).subscribe(pokemon => {
      expect(pokemon).toEqual(getPokemonDetailsTestData);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/pokemon/${name}`);
    expect(req.request.method).toEqual('GET');

    req.flush(getPokemonDetailsTestData);

    httpTestingController.verify();
  });

});
