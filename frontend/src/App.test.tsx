import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PokéDoku heading', () => {
  render(<App />);
  expect(screen.getByText(/PokéDoku/i)).toBeInTheDocument();
});
