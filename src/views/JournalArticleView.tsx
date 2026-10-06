import React from 'react';
import { useStore } from '../context/StoreContext';
import { JOURNAL_ARTICLES } from '../data/journal';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { JournalArticle } from '../types';

export const JournalArticleView: React.FC = () => {
  const { selectedArticleId, navigateTo, addToast } = useStore();

  const article = JOURNAL_ARTICLES.find((a: JournalArticle) => a.id === selectedArticleId) || JOURNAL_ARTICLES[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Article link copied to clipboard.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={() => navigateTo('journal')}
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#8A857A] hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to All Essays</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          {article.category} • {article.publishedAt}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium leading-tight">
          {article.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A7870] font-light">
          {article.subtitle}
        </p>

        {/* Author & reading meta */}
        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-[#8A857A] font-mono border-t border-[#EAE6DD] dark:border-[#1E2028]">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-black dark:text-white font-medium">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
          <button
            onClick={handleShare}
            className="hover:text-[#C5A880] transition-colors flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] rounded-sm overflow-hidden bg-[#ECE8E1] dark:bg-[#181A22]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm font-light leading-relaxed space-y-6 text-[#4A4C58] dark:text-[#C8CAD6]">
        {article.content.map((paragraph: string, idx: number) => (
          <p key={idx} className="text-sm sm:text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Secondary Imagery Gallery */}
      {article.secondaryImages && article.secondaryImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          {article.secondaryImages.map((img: string, idx: number) => (
            <div key={idx} className="aspect-[4/3] rounded overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="pt-6 border-t border-[#E8E4DA] dark:border-[#22242D] flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-[#8A857A]">Keywords:</span>
        {article.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 bg-[#EFECE5] dark:bg-[#1A1C24] rounded-full text-[#5C5E6D] dark:text-[#A8ABB9]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
