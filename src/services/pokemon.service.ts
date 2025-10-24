import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { TournamentPokemon } from '../models/tournament-pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(ids: number[]): Observable<TournamentPokemon[]> {
    const requests = ids.map((id: number) =>
      this.http.get<TournamentPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
    return forkJoin(requests);
  }
}
