import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function Footer() {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const contactInfo = [
    {
      icon: MapPin,
      title: t('footer.address.title'),
      content: t('footer.address.content'),
      detail: t('footer.address.detail'),
    },
    {
      icon: Phone,
      title: t('footer.phone.title'),
      content: t('footer.phone.content'),
      detail: t('footer.phone.detail'),
    },
    {
      icon: Mail,
      title: t('footer.email.title'),
      content: t('footer.email.content'),
      detail: t('footer.email.detail'),
    },
    {
      icon: Clock,
      title: t('footer.hours.title'),
      content: t('footer.hours.content'),
      detail: t('footer.hours.detail'),
    },
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.production'), href: '#production' },
    { name: t('nav.news'), href: '#news' },
    { name: t('nav.franchise'), href: '#franchise' },
    { name: t('nav.contact'), href: '#footer' },
    { name: 'Privacy Policy', href: '#' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="bg-[#1A1A1A] relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />

      {/* Diagonal Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E53935] via-[#C62828] to-[#E53935] origin-left"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info Columns */}
            {contactInfo.map((item, index) => (
              <RevealOnScroll key={item.title} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <motion.div
                    initial={{ rotate: -90, scale: 0 }}
                    animate={isInView ? { rotate: 0, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className="w-12 h-12 rounded-lg bg-[#E53935]/20 flex items-center justify-center mb-4 group-hover:bg-[#E53935] transition-colors duration-300"
                  >
                    <item.icon className="w-6 h-6 text-[#E53935] group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.content}</p>
                  <p className="text-gray-500 text-sm">{item.detail}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Quick Links & Copyright */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Quick Links */}
            <RevealOnScroll>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.03 }}
                    whileHover={{ x: 5, color: '#E53935' }}
                    className="text-gray-400 text-sm hover:text-[#E53935] transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E53935] group-hover:w-full transition-all duration-200" />
                  </motion.a>
                ))}
              </div>
            </RevealOnScroll>

            {/* Logo & Copyright */}
            <RevealOnScroll delay={0.3}>
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#E53935] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/images/logo.png" 
                      alt="汇纳肉业 Logo" 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <span className="text-white font-bold">汇纳肉业</span>
                </div>
                <p className="text-gray-500 text-sm">
                  {t('footer.copyright')}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  {t('footer.icp')}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </footer>
  );
}
