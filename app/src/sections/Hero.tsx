import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  { src: '/images/hero-bg.jpg', alt: 'Hero Background 1' },
  { src: '/images/about-image-2.png', alt: 'Hero Background 2' },
];

export function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  // Embla Carousel setup for background
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const progress = Math.min(scrollY / heroHeight, 1);
        
        const content = heroRef.current.querySelector('.hero-content') as HTMLElement;
        const overlay = heroRef.current.querySelector('.hero-overlay') as HTMLElement;
        
        if (content) {
          content.style.transform = `translateY(${-progress * 50}px)`;
          content.style.opacity = `${1 - progress}`;
        }
        if (overlay) {
          overlay.style.opacity = `${0.3 + progress * 0.4}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const title1 = t('hero.title1');
  const title2 = t('hero.title2');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroImages.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Carousel Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Dots Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              selectedIndex === index
                ? 'bg-[#E53935] w-10'
                : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E53935]/10"
            style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '50% 60% 40% 70%',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#E53935] font-semibold text-lg mb-4 tracking-wider"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Title Line 1 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-2 leading-tight">
            {title1.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.5 + index * 0.05,
                  duration: 0.5,
                  ease: [0.175, 0.885, 0.32, 1.275],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Title Line 2 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
            {title2.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.8 + index * 0.05,
                  duration: 0.5,
                  ease: [0.175, 0.885, 0.32, 1.275],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollToSection('#products')}
              size="lg"
              className="bg-[#E53935] hover:bg-[#C62828] text-white px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#E53935]/30"
            >
              {t('common.exploreProducts')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('#footer')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-lg rounded-full transition-all duration-300"
            >
              <Phone className="mr-2 w-5 h-5" />
              {t('common.contactUs')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
