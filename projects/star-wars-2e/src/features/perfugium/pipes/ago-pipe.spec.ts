import { AgoPipe } from './ago-pipe';

describe('AgoPipe', () => {
  let pipe: AgoPipe;
  const NOW = 1700000000000;

  beforeEach(() => {
    pipe = new AgoPipe();
    jest.spyOn(Date, 'now').mockReturnValue(NOW);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('input types', () => {
    it('accepts a number timestamp', () => {
      expect(pipe.transform(NOW - 5000)).toBe('5 seconds ago');
    });

    it('accepts a Date object', () => {
      const date = new Date(NOW - 5000);
      expect(pipe.transform(date)).toBe('5 seconds ago');
    });
  });

  describe('seconds', () => {
    it('returns singular for 1 second', () => {
      expect(pipe.transform(NOW - 1000)).toBe('1 second ago');
    });

    it('returns plural for multiple seconds', () => {
      expect(pipe.transform(NOW - 30000)).toBe('30 seconds ago');
    });

    it('returns 59 seconds at the boundary', () => {
      expect(pipe.transform(NOW - 59000)).toBe('59 seconds ago');
    });
  });

  describe('minutes', () => {
    it('returns singular for 1 minute', () => {
      expect(pipe.transform(NOW - 60000)).toBe('1 minute ago');
    });

    it('returns plural for multiple minutes', () => {
      expect(pipe.transform(NOW - 5 * 60000)).toBe('5 minutes ago');
    });

    it('returns 59 minutes at the boundary', () => {
      expect(pipe.transform(NOW - 59 * 60000)).toBe('59 minutes ago');
    });
  });

  describe('hours', () => {
    it('returns singular for 1 hour', () => {
      expect(pipe.transform(NOW - 60 * 60000)).toBe('1 hour ago');
    });

    it('returns plural for multiple hours', () => {
      expect(pipe.transform(NOW - 5 * 60 * 60000)).toBe('5 hours ago');
    });

    it('returns 23 hours at the boundary', () => {
      expect(pipe.transform(NOW - 23 * 60 * 60000)).toBe('23 hours ago');
    });
  });

  describe('days', () => {
    it('returns singular for 1 day', () => {
      expect(pipe.transform(NOW - 24 * 60 * 60000)).toBe('1 day ago');
    });

    it('returns plural for multiple days', () => {
      expect(pipe.transform(NOW - 5 * 24 * 60 * 60000)).toBe('5 days ago');
    });

    it('returns 29 days at the boundary', () => {
      expect(pipe.transform(NOW - 29 * 24 * 60 * 60000)).toBe('29 days ago');
    });
  });

  describe('months', () => {
    it('returns singular for 1 month', () => {
      expect(pipe.transform(NOW - 30 * 24 * 60 * 60000)).toBe('1 month ago');
    });

    it('returns plural for multiple months', () => {
      expect(pipe.transform(NOW - 5 * 30 * 24 * 60 * 60000)).toBe('5 months ago');
    });

    it('returns 11 months at the boundary', () => {
      expect(pipe.transform(NOW - 11 * 30 * 24 * 60 * 60000)).toBe('11 months ago');
    });
  });

  describe('years', () => {
    it('returns singular for 1 year', () => {
      expect(pipe.transform(NOW - 12 * 30 * 24 * 60 * 60000)).toBe('1 year ago');
    });

    it('returns plural for multiple years', () => {
      expect(pipe.transform(NOW - 3 * 12 * 30 * 24 * 60 * 60000)).toBe('3 years ago');
    });
  });
});
