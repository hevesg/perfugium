import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
import { of } from 'rxjs';

setupZonelessTestEnv();

export const MOCK_CHARACTER_SERVICE = {
  list: jest.fn().mockReturnValue(of([])),
  load: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
