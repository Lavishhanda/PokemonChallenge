import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { generatePokemonId } from '@utils/functions';
import { PokemonService } from '@services';
import { TournamentPokemon } from '@models';
import { LayoutComponent } from '../layout-component/layout-component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-container-component',
  templateUrl: './layout-container-component.html',
  styleUrl: './layout-container-component.scss',
  imports: [LayoutComponent, AsyncPipe, CommonModule],
})
export class LayoutContainerComponent implements OnInit{

pokemonData$? : Observable<TournamentPokemon[]>;
constructor(private pokemonService: PokemonService) {}

 ngOnInit(): void {
   const ids = this.generatePokemonId();
   this.pokemonData$ = this.getPokemons$(ids).pipe(
  catchError(error => {
    console.error('Failed to load Pokemon:', error);
    return of([]);
  })
);
   
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