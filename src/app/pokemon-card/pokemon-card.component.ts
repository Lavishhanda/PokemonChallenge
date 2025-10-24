import { Component, Input } from '@angular/core';
import { TournamentPokemon } from '@models';
import { TitleCasePipe } from '@angular/common';
import { getStatPercentage } from '../../shared/pokemon-utils';

@Component({
  selector: 'app-pokemon-card',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon!: TournamentPokemon;
  @Input() rank!: number;

  getStatPercentage = getStatPercentage;
}