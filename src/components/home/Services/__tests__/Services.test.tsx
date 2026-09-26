import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import Services from '../Services';

describe('Services', () => {
  it('switches the selected service tab', async () => {
    const user = userEvent.setup();
    renderWithApp(<Services />);
    const aiSeoTab = screen.getByRole('tab', { name: 'AI-SEO' });

    expect(screen.getByTestId('home-services')).toBeInTheDocument();
    expect(aiSeoTab).toHaveAttribute('aria-selected', 'false');
    await user.click(aiSeoTab);
    expect(aiSeoTab).toHaveAttribute('aria-selected', 'true');
  });
});
