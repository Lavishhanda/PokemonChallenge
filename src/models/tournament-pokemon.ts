export interface TournamentPokemon {
id: number;
name: string;
type: string; 
imageUrl: string; // Pokemon sprite image URL from API

baseExperience: number;
wins: number;
losses: number;
ties: number;
winRate: number; // divide wins by total battles and multiply by 100
}