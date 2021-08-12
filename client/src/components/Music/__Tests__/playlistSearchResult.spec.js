import React from 'react';
import PlaylistSearchResult from '../PlaylistSearchResult';
import { render, screen, fireEvent } from '@testing-library/react';

const mockChoosePlaylist = jest.fn();

describe('Playlist search result', () => {
  const playlist = { albumUrl: '123456', title: 'A playlist' };

  it('renders playlist title as a text', () => {
    // Arrange
    render(
      <PlaylistSearchResult
        choosePlaylist={mockChoosePlaylist}
        playlist={playlist}
      />
    );

    // Act
    // ... nothing

    // Assert
    const playlistTitle = screen.getByText('A playlist');
    expect(playlistTitle).toBeInTheDocument();
  });

  it('calls choose playlist with div tag is clicked', () => {
    // Arrange
    const { getByTestId } = render(
      <PlaylistSearchResult
        choosePlaylist={mockChoosePlaylist}
        playlist={playlist}
      />
    );

    // Act
    const button = getByTestId('onclick');

    fireEvent.click(button);

    // Assert
    expect(mockChoosePlaylist).toHaveBeenCalledWith(playlist);
  });
});
