import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

export function TopBar() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#E53935] text-white py-2.5 clip-diagonal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm font-medium"
          >
            {t('common.welcome')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center gap-6"
          >
            <a
              href={`tel:${t('common.phone')}`}
              className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{t('common.phone')}</span>
            </a>
            <a
              href={`mailto:${t('common.email')}`}
              className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{t('common.email')}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
