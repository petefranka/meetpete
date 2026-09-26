import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import Process from '../Process';

describe('Process', () => {
  it('updates the selected process step', async () => {
    const user = userEvent.setup();
    renderWithApp(<Process />);
    const plan = screen.getByRole('button', { name: 'Plan' });

    expect(screen.getByTestId('home-process')).toBeInTheDocument();
    await user.click(plan);
    expect(plan).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('heading', { name: 'Plan' })).toBeInTheDocument();
  });
});
