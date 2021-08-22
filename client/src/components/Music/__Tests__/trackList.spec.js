import TrackList from '../TrackList';
import { render, screen, fireEvent } from '@testing-library/react';

const mockSelectTrack = jest.fn();

describe('Tracklist', () => {
  //const props = [trackList{ albumUrl: '123456', title: 'A playlist' }];
  const tracklist = [
    {
      title: 'Uma Thurman',
      albumUrl: 'https://i.scdn.co/image/ab6',
      id: '2XW',
      uri: 'spotify:track:1',
    },
  ];

  it('calls choose track when clicked', () => {
    // Arrange
    const { getByTestId } = render(
      <TrackList trackList={tracklist} selectTrack={mockSelectTrack} />
    );

    // Act
    const button = getByTestId('trackListButton');

    fireEvent.click(button);

    // Assert
    expect(mockSelectTrack).toHaveBeenCalledWith(0, tracklist[0].uri);
  });

  it('renders track title as a text', () => {
    // Arrange
    render(<TrackList trackList={tracklist} selectTrack={mockSelectTrack} />);

    // Act
    // ... nothing

    // Assert
    const trackTitle = screen.getByText('Uma Thurman');
    expect(trackTitle).toBeInTheDocument();
  });
});
