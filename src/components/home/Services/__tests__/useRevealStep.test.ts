import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useRevealStep } from '../useRevealStep';

describe('useRevealStep', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('advances to the final step once without looping', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useRevealStep(3, 100));

    expect(result.current).toBe(0);

    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(1);

    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(2);

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe(2);
  });
});
