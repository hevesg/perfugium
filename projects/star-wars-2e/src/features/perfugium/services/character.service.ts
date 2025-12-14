import { Character } from '../model/character';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CharacterService<T extends Character> {
  list(game: string): Observable<T[]> {
    const characters: T[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed = JSON.parse(data) as T;
            if (parsed.game === game) {
              characters.push(parsed);
            }
          } catch {
            return throwError(() => 'Unable to parse character');
          }
        }
      }
    }
    characters.sort((a, b) => b.modified - a.modified);
    return of(characters);
  }

  load(id: string): Observable<T> {
    const data = localStorage.getItem(id);
    if (data === null) {
      return throwError(() => new Error(`Character with id "${id}" not found`));
    }
    return of(JSON.parse(data) as T);
  }

  save(data: T): Observable<T> {
    data.modified = Date.now();
    data.created = localStorage.getItem(data.id) ? data.created : data.modified;
    localStorage.setItem(data.id, JSON.stringify(data));
    return of(data);
  }

  delete(id: string): Observable<void> {
    localStorage.removeItem(id);
    return of(void 0);
  }
}
