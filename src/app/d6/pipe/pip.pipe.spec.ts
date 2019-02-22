import { PipPipe } from './pip.pipe';

describe('PipPipe', () => {

  let pipe: PipPipe;
  beforeEach(() => {
    pipe = new PipPipe();
  });

  it('should transform 0 to 0D', () => {
    expect(pipe.transform(0)).toBe('0D');
  });

  it('should transform 3 to 1D', () => {
    expect(pipe.transform(3)).toBe('1D');
  });

  it('should transform 10 to 3D+1', () => {
    expect(pipe.transform(10)).toBe('3D+1');
  });

  it('should transform 11 to 3D+2', () => {
    expect(pipe.transform(11)).toBe('3D+2');
  });
});
