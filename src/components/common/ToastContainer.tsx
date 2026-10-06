import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto bg-[#121316] text-[#FAF9F6] border border-[#2C2D35] px-5 py-4 rounded-sm shadow-2xl flex items-start justify-between gap-3 text-sm tracking-wide backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-[#E05252] flex-shrink-0" />
              )}
              <span className="font-light text-xs sm:text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8E909A] hover:text-white transition-colors p-0.5"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
