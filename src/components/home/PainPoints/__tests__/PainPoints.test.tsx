import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { painStatements } from '../../../../data/content';
import { renderWithApp } from '../../../__tests__/testUtils';
import PainPoints from '../PainPoints';

describe('PainPoints', () => {
  it('toggles a selected statement', async () => {
    const user = userEvent.setup();
    renderWithApp(<PainPoints />);
    const statement = screen.getByRole('button', { name: new RegExp(painStatements[0], 'i') });

    expect(screen.getByTestId('home-pain-points')).toBeInTheDocument();
    expect(statement).toHaveAttribute('aria-pressed', 'false');
    await user.click(statement);
    expect(statement).toHaveAttribute('aria-pressed', 'true');
  });
});
