import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import BeforeAfter from '../BeforeAfter';

describe('BeforeAfter', () => {
  it('renders the before-and-after comparison', () => {
    renderWithApp(<BeforeAfter />);

    expect(screen.getByTestId('home-before-after')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Your website, glow-up edition/i })).toBeInTheDocument();
  });
});
