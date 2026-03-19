import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Shield, Truck, Users, Award, Heart, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export function About() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const features = [
    {
      icon: Shield,
      title: t('about.features.quality.title'),
      description: t('about.features.quality.desc'),
    },
    {
      icon: Truck,
      title: t('about.features.delivery.title'),
      description: t('about.features.delivery.desc'),
    },
    {
      icon: Users,
      title: t('about.features.team.title'),
      description: t('about.features.team.desc'),
    },
  ];

  const stats = [
    { value: 5, suffix: t('common.plus'), label: t('about.stats.experience') },
    { value: 42, suffix: t('common.plus'), label: t('about.stats.cities') },
    { value: 57, suffix: t('common.plus'), label: t('about.stats.stores') },
  ];

  const values = [
    { icon: Award, text: '务实', color: 'from-blue-500 to-blue-600' },
    { icon: Sparkles, text: '精工', color: 'from-purple-500 to-purple-600' },
    { icon: Heart, text: '利他', color: 'from-pink-500 to-pink-600' },
    { icon: Shield, text: '感恩', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        style={{ rotate: decorRotate }}
        className="absolute -right-40 top-1/4 w-80 h-80 rounded-full bg-[#E53935]/5"
      />
      <div className="absolute -left-20 bottom-1/4 w-60 h-60 rounded-full bg-gradient-to-br from-[#E53935]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image Column */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about-new.png"
                alt="About Wanxun Meat"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-8 left-4 right-4 sm:left-8 sm:right-8 bg-white rounded-xl shadow-xl p-4 sm:p-6 grid grid-cols-3 gap-2 sm:gap-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E53935]">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8 mt-12 lg:mt-0">
            <RevealOnScroll>
              <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-3">
                {t('about.subtitle')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                {t('about.title')}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <p className="text-xl font-semibold text-[#E53935] mb-6">
                {t('about.companyName')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {t('about.description')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.25}>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('about.description2')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t('about.description3')}
              </p>
            </RevealOnScroll>

            {/* Core Values */}
            <RevealOnScroll delay={0.35}>
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">核心价值观</p>
                <div className="grid grid-cols-4 gap-3">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.text}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                      className={`flex flex-col items-center p-3 rounded-xl bg-gradient-to-br ${value.color} text-white`}
                    >
                      <value.icon className="w-5 h-5 mb-1" />
                      <span className="text-sm font-bold">{value.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Feature Cards */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <RevealOnScroll key={feature.title} delay={0.4 + index * 0.1}>
                  <motion.div
                    whileHover={{ x: 10, borderColor: '#E53935' }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E53935]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E53935] transition-colors duration-300">
                      <feature.icon className="w-5 h-5 text-[#E53935] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-0.5">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Section - Zhaiweng */}
        <div className="relative">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-3">
                {t('about.brand.subtitle')}
              </p>
            </div>
          </RevealOnScroll>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Brand Logo Side */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative p-12 lg:p-16 flex flex-col items-center justify-center bg-gradient-to-br from-[#E53935]/20 to-transparent"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(229, 57, 53, 0.3)',
                        '0 0 40px rgba(229, 57, 53, 0.5)',
                        '0 0 20px rgba(229, 57, 53, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white flex items-center justify-center overflow-hidden"
                  >
                    <img 
                      src="/images/logo.png" 
                      alt="宅翁品牌" 
                      className="w-full h-full object-contain p-3"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center"
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-4xl lg:text-5xl font-bold text-white"
                >
                  {t('about.brand.name')}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="mt-2 text-white/60 text-sm tracking-widest uppercase"
                >
                  ZHAIWENG
                </motion.p>
              </motion.div>

              {/* Brand Content Side */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="p-12 lg:p-16 flex flex-col justify-center"
              >
                <h4 className="text-2xl font-bold text-white mb-4">
                  {t('about.brand.title')}
                </h4>
                <p className="text-white/80 leading-relaxed mb-8">
                  {t('about.brand.description')}
                </p>

                {/* Brand Features */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '精工品质', desc: '严苛标准' },
                    { label: '匠心传承', desc: '百年工艺' },
                    { label: '健康美味', desc: '营养保证' },
                    { label: '安全可靠', desc: '全程溯源' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-[#E53935] font-semibold text-sm">{item.label}</p>
                      <p className="text-white/50 text-xs mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
