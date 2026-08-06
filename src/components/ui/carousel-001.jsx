'use client';

import { motion as Motion } from 'motion/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { cn } from '@/lib/utils';

export function Carousel001({
  images,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 24,
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn('practice-carousel relative w-full max-w-6xl', className)}
    >
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={autoplay ? { delay: 2200, disableOnInteraction: false } : false}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={loop}
        slidesPerView={1.2}
        breakpoints={{ 640: { slidesPerView: 1.65 }, 900: { slidesPerView: 2.43 } }}
        coverflowEffect={{ rotate: 0, slideShadows: false, stretch: 0, depth: 100, modifier: 2.5 }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={showNavigation ? { nextEl: '.practice-carousel-next', prevEl: '.practice-carousel-prev' } : false}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="pb-12!"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="h-[330px]! overflow-hidden rounded-[22px] border border-black/10 bg-neutral-900 md:h-[440px]! dark:border-white/15">
            <img className="h-full w-full object-cover" src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button className="practice-carousel-prev absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/75 text-white backdrop-blur md:left-5" aria-label="Previous image">
            <ChevronLeftIcon className="size-5" />
          </button>
          <button className="practice-carousel-next absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/75 text-white backdrop-blur md:right-5" aria-label="Next image">
            <ChevronRightIcon className="size-5" />
          </button>
        </>
      )}
    </Motion.div>
  );
}

export default Carousel001;
