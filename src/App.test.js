import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Altura NFTs Explorer/i);
  expect(linkElement).toBeInTheDocument();
});
