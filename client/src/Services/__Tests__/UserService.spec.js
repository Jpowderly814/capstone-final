import UserService from '../UserService';
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

  it('should call axios with login', async () => {
    userService.login(username, password);
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toBeCalledWith('http://localhost:3001/login', {
      password: password,
      username: username,
    });
  });

  it('should call axios with register', async () => {
    userService.register();
    expect(axios.post).toBeCalled();
  });
});
