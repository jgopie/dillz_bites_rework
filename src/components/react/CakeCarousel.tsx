import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import '../../styles/react/cake-carousel.css';
import type { OptimizedCarouselSlide } from './carousel-slides';

export interface CakeCarouselProps {
  slides: OptimizedCarouselSlide[];
  autoplayDelay?: number;
}

export function getNextSlideIndex(index: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return (index + 1) % total;
}

export default function CakeCarousel({ slides, autoplayDelay = 7000 }: CakeCarouselProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true
      }),
    [autoplayDelay]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start'
    },
    [autoplay]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const prefetchSlide = useCallback(
    (index: number) => {
      if (typeof window === 'undefined' || slides.length === 0 || !slides[index]) {
        return;
      }

      const image = new Image();
      image.src = slides[index].fallbackSrc;
    },
    [slides]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    prefetchSlide(getNextSlideIndex(index, slides.length));
  }, [emblaApi, prefetchSlide, slides.length]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollNext, scrollPrev]
  );

  return (
    <div className="cake-carousel" data-testid="cake-carousel" onKeyDown={handleKeyDown}>
      <div className="cake-carousel__viewport" ref={emblaRef} tabIndex={0} aria-label="Cake gallery carousel">
        <div className="cake-carousel__container">
          {slides.map((slide, index) => (
            <figure className="cake-carousel__slide" key={slide.id} aria-hidden={index !== selectedIndex}>
              <picture className="cake-carousel__media">
                <source srcSet={slide.webpSrcSet} type="image/webp" sizes={slide.sizes} />
                <img
                  src={slide.fallbackSrc}
                  srcSet={slide.fallbackSrcSet}
                  sizes={slide.sizes}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  decoding="async"
                  draggable={false}
                />
              </picture>
            </figure>
          ))}
        </div>
      </div>

      <div className="cake-carousel__controls" aria-label="Carousel controls">
        <button type="button" className="button-outline" onClick={scrollPrev} aria-label="Show previous cake image">
          Previous
        </button>
        <button type="button" className="button-outline" onClick={scrollNext} aria-label="Show next cake image">
          Next
        </button>
      </div>

      <div className="cake-carousel__dots" role="tablist" aria-label="Select gallery image">
        {scrollSnaps.map((_, index) => (
          <button
            type="button"
            key={`dot-${slides[index]?.id ?? index}`}
            className={`cake-carousel__dot${index === selectedIndex ? ' is-active' : ''}`}
            onClick={() => scrollTo(index)}
            role="tab"
            aria-label={`Show cake ${index + 1}`}
            aria-selected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}
