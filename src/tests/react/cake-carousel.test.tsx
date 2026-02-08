// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CakeCarousel, { getNextSlideIndex } from '../../components/react/CakeCarousel';
import type { OptimizedCarouselSlide } from '../../components/react/carousel-slides';

const listeners: Record<string, (() => void) | undefined> = {};

const emblaApiMock = {
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  scrollTo: vi.fn(),
  selectedScrollSnap: vi.fn(() => 0),
  scrollSnapList: vi.fn(() => [0, 1, 2]),
  on: vi.fn((event: string, callback: () => void) => {
    listeners[event] = callback;
  }),
  off: vi.fn()
};

vi.mock('embla-carousel-autoplay', () => ({
  default: vi.fn(() => ({ name: 'autoplay-plugin' }))
}));

vi.mock('embla-carousel-react', () => ({
  default: vi.fn(() => [vi.fn(), emblaApiMock])
}));

const slides: OptimizedCarouselSlide[] = [
  {
    id: 'a',
    alt: 'Slide A',
    fallbackSrc: '/a.jpg',
    fallbackSrcSet: '/a-420.jpg 420w, /a-640.jpg 640w',
    webpSrcSet: '/a-420.webp 420w, /a-640.webp 640w',
    sizes: '(max-width: 52rem) 92vw, 860px',
    width: 800,
    height: 600
  },
  {
    id: 'b',
    alt: 'Slide B',
    fallbackSrc: '/b.jpg',
    fallbackSrcSet: '/b-420.jpg 420w, /b-640.jpg 640w',
    webpSrcSet: '/b-420.webp 420w, /b-640.webp 640w',
    sizes: '(max-width: 52rem) 92vw, 860px',
    width: 800,
    height: 600
  },
  {
    id: 'c',
    alt: 'Slide C',
    fallbackSrc: '/c.jpg',
    fallbackSrcSet: '/c-420.jpg 420w, /c-640.jpg 640w',
    webpSrcSet: '/c-420.webp 420w, /c-640.webp 640w',
    sizes: '(max-width: 52rem) 92vw, 860px',
    width: 800,
    height: 600
  }
];

describe('CakeCarousel', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    Object.keys(listeners).forEach((key) => {
      delete listeners[key];
    });
  });

  it('renders dots and responds to navigation controls', () => {
    render(<CakeCarousel slides={slides} autoplayDelay={6000} />);

    const nextButton = screen.getByRole('button', { name: /show next cake image/i });
    const prevButton = screen.getByRole('button', { name: /show previous cake image/i });
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    expect(emblaApiMock.scrollNext).toHaveBeenCalled();
    expect(emblaApiMock.scrollPrev).toHaveBeenCalled();

    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(3);

    fireEvent.click(dots[1]);
    expect(emblaApiMock.scrollTo).toHaveBeenCalledWith(1);
  });

  it('supports keyboard arrow navigation', () => {
    render(<CakeCarousel slides={slides} />);

    const carousel = screen.getByTestId('cake-carousel');
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });

    expect(emblaApiMock.scrollNext).toHaveBeenCalled();
    expect(emblaApiMock.scrollPrev).toHaveBeenCalled();
  });

  it('calculates next index safely', () => {
    expect(getNextSlideIndex(0, 3)).toBe(1);
    expect(getNextSlideIndex(2, 3)).toBe(0);
    expect(getNextSlideIndex(0, 0)).toBe(0);
  });
});
