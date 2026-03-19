import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CheckCircle2, Thermometer, Cog, ClipboardCheck } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export function Production() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const features = [
    {
      icon: CheckCircle2,
      title: t('production.features.haccp.title'),
      description: t('production.features.haccp.desc'),
    },
    {
      icon: Thermometer,
      title: t('production.features.coldchain.title'),
      description: t('production.features.coldchain.desc'),
    },
    {
      icon: Cog,
      title: t('production.features.equipment.title'),
      description: t('production.features.equipment.desc'),
    },
    {
      icon: ClipboardCheck,
      title: t('production.features.quality.title'),
      description: t('production.features.quality.desc'),
    },
  ];

  const stats = [
    { value: 10000, suffix: t('common.squareMeter'), label: t('production.stats.area') },
    { value: 5000, suffix: t('common.plus'), label: t('production.stats.capacity') },
    { value: 99.9, suffix: '%', label: t('production.stats.passRate'), isDecimal: true },
  ];

  return (
    <section
      id="production"
      ref={sectionRef}
      className="py-24 bg-[#1A1A1A] relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-dark animate-gradient" />

      {/* Diagonal Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E53935] via-[#C62828] to-[#E53935] origin-left"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div>
            <RevealOnScroll>
              <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-3">
                {t('production.subtitle')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('production.title')}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {t('production.description')}
              </p>
            </RevealOnScroll>

            {/* Feature List */}
            <div className="space-y-4 mb-12">
              {features.map((feature, index) => (
                <RevealOnScroll key={feature.title} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="flex items-start gap-4 p-4 rounded-xl border-l-4 border-transparent hover:border-[#E53935] transition-all duration-300 group"
                  >
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={isInView ? { rotate: 0, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                      className="w-12 h-12 rounded-lg bg-[#E53935]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E53935] transition-colors duration-300"
                    >
                      <feature.icon className="w-6 h-6 text-[#E53935] group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Stats */}
            <RevealOnScroll delay={0.7}>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-[#E53935]">
                      {stat.isDecimal ? (
                        <span>{stat.value}{stat.suffix}</span>
                      ) : (
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Image Column */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY, rotateY: imageRotate }}
            className="relative perspective-1000"
          >
            <motion.div
              initial={{ rotateY: -30, opacity: 0 }}
              animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="/images/production.jpg"
                alt="Modern Production Facility"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="absolute -bottom-6 -left-6 bg-[#E53935] text-white px-6 py-4 rounded-xl shadow-xl"
            >
              <div className="text-2xl font-bold">15{t('common.plus')}</div>
              <div className="text-sm opacity-90">{t('about.stats.experience')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
