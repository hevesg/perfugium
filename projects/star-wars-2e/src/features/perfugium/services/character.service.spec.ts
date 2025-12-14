import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';
import { Character } from '../model/character';
import { CharacterBuilder } from '../model/character.mock';

const saveToLocalStorage = (...characters: Character[]) => {
  characters.forEach((character: Character) => {
    localStorage.setItem(character.id, JSON.stringify(character));
  });
};

describe('CharacterService', () => {
  let service: CharacterService<Character>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [CharacterService],
    });
    service = TestBed.inject(CharacterService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('list', () => {
    it('returns empty array when localStorage is empty', (done) => {
      service.list('sw2e').subscribe((characters) => {
        expect(characters).toEqual([]);
        done();
      });
    });

    it('returns characters filtered by game', (done) => {
      saveToLocalStorage(
        CharacterBuilder.init('12345').game('sw2e').build(),
        CharacterBuilder.init('67890').game('other').build(),
      );
      service.list('sw2e').subscribe((characters) => {
        expect(characters.length).toBe(1);
        expect(characters[0].id).toBe('12345');
        done();
      });
    });

    it('sorts characters by modified date descending', (done) => {
      saveToLocalStorage(
        CharacterBuilder.init('older').modified(1000).build(),
        CharacterBuilder.init('newer').modified(3000).build(),
        CharacterBuilder.init('middle').modified(2000).build(),
      );
      service.list('game').subscribe((characters) => {
        expect(characters.map((c) => c.id)).toEqual(['newer', 'middle', 'older']);
        done();
      });
    });

    it('returns error when localStorage contains invalid JSON', (done) => {
      localStorage.setItem('invalid', 'not valid json');

      service.list('sw2e').subscribe({
        error: (err) => {
          expect(err).toBe('Unable to parse character');
          done();
        },
      });
    });
  });

  describe('load', () => {
    it('returns character when found', (done) => {
      const character = CharacterBuilder.init('12345').build();
      saveToLocalStorage(character);
      service.load(character.id).subscribe((result) => {
        expect(result).toEqual(character);
        done();
      });
    });

    it('returns error when character not found', (done) => {
      service.load('non-existent').subscribe({
        error: (err) => {
          expect(err.message).toBe('Character with id "non-existent" not found');
          done();
        },
      });
    });
  });

  describe('save', () => {
    it('saves character to localStorage', (done) => {
      const character = CharacterBuilder.init('12345').build();

      service.save(character).subscribe(() => {
        const stored = localStorage.getItem(character.id);
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored!).name).toBe(character.name);
        done();
      });
    });

    it('updates modified timestamp', (done) => {
      const character = CharacterBuilder.init('12345').modified(1000).build();
      const beforeSave = Date.now();

      service.save(character).subscribe((result) => {
        expect(result.modified).toBeGreaterThanOrEqual(beforeSave);
        done();
      });
    });

    it('updates created timestamp for new characters', (done) => {
      const character = CharacterBuilder.init('12345').created(1000).build();
      const beforeSave = Date.now();

      service.save(character).subscribe((result) => {
        expect(result.created).toBeGreaterThanOrEqual(beforeSave);
        done();
      });
    });

    it('does not update created timestamp for existing characters', (done) => {
      const character = CharacterBuilder.init('12345').created(1000).build();
      saveToLocalStorage(character);

      service.save(character).subscribe((result) => {
        expect(result.created).toEqual(1000);
        done();
      });
    });

    it('returns the saved character', (done) => {
      const character = CharacterBuilder.init('12345').build();

      service.save(character).subscribe((result) => {
        expect(result.id).toBe(character.id);
        expect(result.name).toBe(character.name);
        done();
      });
    });
  });

  describe('delete', () => {
    it('removes character from localStorage', (done) => {
      saveToLocalStorage(CharacterBuilder.init('12345').modified(1000).build());

      service.delete('12345').subscribe(() => {
        expect(localStorage.getItem('12345')).toBeNull();
        done();
      });
    });

    it('returns undefined', (done) => {
      service.delete('any-id').subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });
    });
  });
});
