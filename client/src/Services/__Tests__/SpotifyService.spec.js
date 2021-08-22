import SpotifyService from '../SpotifyService';

import axios from 'axios';

jest.mock('axios', () => {
  return {
    post: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('User Service', () => {
  const spotifyService = new SpotifyService();
  const code = 'abc123';

  it('should call axios with connect', async () => {
    spotifyService.connect(code);
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toBeCalledWith('http://localhost:3001/connect', {
      code: code,
    });
  });

  // it('should call axios with register', async () => {
  //   userService.register();
  //   expect(axios.post).toBeCalled();
  // });
});
