import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import Pricing from '../Pricing';

describe('Pricing', () => {
  it('adds a need to the quote mix', async () => {
    const user = userEvent.setup();
    renderWithApp(<Pricing />);
    const need = screen.getByRole('button', { name: /AI-powered website/i });

    expect(screen.getByTestId('home-pricing')).toBeInTheDocument();
    expect(need).toHaveAttribute('aria-pressed', 'false');
    await user.click(need);
    expect(need).toHaveAttribute('aria-pressed', 'true');
  });
});
