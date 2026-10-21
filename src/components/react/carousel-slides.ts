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
  caption: string;
}

export interface OptimizedCarouselSlide {
  id: string;
  alt: string;
  caption: string;
  fallbackSrc: string;
  fallbackSrcSet: string;
  webpSrcSet: string;
  sizes: string;
  width: number;
  height: number;
}

export const carouselImageWidths = [320, 480, 640, 860] as const;
export const carouselImageSizes = '(max-width: 40rem) 80vw, (max-width: 64rem) 45vw, 24rem';

export const cakeCarouselSlides: CarouselSlideSource[] = [
  {
    id: 'cake-1',
    image: cake1,
    caption: 'Rosette number cake',
    alt: 'Number one birthday cake piped with peach and cream rosettes and gold pearls, beside a small heart cake'
  },
  {
    id: 'cake-8',
    image: cake8,
    caption: 'Chelsea FC drip cake',
    alt: 'Royal blue drip cake with Chelsea FC badges, footballs and a gold Happy Birthday topper'
  },
  {
    id: 'cake-5',
    image: cake5,
    caption: 'Golden Girls party',
    alt: 'Two-tier pink and cream Golden Girls themed cake with tropical leaves and character figurines'
  },
  {
    id: 'cake-9',
    image: cake9,
    caption: 'Chocolate overload',
    alt: 'Chocolate drip cake piled with chocolate doughnuts and chocolate bars on a gold board'
  },
  {
    id: 'cake-7',
    image: cake7,
    caption: 'Bikini Bottom 25th',
    alt: "Teal SpongeBob themed 25th birthday cake reading \"What's funnier than 24\" with a sandy top"
  },
  {
    id: 'cake-4',
    image: cake4,
    caption: 'Bridal shower, two tiers',
    alt: 'Two-tier bridal shower cake with an illustrated couple, pink buttercream ruffles and a "So it begins" topper'
  },
  {
    id: 'cake-3',
    image: cake3,
    caption: 'Cookies and cream',
    alt: 'Cookies and cream cake ringed with chocolate buttercream swirls and a gold Happy Birthday plaque'
  },
  {
    id: 'cake-6',
    image: cake6,
    caption: 'Bride to be',
    alt: 'Bride to Be cake with an illustrated bride in gold jewellery, a red rose and sunflowers'
  },
  {
    id: 'cake-2',
    image: cake2,
    caption: 'Layered cake cups',
    alt: "Clear cake cup layered with sponge and berry filling, topped with a wooden tag and baby's breath"
  }
];
