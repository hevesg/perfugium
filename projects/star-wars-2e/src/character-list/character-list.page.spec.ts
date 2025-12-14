import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CharacterListPage } from './character-list.page';
import { CharacterService } from '../features/perfugium/services/character.service';
import { CharacterBuilder } from '../features/perfugium/model/character.mock';
import { D6Module } from '../features/d6/d6-module';
import { MOCK_CHARACTER_SERVICE } from '../../../../setup-jest';

describe('CharacterListPage', () => {
  let component: CharacterListPage;
  let fixture: ComponentFixture<CharacterListPage>;
  let mockCharacterService: typeof MOCK_CHARACTER_SERVICE;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.resetTestingModule();

    mockCharacterService = MOCK_CHARACTER_SERVICE;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [CharacterListPage, D6Module],
      providers: [
        { provide: CharacterService, useValue: mockCharacterService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('character list', () => {
    it('is displayed when characters exist', async () => {
      const characters = [CharacterBuilder.init('char-1').name('Luke').build()];
      mockCharacterService.list.mockReturnValue(of(characters));

      fixture.detectChanges();
      await fixture.whenStable();

      const characterList = fixture.debugElement.query(By.css('[data-qa="character-list"]'));
      expect(characterList).not.toBeNull();
    });
  });
  it(`is not displayed when characters don't exist`, async () => {
    const characterList = fixture.debugElement.query(By.css('[data-qa="character-list"]'));
    expect(characterList).toBeNull();
  });
});
