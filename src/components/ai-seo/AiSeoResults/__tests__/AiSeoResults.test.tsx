import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import AiSeoResults from '../AiSeoResults';

describe('AiSeoResults', () => {
  it('switches between report sections', async () => {
    const user = userEvent.setup();
    renderWithApp(<AiSeoResults />);
    const fixes = screen.getByRole('button', { name: 'Fixes' });

    expect(screen.getByTestId('ai-seo-results')).toBeInTheDocument();
    expect(fixes).toHaveAttribute('aria-pressed', 'false');
    await user.click(fixes);
    expect(fixes).toHaveAttribute('aria-pressed', 'true');
  });
});
