import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import SevenAreas from '../SevenAreas';

describe('SevenAreas', () => {
  it('requests a scan from the section call to action', async () => {
    const user = userEvent.setup();
    const onAnalyseCta = vi.fn();
    renderWithApp(<SevenAreas onAnalyseCta={onAnalyseCta} />);

    expect(screen.getByTestId('ai-seo-seven-areas')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Scan my site/i }));
    expect(onAnalyseCta).toHaveBeenCalledOnce();
  });
});
