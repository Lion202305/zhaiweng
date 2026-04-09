import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function Certificates() {
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState<{ name: string; description: string; image: string } | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const certificates = [
    {
      id: 1,
      name: t('certificates.items.license.name'),
      description: t('certificates.items.license.desc'),
      image: '/images/certificate-1.jpg',
    },
    {
      id: 2,
      name: t('certificates.items.foodLicense.name'),
      description: t('certificates.items.foodLicense.desc'),
      image: '/images/certificate-2.jpg',
    },
    {
      id: 3,
      name: t('certificates.items.haccp.name'),
      description: t('certificates.items.haccp.desc'),
      image: '/images/certificate-3.jpg',
    },
    {
      id: 4,
      name: t('certificates.items.iso.name'),
      description: t('certificates.items.iso.desc'),
      image: '/images/certificate-4.jpg',
    },
  ];

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231A1A1A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-3">
              {t('certificates.subtitle')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
              {t('certificates.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('certificates.description')}
            </p>
          </RevealOnScroll>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <motion.img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain p-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#E53935]/10 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5 text-[#E53935]" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h3 className="font-bold text-[#1A1A1A] mb-1">{cert.name}</h3>
                  <p className="text-gray-500 text-sm">{cert.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{selectedCert.name}</h3>
                  <p className="text-gray-500 mt-1">{selectedCert.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
