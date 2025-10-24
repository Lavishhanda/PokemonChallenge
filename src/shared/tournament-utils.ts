import { TournamentPokemon } from '@models';

// key wins over value
const TYPE_ADVANTAGES: { [key: string]: string[] } = {
  water: ['fire'],
  fire: ['grass'],
  grass: ['electric'],
  electric: ['water'],
  ghost: ['psychic'],
  psychic: ['fighting'],
  fighting: ['dark'],
  dark: ['ghost']
};

export interface BattleResult {
  winner: TournamentPokemon;
  loser: TournamentPokemon;
  isTie: boolean;
  reason: 'type-advantage' | 'base-experience' | 'tie';
}

export function battle(pokemon1: TournamentPokemon, pokemon2: TournamentPokemon): BattleResult {
  const type1 = pokemon1.type.toLowerCase();
  const type2 = pokemon2.type.toLowerCase();
  
  // Check type advantages
  if (TYPE_ADVANTAGES[type1]?.includes(type2)) {
    return {
      winner: pokemon1,
      loser: pokemon2,
      isTie: false,
      reason: 'type-advantage'
    };
  }
  
  if (TYPE_ADVANTAGES[type2]?.includes(type1)) {
    return {
      winner: pokemon2,
      loser: pokemon1,
      isTie: false,
      reason: 'type-advantage'
    };
  }
  
  // Type matchup doesn't determine winner, use base_experience
  if (pokemon1.baseExperience > pokemon2.baseExperience) {
    return {
      winner: pokemon1,
      loser: pokemon2,
      isTie: false,
      reason: 'base-experience'
    };
  }
  
  if (pokemon2.baseExperience > pokemon1.baseExperience) {
    return {
      winner: pokemon2,
      loser: pokemon1,
      isTie: false,
      reason: 'base-experience'
    };
  }
  
  // Equal base_experience = tie
  return {
    winner: pokemon1, 
    loser: pokemon2,
    isTie: true,
    reason: 'tie'
  };
}

export function simulateTournament(pokemons: TournamentPokemon[]): TournamentPokemon[] {

  const participants = pokemons.map(p => ({ ...p, wins: 0, losses: 0, ties: 0, winRate: 0 }));
  
  // Round-robin to let each pokemon fight every other available pokemon
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const result = battle(participants[i], participants[j]);
      
      if (result.isTie) {
        participants[i].ties++;
        participants[j].ties++;
      } else {
        // Find the actual participants to update their stats
        const winnerIndex = participants.findIndex(p => p.id === result.winner.id);
        const loserIndex = participants.findIndex(p => p.id === result.loser.id);
        
        participants[winnerIndex].wins++;
        participants[loserIndex].losses++;
      }
    }
  }
  
  // Calculate win rates
  participants.forEach(pokemon => {
    const totalBattles = pokemon.wins + pokemon.losses + pokemon.ties;
    pokemon.winRate = totalBattles > 0 ? (pokemon.wins / totalBattles) * 100 : 0;
  });
  
  // Sort by win rate (highest first), then by wins if win rate is equal
  return participants.sort((a, b) => {
    if (b.winRate !== a.winRate) return b.winRate - a.winRate;
    return b.wins - a.wins;
  });
}