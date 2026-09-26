import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import AiSeoHero from '../AiSeoHero';

describe('AiSeoHero', () => {
  it('validates and starts a website analysis', async () => {
    const user = userEvent.setup();
    renderWithApp(<AiSeoHero />);
    const input = screen.getByRole('textbox', { name: 'Website address' });

    expect(screen.getByTestId('ai-seo-hero')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Scan my site/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await user.type(input, 'https://example.com/about');
    await user.click(screen.getByRole('button', { name: /Scan my site/i }));
    expect(screen.getByRole('button', { name: /Scanning/i })).toBeDisabled();
  });
});
