import React from 'react';
// import renderer from 'react-test-renderer';
// import shallow from 'enzyme-adapter-react-16';
import PlaylistSearchResult from '../PlaylistSearchResult';
import { render, screen, fireEvent } from '@testing-library/react';

const onClick = jest.fn();

const props = {
  onClick,
};

describe('Tracklist', () => {
  it('clicks the button', () => {
    render(<PlaylistSearchResult />);
    const button = screen.getAllByRole(Image);

    fireEvent.click(button);

    // Test to make sure prop functions were called via simulating the button click
    expect(props.onClick).toHaveBeenCalled(); //this isnt even in this branch
  });
});
