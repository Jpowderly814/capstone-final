import UserService from './UserService';
// import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';
jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('User Service', () => {
  const username = 'username123';
  const password = 'password123';

  it('should call endpoint with given email & password', async () => {
    await UserService.login(username, password);
    expect(axios.post).toBeCalledWith('http://localhost:3001/login', {
      user: { username, password },
    });
  });
});
