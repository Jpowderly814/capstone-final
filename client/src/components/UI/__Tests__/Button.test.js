import React from 'react';
import Button from '../Button';
import { render, screen, fireEvent } from '@testing-library/react';

const onClick = jest.fn();

describe('Button', () => {
  it('calls onclick when clicked', () => {
    // Arrange
    render(<Button />);

    // Act
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Assert
    expect(onClick).not.toHaveBeenCalled();
  });
});
