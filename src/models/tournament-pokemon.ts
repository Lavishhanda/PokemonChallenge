export interface TournamentPokemon {
id: number;
name: string;
type: string; // Primary type name (e.g., 'grass', 'fire')
imageUrl: string; // Pokemon sprite image URL from API

baseExperience: number;
wins: number;
losses: number;
ties: number;
winRate: number; // (wins / total battles) * 100
}