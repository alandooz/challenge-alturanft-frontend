import { render, screen } from '@testing-library/react';
import Card from './index.js';

const asset = {
  name: "Testing Card"
};

test('renders Card element', () => {
  render(<Card
    asset={asset}
  />);
  const linkElement = screen.getByText(asset.name);
  expect(linkElement).toBeInTheDocument();
});
