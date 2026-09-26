import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { StoryCategory, StoryItem } from '../types';
import { BookOpen, Calendar, User, ArrowRight, Tag, Sparkles } from 'lucide-react';

export const StoriesView: React.FC = () => {
  const { stories, navigateTo } = useAuvreo();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingStory, setReadingStory] = useState<StoryItem | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'People', label: 'People' },
    { id: 'Ideas', label: 'Ideas' },
    { id: 'Culture', label: 'Culture' },
    { id: 'Dialogue', label: 'Dialogue' },
    { id: 'Delhi', label: 'Delhi' },
    { id: 'Summit', label: 'Summit' },
  ];

  const filteredStories = stories.filter(s => 
    selectedCategory === 'all' || s.category === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          AUVREO PERSPECTIVES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Stories, Ideas & Dispatches
        </h1>
        <p className="text-sm sm:text-base text-[#c9bfbc] leading-relaxed">
          Critical essays, cultural chronicles, and diplomatic investigations from our community of writers, delegates, and fellows.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#e51e2b] text-white shadow-md shadow-[#e51e2b]/30'
                : 'bg-[#140306] text-[#a89c99] hover:text-white border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => (
          <article
            key={story.id}
            onClick={() => setReadingStory(story)}
            className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/60 transition-all flex flex-col justify-between cursor-pointer group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#e51e2b]/20 text-[#e51e2b] font-bold">
                  {story.category}
                </span>
                <span className="text-[#a89c99]">{story.readTime}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#e6c887] transition-colors line-clamp-2">
                {story.title}
              </h3>

              <p className="text-xs text-[#c9beba] line-clamp-3 leading-relaxed">
                {story.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#a89c99]">
              <div>
                <span className="text-white font-medium block">{story.author}</span>
                <span className="text-[10px]">{story.authorRole}</span>
              </div>
              <span className="text-[10px] font-mono text-[#e6c887] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Storyteller Callout */}
      <div className="p-8 rounded-2xl bg-[#140306] border border-[#e6c887]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white">Have a perspective to contribute?</h4>
          <p className="text-xs text-[#a89c99]">
            The Auvreo Storyteller Track invites long-form essays, photojournalism, and cultural investigations.
          </p>
        </div>
        <button
          onClick={() => navigateTo('community')}
          className="px-5 py-2.5 rounded-xl bg-[#e6c887] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3dfa2] shrink-0"
        >
          Submit an Essay
        </button>
      </div>

      {/* Full Article Modal Reader */}
      {readingStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#100305] border border-[#e51e2b]/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#e51e2b]/20 text-[#e51e2b] font-bold uppercase">
                  {readingStory.category}
                </span>
                <span className="text-xs font-mono text-[#a89c99]">{readingStory.date} • {readingStory.readTime}</span>
              </div>
              <button
                onClick={() => setReadingStory(null)}
                className="text-xs font-mono text-[#a89c99] hover:text-white p-1"
              >
                ✕ Close
              </button>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {readingStory.title}
              </h2>
              <div className="flex items-center gap-2 mt-3 text-xs text-[#e6c887]">
                <User className="w-3.5 h-3.5" />
                <span>By {readingStory.author} ({readingStory.authorRole})</span>
              </div>
            </div>

            <div className="text-sm text-[#ded3cf] leading-relaxed space-y-4 pt-2 border-t border-white/5">
              <p className="font-semibold text-[#e6c887] italic">
                {readingStory.excerpt}
              </p>
              <div className="space-y-3">
                {readingStory.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setReadingStory(null)}
                className="px-6 py-2 rounded-xl bg-[#e51e2b] text-white font-bold text-xs uppercase hover:bg-[#ff2438]"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
