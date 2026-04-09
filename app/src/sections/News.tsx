import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function News() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const featuredY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const newsArticles = [
    {
      id: 1,
      title: t('news.articles.expansion.title'),
      date: '2024-12-15',
      excerpt: t('news.articles.expansion.desc'),
      image: '/images/news-1.jpg',
      featured: true,
    },
    {
      id: 2,
      title: t('news.articles.certification.title'),
      date: '2024-12-10',
      excerpt: t('news.articles.certification.desc'),
      image: '/images/news-2.jpg',
      featured: false,
    },
    {
      id: 3,
      title: t('news.articles.holiday.title'),
      date: '2024-12-05',
      excerpt: t('news.articles.holiday.desc'),
      image: '/images/news-3.jpg',
      featured: false,
    },
    {
      id: 4,
      title: t('news.articles.technology.title'),
      date: '2024-11-28',
      excerpt: t('news.articles.technology.desc'),
      image: '/images/news-4.jpg',
      featured: false,
    },
  ];

  const featuredArticle = newsArticles.find((a) => a.featured);
  const secondaryArticles = newsArticles.filter((a) => !a.featured);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      id="news"
      ref={sectionRef}
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-3">
              {t('news.subtitle')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
              {t('news.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('news.description')}
            </p>
          </RevealOnScroll>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {featuredArticle && (
            <motion.div
              style={{ y: featuredY }}
              className="lg:row-span-2"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ y: -8 }}
                className="group h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 10 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Date Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
                    className="absolute top-4 left-4 bg-[#E53935] text-white px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{formatDate(featuredArticle.date)}</span>
                  </motion.div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#E53935] transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-white/80 line-clamp-2">{featuredArticle.excerpt}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="mt-4 text-white flex items-center gap-2 text-sm font-medium group/btn"
                    >
                      {t('common.readMore')}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Secondary Articles */}
          <motion.div style={{ y: secondaryY }} className="space-y-6">
            {secondaryArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ x: 40, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 8 }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-40 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#E53935] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-[#E53935] text-sm font-medium flex items-center gap-1 group/btn"
                    >
                      {t('common.readMore')}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
