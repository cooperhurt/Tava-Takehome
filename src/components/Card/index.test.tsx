import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './';

describe('Card Component', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('has correct styles', () => {
    const { container } = render(
      <Card>
        <div>Test Content</div>
      </Card>
    );

    const cardElement = container.firstChild;
    expect(cardElement).toHaveStyle('padding: 16px');
    expect(cardElement).toHaveStyle('background-color: white');
    expect(cardElement).toHaveStyle('border-radius: 8px');
    expect(cardElement).toHaveStyle('box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)');
  });
});