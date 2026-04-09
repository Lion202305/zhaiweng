import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Award, Package, TrendingUp, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function Franchise() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const benefits = [
    {
      icon: Award,
      title: t('franchise.benefits.brand.title'),
      description: t('franchise.benefits.brand.desc'),
    },
    {
      icon: Package,
      title: t('franchise.benefits.supply.title'),
      description: t('franchise.benefits.supply.desc'),
    },
    {
      icon: TrendingUp,
      title: t('franchise.benefits.marketing.title'),
      description: t('franchise.benefits.marketing.desc'),
    },
    {
      icon: GraduationCap,
      title: t('franchise.benefits.training.title'),
      description: t('franchise.benefits.training.desc'),
    },
  ];

  const scrollToFooter = () => {
    const element = document.querySelector('#footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="franchise"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Animated Red Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E53935] via-[#C62828] to-[#E53935] animate-gradient" />

      {/* Diagonal Separators */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1A1A1A]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div>
            <RevealOnScroll>
              <p className="text-white/80 font-semibold text-sm tracking-widest uppercase mb-3">
                {t('franchise.subtitle')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('franchise.title')}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-white/90 text-lg leading-relaxed mb-10">
                {t('franchise.description')}
              </p>
            </RevealOnScroll>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <RevealOnScroll key={benefit.title} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={isInView ? { rotate: 0, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                      className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-300"
                    >
                      <benefit.icon className="w-5 h-5 text-white group-hover:text-[#E53935] transition-colors duration-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-0.5">{benefit.title}</h3>
                      <p className="text-white/70 text-xs">{benefit.description}</p>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>

            {/* CTA Button */}
            <RevealOnScroll delay={0.7}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToFooter}
                  size="lg"
                  className="bg-white text-[#E53935] hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-semibold group transition-all duration-300 hover:shadow-xl"
                >
                  {t('common.joinNow')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </RevealOnScroll>
          </div>

          {/* Image Column */}
          <motion.div
            style={{ y: imageY }}
            className="relative hidden lg:block"
          >
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ perspective: '800px' }}
            >
              <motion.img
                src="/images/franchise.jpg"
                alt="Franchise"
                className="w-full h-[500px] object-cover"
                whileHover={{ rotateY: -3 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E53935]/30 to-transparent" />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="text-3xl font-bold text-[#E53935]">57{t('common.plus')}</div>
              <div className="text-sm text-gray-600">山姆会员店</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="text-3xl font-bold text-[#E53935]">42{t('common.plus')}</div>
              <div className="text-sm text-gray-600">覆盖城市</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
