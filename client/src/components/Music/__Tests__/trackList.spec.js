import React from 'react';
// import renderer from 'react-test-renderer';
// import shallow from 'enzyme-adapter-react-16';
import TrackList from '../TrackList';

<<<<<<< HEAD
import { render, screen, fireEvent } from '@testing-library/react';

=======
>>>>>>> origin/store-code
const onClick = jest.fn();

const props = {
  onClick,
};

describe('Tracklist', () => {
<<<<<<< HEAD
  //let wrapper;

  //beforeEach(() => (wrapper = shallow(<TrackList {...props} />)));

  // it('renders correctly', () => {
  //   // Find the button and call the onClick handler
  //   wrapper.find('.track-list').simulate('click');

  //   // Test to make sure prop functions were called via simulating the button click
  //   expect(props.selectTrack).toHaveBeenCalled();
  // });

  it('clicks the button', () => {
    const button = screen.get;

    fireEvent.click(button);

    // Test to make sure prop functions were called via simulating the button click
    expect(props.selectTrack).toHaveBeenCalled(); //this isnt even in this branch
  });

  it('renders posts if request succeeds', async () => {
    const props = {
      trackList: [
        {
          albumUrl:
            'https://i.scdn.co/image/ab67616d00004851fdbad1f02e240471592b58e4',
          id: '4lAYMPLPFOovwTCmtTt9b5',
          title: "I'm A Believer",
          uri: 'spotify:track:4lAYMPLPFOovwTCmtTt9b5',
        },
        {
          albumUrl:
            'https://i.scdn.co/image/ab67616d00004851072a173e9323f3bdf1d254d6',
          id: '3dOAXUx7I1qnzWzxdnsyB8',
          title: 'Lonely Boy',
          uri: 'spotify:track:3dOAXUx7I1qnzWzxdnsyB8',
        },
      ],
    };
    render(<TrackList props={props} />);

    const listItemElements = await screen.findAllByRole(
      'd-flex m-2 align-items-center'
    );

    expect(listItemElements).not.toHaveLength(0);
=======
  let wrapper;

  beforeEach(() => (wrapper = shallow(<TrackList {...props} />)));

  it('renders correctly', () => {
    // Find the button and call the onClick handler
    wrapper.find('.track-list').simulate('click');

    // Test to make sure prop functions were called via simulating the button click
    expect(props.selectTrack).toHaveBeenCalled();
>>>>>>> origin/store-code
  });
});
