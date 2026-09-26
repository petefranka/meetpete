import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { faqs } from '../../../../data/content';
import { renderWithApp } from '../../../__tests__/testUtils';
import Faq from '../Faq';

describe('Faq', () => {
  it('opens a selected question', async () => {
    const user = userEvent.setup();
    renderWithApp(<Faq />);
    const question = screen.getByRole('button', { name: faqs[1].question });

    expect(screen.getByTestId('home-faq')).toBeInTheDocument();
    await user.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
  });
});
