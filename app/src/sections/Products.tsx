import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function Products() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: t('products.categories.all') },
    { key: 'fresh', label: t('products.categories.fresh') },
    { key: 'processed', label: t('products.categories.processed') },
    { key: 'poultry', label: t('products.categories.poultry') },
  ];

  const products = [
    {
      id: 1,
      name: t('products.items.porkBelly.name'),
      category: 'fresh',
      description: t('products.items.porkBelly.desc'),
      image: '/images/product-1.jpg',
    },
    {
      id: 2,
      name: t('products.items.tenderloin.name'),
      category: 'fresh',
      description: t('products.items.tenderloin.desc'),
      image: '/images/product-2.jpg',
    },
    {
      id: 3,
      name: t('products.items.hindLeg.name'),
      category: 'fresh',
      description: t('products.items.hindLeg.desc'),
      image: '/images/product-3.jpg',
    },
    {
      id: 4,
      name: t('products.items.shoulder.name'),
      category: 'fresh',
      description: t('products.items.shoulder.desc'),
      image: '/images/product-4.jpg',
    },
    {
      id: 5,
      name: t('products.items.frontLeg.name'),
      category: 'fresh',
      description: t('products.items.frontLeg.desc'),
      image: '/images/product-5.jpg',
    },
    {
      id: 6,
      name: t('products.items.trotters.name'),
      category: 'fresh',
      description: t('products.items.trotters.desc'),
      image: '/images/product-6.jpg',
    },
    {
      id: 7,
      name: t('products.items.thickCutPorkChop.name'),
      category: 'processed',
      description: t('products.items.thickCutPorkChop.desc'),
      image: '/images/厚切炸猪排新包装正面.png',
    },
    {
      id: 8,
      name: t('products.items.taiwanSausageBlackPepper.name'),
      category: 'processed',
      description: t('products.items.taiwanSausageBlackPepper.desc'),
      image: '/images/台式香肠黑椒风味独立.png',
    },
    {
      id: 9,
      name: t('products.items.taiwanSausageGarlic.name'),
      category: 'processed',
      description: t('products.items.taiwanSausageGarlic.desc'),
      image: '/images/台式香肠蒜香风味正面.png',
    },
    {
      id: 10,
      name: t('products.items.noodlesWithSausage.name'),
      category: 'processed',
      description: t('products.items.noodlesWithSausage.desc'),
      image: '/images/面+条肠270g.png',
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="products"
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E53935' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <RevealOnScroll>
            <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-3">
              {t('products.subtitle')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
              {t('products.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('products.description')}
            </p>
          </RevealOnScroll>
        </div>

        {/* Filter Tabs */}
        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-[#E53935] text-white shadow-lg shadow-[#E53935]/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Products Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 80, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-50">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                        product.category === 'fresh' ? 'bg-[#E53935]' : 'bg-[#1A1A1A]'
                      }`}>
                        {product.category === 'fresh' ? t('products.categories.fresh') : t('products.categories.processed')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#E53935] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 flex-1">{product.description}</p>
                    
                    {/* Action */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-3 border-t border-gray-100"
                    >
                      <button className="text-[#E53935] text-sm font-medium flex items-center gap-2 group/btn">
                        {t('common.learnMore')}
                        <span className="group-hover/btn:translate-x-1 transition-transform">
                          →
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
