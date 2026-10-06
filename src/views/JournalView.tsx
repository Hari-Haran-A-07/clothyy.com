import React from 'react';
import { useStore } from '../context/StoreContext';
import { JOURNAL_ARTICLES } from '../data/journal';
import { ArrowRight } from 'lucide-react';
import { JournalArticle } from '../types';

export const JournalView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          ATELIER ESSAYS & TEXTILE RESEARCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium">
          The CLOTHYYY Journal
        </h1>
        <p className="text-xs text-[#7A7870] font-light">
          Dispatches from our ateliers in Florence, Lyon, and Okayama. Deconstructing high-craftsmanship tailoring, fabric innovations, and minimalist design history.
        </p>
      </div>

      {/* Featured Lead Article */}
      {JOURNAL_ARTICLES.length > 0 && (
        <div
          onClick={() => navigateTo('journal-article', { articleId: JOURNAL_ARTICLES[0].id })}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FAF9F6] dark:bg-[#121318] p-6 sm:p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] cursor-pointer hover:border-[#C5A880] transition-all"
        >
          <div className="lg:col-span-7 aspect-[16/10] rounded overflow-hidden bg-[#ECE8E1] dark:bg-[#1A1C24]">
            <img
              src={JOURNAL_ARTICLES[0].image}
              alt={JOURNAL_ARTICLES[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8A857A] uppercase">
                <span className="text-[#C5A880]">{JOURNAL_ARTICLES[0].category}</span>
                <span>•</span>
                <span>{JOURNAL_ARTICLES[0].readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium group-hover:text-[#C5A880] transition-colors leading-snug">
                {JOURNAL_ARTICLES[0].title}
              </h2>
              <p className="text-xs text-[#6C6E7C] dark:text-[#A8AAB9] font-light leading-relaxed">
                {JOURNAL_ARTICLES[0].excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#EAE6DD] dark:border-[#1E2028] mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={JOURNAL_ARTICLES[0].author.avatar}
                  alt={JOURNAL_ARTICLES[0].author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-serif text-xs font-semibold block">
                    {JOURNAL_ARTICLES[0].author.name}
                  </span>
                  <span className="text-[10px] text-[#8A857A] font-mono">
                    {JOURNAL_ARTICLES[0].author.role}
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Full Essay <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {JOURNAL_ARTICLES.slice(1).map((art: JournalArticle) => (
          <div
            key={art.id}
            onClick={() => navigateTo('journal-article', { articleId: art.id })}
            className="group bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] cursor-pointer hover:border-[#C5A880] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] rounded overflow-hidden bg-[#ECE8E1] dark:bg-[#1A1C24] mb-4">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#8A857A] uppercase mb-1.5">
                <span className="text-[#C5A880]">{art.category}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
              <h3 className="font-serif text-xl font-medium group-hover:text-[#C5A880] transition-colors leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-[#6C6E7C] dark:text-[#A8AAB9] font-light mt-2 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAE6DD] dark:border-[#1E2028] mt-6 flex items-center justify-between text-xs">
              <span className="text-[#8A857A] font-mono">{art.publishedAt}</span>
              <span className="font-mono uppercase text-[#C5A880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
