import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { TournamentPokemon } from '@models';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  const mockPokemon: TournamentPokemon = {
    id: 1,
    name: 'bulbasaur',
    type: 'grass',
    imageUrl: 'test-url.png',
    baseExperience: 64,
    wins: 10,
    losses: 3,
    ties: 2,
    winRate: 66.7
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    component.rank = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.pokemon-name').textContent).toContain('Bulbasaur');
  });

  it('should show gold medal for rank 1', () => {
    component.rank = 1;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('🥇');
  });

  it('should calculate stat percentage correctly', () => {
    const result = component.getStatPercentage(75, 100);
    expect(result).toBe(75);
  });
});