import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LayoutContainerComponent } from './layout-container-component';
import { PokemonService } from '@services';
import { TournamentPokemon } from '@models';

describe('LayoutContainerComponent', () => {
  let component: LayoutContainerComponent;
  let fixture: ComponentFixture<LayoutContainerComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  // Mock data for testing
  const mockPokemonData: TournamentPokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      type: 'grass',
      imageUrl: 'test-url.png',
      baseExperience: 64,
      wins: 0,
      losses: 0,
      ties: 0,
      winRate: 0
    },
    {
      id: 2,
      name: 'charmander',
      type: 'fire',
      imageUrl: 'test-url2.png',
      baseExperience: 62,
      wins: 0,
      losses: 0,
      ties: 0,
      winRate: 0
    }
  ];

  beforeEach(async () => {
    // Create mock PokemonService
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemons']);

    await TestBed.configureTestingModule({
      imports: [LayoutContainerComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutContainerComponent);
    component = fixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have PokemonService injected', () => {
      expect(component['pokemonService']).toBeDefined();
    });
  });

  describe('generatePokemonId (private method)', () => {
    it('should generate exactly 16 unique Pokemon IDs', () => {

      const ids = component['generatePokemonId']();

      expect(ids.length).toBe(16);
      expect(new Set(ids).size).toBe(16); 
    });

    it('should generate IDs between 1 and 151', () => {
      const ids: number[] = component['generatePokemonId']();

      ids.forEach((id: number) => {
        expect(id).toBeGreaterThanOrEqual(1);
        expect(id).toBeLessThanOrEqual(151);
      });
    });
  });

  describe('getPokemons$', () => {

    it('should return Observable from PokemonService', () => {
      const testIds = [1, 2, 3];
      const expectedObservable = of(mockPokemonData);
      mockPokemonService.getPokemons.and.returnValue(expectedObservable);

      const result = component.getPokemons$(testIds);

      expect(result).toBe(expectedObservable);
    });
  });

});