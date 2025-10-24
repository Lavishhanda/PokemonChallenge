import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TournamentPokemon } from '@models';
import { TitleCasePipe } from '@angular/common';
import { simulateTournament } from '@utils/functions';
import { SharedMaterialModule } from '../shared/shared-material.module';

@Component({
  selector: 'app-layout-component',
  imports: [TitleCasePipe, SharedMaterialModule],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss',
})
export class LayoutComponent implements OnChanges {

@Input()
pokemons! : Array<TournamentPokemon> | undefined;

tournamentResults: TournamentPokemon[] = [];
sortedResults: TournamentPokemon[] = [];
sortBy: string = 'wins';
sortDirection: string = 'desc';

ngOnChanges(changes: SimpleChanges): void {
  if (changes['pokemons'] && this.pokemons && this.pokemons.length === 16) {
    this.tournamentResults = simulateTournament(this.pokemons);
    this.applySorting();
  }
}

getStatPercentage(statValue: number, maxValue: number): number {
  return Math.min((statValue / maxValue) * 100, 100);
}

onSortByChange(value: string): void {
  this.sortBy = value;
  this.applySorting();
}

onSortDirectionChange(value: string): void {
  this.sortDirection = value;
  this.applySorting();
}


private applySorting(): void {
  if (!this.tournamentResults.length) return;

  this.sortedResults = [...this.tournamentResults].sort((a, b) => {
    let valueA: number | string;
    let valueB: number | string;

    switch (this.sortBy) {
      case 'wins':
        valueA = a.wins;
        valueB = b.wins;
        break;
      case 'losses':
        valueA = a.losses;
        valueB = b.losses;
        break;
      case 'ties':
        valueA = a.ties;
        valueB = b.ties;
        break;
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      default:
        valueA = a.winRate;
        valueB = b.winRate;
    }

    // Handle string vs number comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const comparison = valueA.localeCompare(valueB);
      return this.sortDirection === 'desc' ? -comparison : comparison;
    } else {
      const comparison = (valueA as number) - (valueB as number);
      return this.sortDirection === 'desc' ? -comparison : comparison;
    }
  });
}

}
