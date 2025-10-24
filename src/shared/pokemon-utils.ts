export function generatePokemonId(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getStatPercentage(statValue: number, maxValue: number): number {
    return Math.min((statValue / maxValue) * 100, 100);
}