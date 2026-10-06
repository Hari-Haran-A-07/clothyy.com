import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CMSContentState } from '../../data/cmsContent';
import { X, Save, RotateCcw, Edit3, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiveCmsModal: React.FC = () => {
  const {
    isCmsCustomizerOpen,
    setIsCmsCustomizerOpen,
    cmsContent,
    updateCmsContent,
    resetCmsContent
  } = useStore();

  const [formData, setFormData] = useState<CMSContentState>({ ...cmsContent });

  if (!isCmsCustomizerOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCmsContent(formData);
    setIsCmsCustomizerOpen(false);
  };

  const handleReset = () => {
    resetCmsContent();
    setIsCmsCustomizerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FAF9F6] dark:bg-[#121318] text-[#121316] dark:text-[#FAF9F6] w-full max-w-2xl rounded-sm border border-[#E3DFD5] dark:border-[#262832] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E4DA] dark:border-[#22242D] flex items-center justify-between bg-[#FAF9F6] dark:bg-[#121318]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#121316] text-[#C5A880] rounded">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium">LIVE ATELIER CMS CUSTOMIZER</h3>
              <p className="text-[10px] font-mono text-[#8A857A] uppercase tracking-wider">
                Instant Real-Time Copy & Visual Content Editor
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCmsCustomizerOpen(false)}
            className="p-1 text-[#8A857A] hover:text-black dark:hover:text-white"
            aria-label="Close CMS Customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          <div className="p-3 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded text-[#8F7249] dark:text-[#DFC8A8] flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>
              All modifications apply instantly to the live storefront and remain persisted in your session.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
                Brand Logo Name
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
                Brand Sub-Tagline
              </label>
              <input
                type="text"
                name="brandTagline"
                value={formData.brandTagline}
                onChange={handleChange}
                className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
              Top Announcement Ticker Message
            </label>
            <input
              type="text"
              name="announcementText"
              value={formData.announcementText}
              onChange={handleChange}
              className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
              Homepage Hero Headline
            </label>
            <input
              type="text"
              name="heroHeadline"
              value={formData.heroHeadline}
              onChange={handleChange}
              className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
              Homepage Hero Subheadline
            </label>
            <textarea
              rows={2}
              name="heroSubheadline"
              value={formData.heroSubheadline}
              onChange={handleChange}
              className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
              Brand Story Manifesto (Paragraph 1)
            </label>
            <textarea
              rows={3}
              name="aboutStoryP1"
              value={formData.aboutStoryP1}
              onChange={handleChange}
              className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
                Concierge Contact Phone
              </label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="font-mono text-[#7A7870] uppercase tracking-wider block mb-1">
                Concierge Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028] flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-[#8A857A] hover:text-[#BD2727] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Atelier Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsCmsCustomizerOpen(false)}
                className="px-4 py-2 text-xs border border-[#DDD8CE] dark:border-[#2C2E38] rounded hover:bg-[#EAE6DD] dark:hover:bg-[#1E2028]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#121316] dark:bg-[#C5A880] text-white dark:text-black font-semibold rounded hover:opacity-90 transition-opacity"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Live Changes</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
