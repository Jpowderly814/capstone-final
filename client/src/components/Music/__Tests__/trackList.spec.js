import React from 'react';
import renderer from 'react-test-renderer';

import TrackList from '../TrackList';

const onClick = jest.fn();

const props = {
  onClick,
};

describe('Tracklist', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<TrackList {...props} />)));

  it('renders correctly', () => {
    // Find the button and call the onClick handler
    wrapper.find('.track-list').simulate('click');

    // Test to make sure prop functions were called via simulating the button click
    expect(props.selectTrack).toHaveBeenCalled();
  });
});
