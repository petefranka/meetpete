import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import Upsell from '../Upsell';

describe('Upsell', () => {
  it('switches plan and opens the comparison', async () => {
    const user = userEvent.setup();
    renderWithApp(<Upsell />);
    const diy = screen.getByRole('button', { name: 'Do it yourself' });
    const comparison = screen.getByRole('button', { name: /Compare your options/i });

    expect(screen.getByTestId('ai-seo-upsell')).toBeInTheDocument();
    await user.click(diy);
    expect(diy).toHaveAttribute('aria-pressed', 'true');
    await user.click(comparison);
    expect(comparison).toHaveAttribute('aria-expanded', 'true');
    const doneForYou = screen.getByRole('tab', { name: 'Done for you' });
    await user.click(doneForYou);
    expect(doneForYou).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Every fix on your action plan, done for you');
  });
});
