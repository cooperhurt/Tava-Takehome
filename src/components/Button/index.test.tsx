import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './';

describe('Button Component', () => {
  test('renders with correct attributes for "save" action', () => {
    const { container } = render(<Button data-action="save">Save</Button>);
    const buttonElement = container.firstChild;

    expect(buttonElement).toHaveStyle('background-color: rgb(33, 136, 56)');
    expect(buttonElement).toHaveStyle('background-color: #218838');
  });

  test('renders with correct attributes for "new" action', () => {
    const { container } = render(<Button data-action="new">New</Button>);
    const buttonElement = container.firstChild;

    expect(buttonElement).toHaveStyle('background-color: rgb(41, 155, 242)');
    expect(buttonElement).toHaveStyle('background-color: #299bf2');
  });

  test('renders with correct attributes for "cancel" action', () => {
    const { container } = render(<Button data-action="cancel">Cancel</Button>);
    const buttonElement = container.firstChild;

    expect(buttonElement).toHaveStyle('background-color: rgb(200, 35, 51)');
    expect(buttonElement).toHaveStyle('background-color: #c82333');
  });
});