import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TournamentPokemon } from '../models/tournament-pokemon';

// Interface for the PokeAPI response (only the fields we need)
interface PokeApiResponse {
  id: number;
  name: string;
  base_experience: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(ids: number[]): Observable<TournamentPokemon[]> {
    const requests = ids.map((id: number) =>
      this.http.get<PokeApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
        map((pokemon: PokeApiResponse) => ({
          // map required data into object
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.types[0]?.type.name || 'unknown',
          imageUrl: pokemon.sprites.other['official-artwork'].front_default,
          wins: 0,
          losses: 0,
          ties: 0,
          winRate: 0
        } as TournamentPokemon))
      )
    );
    return forkJoin(requests);
  }
}
