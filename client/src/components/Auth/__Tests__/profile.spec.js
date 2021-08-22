import axios from 'axios';
import { render } from '@testing-library/react';
import Profile from '../Profile';

// const mockUserService = jest.fn();

jest.mock('axios', () => {
  return {
    post: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Profile component', () => {
  let userId = 10;

  let responseObj = {
    data: [
      { id: '123', name: 'playlist1' },
      { id: '456', name: 'playlist2' },
    ],
  };

  it('should call axios with favorites', () => {
    render(<Profile />);
    expect(axios.post).toBeCalled();
    // expect(axios.post).toBeCalledWith('http://localhost:3001/connect', {
    //   code: code,
    // });
  });

  // it('renders Favorites List as a text', () => {
  //   render(<Profile />);
  //   // axios.post.mockResolvedValue(Promise.resolve(responseObj));
  //   const playlistElement = screen.getByText('playlist1');
  //   expect(playlistElement).toBeInTheDocument();
  // });
});
