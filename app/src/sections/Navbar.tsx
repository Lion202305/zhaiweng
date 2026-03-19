import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.production'), href: '#production' },
    { name: t('nav.news'), href: '#news' },
    { name: t('nav.franchise'), href: '#franchise' },
    { name: t('nav.contact'), href: '#footer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
      style={{ top: isScrolled ? 0 : '40px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${
              isScrolled ? 'bg-[#E53935]' : 'bg-white'
            }`}>
              <img 
                src="/images/logo.png" 
                alt="汇纳肉业 Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span
              className={`text-xl font-bold ${
                isScrolled ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              汇纳肉业
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                className={`relative text-sm font-medium transition-colors group ${
                  isScrolled
                    ? 'text-[#1A1A1A] hover:text-[#E53935]'
                    : 'text-white hover:text-white/80'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-200 group-hover:w-full group-hover:left-0 ${
                    isScrolled ? 'bg-[#E53935]' : 'bg-white'
                  }`}
                />
              </motion.a>
            ))}
          </div>

          {/* Right Section: Language + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher isScrolled={isScrolled} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <Button
                onClick={() => scrollToSection('#footer')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#E53935] text-white hover:bg-[#C62828] hover:scale-105'
                    : 'bg-white text-[#E53935] hover:bg-white/90 hover:scale-105'
                }`}
              >
                {t('common.consultNow')}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 bg-white z-50 lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 p-2 text-[#1A1A1A]"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-[#E53935] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/logo.png" 
                    alt="汇纳肉业 Logo" 
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <span className="text-xl font-bold text-[#1A1A1A]">汇纳肉业</span>
              </div>

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="py-4 text-lg font-medium text-[#1A1A1A] border-b border-gray-100 hover:text-[#E53935] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <Button
                onClick={() => scrollToSection('#footer')}
                className="mt-6 bg-[#E53935] text-white hover:bg-[#C62828] rounded-full py-3"
              >
                {t('common.consultNow')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
