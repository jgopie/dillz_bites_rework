// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import OrderFormIsland from '../../components/react/OrderFormIsland';

function mockFetchOnce(response: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: async () => response
    })
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('OrderFormIsland', () => {
  it('maps API field errors to inline error text', async () => {
    mockFetchOnce(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please review your form and try again.',
        fieldErrors: {
          name: 'Please enter your name.'
        }
      },
      false
    );

    render(<OrderFormIsland minimumLeadDays={3} endpoint="/api/orders" />);

    fireEvent.click(screen.getByRole('button', { name: /send order request/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    });
  });

  it('submits successfully and resets form state', async () => {
    mockFetchOnce({
      ok: true,
      requestId: 'DB-20260207-TEST',
      message: 'Thanks for your order request.'
    });

    render(<OrderFormIsland minimumLeadDays={3} endpoint="/api/orders" />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/^email/i);
    const designNotes = screen.getByLabelText(/design notes/i);
    const consent = screen.getByRole('checkbox');

    fireEvent.change(nameInput, { target: { value: 'Jordan' } });
    fireEvent.change(emailInput, { target: { value: 'jordan@example.com' } });
    fireEvent.change(designNotes, { target: { value: 'Blue floral accents and smooth buttercream.' } });
    fireEvent.click(consent);

    fireEvent.click(screen.getByRole('button', { name: /send order request/i }));

    await waitFor(() => {
      expect(screen.getByText(/reference id: DB-20260207-TEST/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
  });
});
