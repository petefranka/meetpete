import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithApp } from '../../../__tests__/testUtils';
import Testimonials from '../Testimonials';

describe('Testimonials', () => {
  it('moves to the next testimonial', async () => {
    const user = userEvent.setup();
    renderWithApp(<Testimonials />);
    const previous = screen.getByRole('button', { name: 'Previous testimonials' });

    expect(screen.getByTestId('home-testimonials')).toBeInTheDocument();
    expect(previous).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next testimonials' }));
    expect(previous).toBeEnabled();
  });
});
