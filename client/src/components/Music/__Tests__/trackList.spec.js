import React from 'react';
import renderer from 'react-test-renderer';

import TrackList from '../TrackList';

describe('Tracklist', () => {
  it('renders correctly', () => {
    const tracklist = [1, 2, 3];

    expect(tracklist.length).toEqual(3);
  });
});
