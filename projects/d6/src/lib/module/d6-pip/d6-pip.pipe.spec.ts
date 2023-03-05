import { D6PipPipe } from './d6-pip.pipe';

describe('D6PipPipe', () => {
  const pipe: D6PipPipe = new D6PipPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return 0D if passed 0', () => {
    expect(pipe.transform(0)).toEqual('0d');
  });

  it('return 0D+1 if passed 1', () => {
    expect(pipe.transform(1)).toEqual('0d+1');
  });

  it('return 0D+2 if passed 2', () => {
    expect(pipe.transform(2)).toEqual('0d+2');
  });

  it('return 1D if passed 3', () => {
    expect(pipe.transform(3)).toEqual('1d');
  });
});
