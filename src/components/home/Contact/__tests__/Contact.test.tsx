import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { sampleSlots } from '../../../../data/content';
import { renderWithApp } from '../../../__tests__/testUtils';
import Contact from '../Contact';

describe('Contact', () => {
  it('creates an email enquiry for a selected sample slot', async () => {
    const user = userEvent.setup();
    renderWithApp(<Contact />);

    expect(screen.getByTestId('home-contact')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: sampleSlots[0] }));
    expect(screen.getByRole('link', { name: /Confirm/i })).toHaveAttribute('href', expect.stringMatching(/^mailto:/));
  });
});
