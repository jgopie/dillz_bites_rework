import type { ImageMetadata } from 'astro';
import cake1 from '../../assets/images/cake_1.jpg';
import cake2 from '../../assets/images/cake_2.jpg';
import cake3 from '../../assets/images/cake_3.jpg';
import cake4 from '../../assets/images/cake_4.jpg';
import cake5 from '../../assets/images/cake_5.jpg';
import cake6 from '../../assets/images/cake_6.jpg';
import cake7 from '../../assets/images/cake_7.jpg';
import cake8 from '../../assets/images/cake_8.jpg';
import cake9 from '../../assets/images/cake_9.jpg';

export interface CarouselSlideSource {
  id: string;
  image: ImageMetadata;
  alt: string;
}

export interface OptimizedCarouselSlide {
  id: string;
  alt: string;
  fallbackSrc: string;
  fallbackSrcSet: string;
  webpSrcSet: string;
  sizes: string;
  width: number;
  height: number;
}

export const carouselImageWidths = [420, 640, 860, 1080, 1320] as const;
export const carouselImageSizes = '(max-width: 52rem) 92vw, (max-width: 72rem) 78vw, 860px';

export const cakeCarouselSlides: CarouselSlideSource[] = [
  { id: 'cake-1', image: cake1, alt: 'Two-tier celebration cake with fresh floral accents' },
  { id: 'cake-2', image: cake2, alt: 'Chocolate drip cake with textured buttercream finish' },
  { id: 'cake-3', image: cake3, alt: 'Bold custom cake with colorful decorative piping' },
  { id: 'cake-4', image: cake4, alt: 'Tall wedding cake with elegant white floral details' },
  { id: 'cake-5', image: cake5, alt: 'Birthday cake featuring soft peach and cream palette' },
  { id: 'cake-6', image: cake6, alt: 'Custom themed cake with hand-sculpted fondant pieces' },
  { id: 'cake-7', image: cake7, alt: 'Modern artisan cake with minimalist geometric style' },
  { id: 'cake-8', image: cake8, alt: 'Statement cake with metallic finishing details' },
  { id: 'cake-9', image: cake9, alt: 'Special occasion cake with layered textures and flowers' }
];
