import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders the primary homepage introduction', () => {
    renderWithApp(<Hero />);

    expect(screen.getByTestId('home-hero')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Get your business ready for the AI era/i);
  });
});
