import { D6DifficultyPipe } from './d6-difficulty-pipe';

describe('D6DifficultyPipe', () => {
  let pipe: D6DifficultyPipe;

  beforeEach(() => {
    pipe = new D6DifficultyPipe();
  });

  it('transforms 0 to Very Easy', () => {
    expect(pipe.transform(0)).toBe('Very Easy');
  });

  it('transforms 1 to Easy', () => {
    expect(pipe.transform(1)).toBe('Easy');
  });

  it('transforms 2 to Moderate', () => {
    expect(pipe.transform(2)).toBe('Moderate');
  });

  it('transforms 3 to Difficult', () => {
    expect(pipe.transform(3)).toBe('Difficult');
  });

  it('transforms 4 to Very Difficult', () => {
    expect(pipe.transform(4)).toBe('Very Difficult');
  });

  it('transforms 5 to Heroic', () => {
    expect(pipe.transform(5)).toBe('Heroic');
  });

  it('handles unknown values', () => {
    expect(pipe.transform(6)).toBe('Unknown (6)');
  });
});
