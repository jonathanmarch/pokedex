import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { Pokemon } from '../pokemon';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  let pokemonListTestData: Pokemon[] = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonListComponent ],
      imports: [ FormsModule, RouterModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.list = pokemonListTestData;
    component.unfiltered = pokemonListTestData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onFilterChanged should filter pokemon', () => {
    component.nameFilter = "bulbasaur";
    component.onFilterChanged(true);

    expect(component.list.length).toEqual(1);
    expect(component.list).toEqual([{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }]);
  });

  it('onSortChanged A-Z should sort pokemon by name correctly', () => {
    component.nameSort = "a-z";
    component.onSortChanged();

    let sortedAZ = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }
    ]

    expect(component.list).toEqual(sortedAZ);
  });

  it('onSortChanged Z-A should sort pokemon by name correctly', () => {
    component.nameSort = "z-a";
    component.onSortChanged();

    let sortedZA = [
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }
    ]

    expect(component.list).toEqual(sortedZA);
  });

  it('onSortChanged default should reset back to default after sorting', () => {
    component.nameSort = "a-z";
    component.onSortChanged();

    let sortedAZ = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }
    ]

    expect(component.list).toEqual(sortedAZ);

    component.nameSort = "";
    component.onSortChanged();


    expect(component.list).toEqual(pokemonListTestData);
  });
});
