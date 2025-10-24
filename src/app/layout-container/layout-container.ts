import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { generatePokemonId } from '@utils/functions';
import { PokemonService } from '../../services/pokemon.service';
import { TournamentPokemon } from '@models';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.html',
  styleUrl: './layout-container.scss',
})
export class LayoutContainer implements OnInit{

pokemonData$! : Observable<TournamentPokemon[]>;
constructor(private pokemonService: PokemonService) {}

 ngOnInit(): void {
   const ids = this.generatePokemonId();
   this.pokemonData$ = this.getPokemons$(ids);
   //console.log(this.pokemonData$.subscribe(data => console.log(data)) );
 }

private generatePokemonId(): Array<number> {
  const pokemonIds: Set<number> = new Set();
  while (pokemonIds.size < 16) {
    const result = generatePokemonId(1, 151);
    pokemonIds.add(result);
  }
  return Array.from(pokemonIds);
}

getPokemons$(ids: number[]): Observable<TournamentPokemon[]> {
  return this.pokemonService.getPokemons(ids);
}


}
