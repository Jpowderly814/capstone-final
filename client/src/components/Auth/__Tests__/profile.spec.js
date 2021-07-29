import axios from 'axios';
import { render, screen } from '@testing-library/react';
import FavoritesList from '../FavoritesList';
import Profile from '../Profile';

describe('Profile component', () => {
  jest.mock('axios', () => {
    return {
      post: jest.fn(),
    };
  });

  let responseObj = {
    data: [
      { id: '123', name: 'playlist1' },
      { id: '456', name: 'playlist2' },
    ],
  };

  // jest.mock('axios', () => {
  //   return {
  //     post: jest.fn(),
  //   };
  // });
  // afterEach(() => {
  //   // cleaning up the mess left behind the previous test
  // });
  it('renders Favorites List as a text', () => {
    render(<Profile />);
    // axios.post.mockResolvedValue(Promise.resolve(responseObj));
    const playlistElement = screen.getByText('playlist1');
    expect(playlistElement).toBeInTheDocument();
  });
});
