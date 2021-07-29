import UserService, { login } from './UserService';
// import MockAdapter from 'axios-mock-adapter';

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
  const userService = new UserService();
  const username = 'username123';
  const password = 'password123';

  it('should call endpoint', async () => {
    userService.login();
    expect(axios.post).toBeCalled();
  });

  it('should call endpoint with given email & password', async () => {
    userService.login(username, password);
    expect(axios.post()).toBeCalledWith(username, password);
  });
});
