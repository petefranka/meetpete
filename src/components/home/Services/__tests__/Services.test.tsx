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

  it('shows an error instead of navigating for an invalid website address', async () => {
    const user = userEvent.setup();
    renderWithApp(<Services />);
    const input = screen.getByRole('textbox', { name: 'Website address' });

    await user.type(input, 'definitely not a domain');
    await user.click(screen.getByRole('button', { name: /Scan my site/i }));

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveFocus();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid website address, such as yourbusiness.co.uk.',
    );
  });
});
