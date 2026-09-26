import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { Story } from '../types';
import { 
  BookOpen, 
  Clock, 
  User, 
  Send, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Tag, 
  Sparkles,
  X
} from 'lucide-react';

export const PerspectivesView: React.FC = () => {
  const { stories, addStory } = useAuvreo();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    authorRole: '',
    category: 'Dialogue' as Story['category'],
    summary: '',
    content: '',
    readTime: '6 min read'
  });

  const categories = ['All', 'Dialogue', 'Ideas', 'Culture', 'People', 'Delhi', 'Summit'];

  const filteredStories = activeCategory === 'All' 
    ? stories 
    : stories.filter(s => s.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStory({
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: formData.title,
      author: formData.author,
      authorRole: formData.authorRole || 'Contributing Fellow',
      category: formData.category,
      excerpt: formData.summary,
      content: formData.content.split('\n\n').filter(Boolean),
      readTime: formData.readTime,
      date: new Date().toISOString().split('T')[0]
    });
    setSubmitSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          PILLAR 02 • SOVEREIGN SCHOLARSHIP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Auvreo Perspectives
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          The editorial and intellectual organ of Auvreo. Long-form essays, policy briefs, and cultural critiques authored by delegates, fellows, and independent scholars.
        </p>

        <div className="pt-2">
          <button
            onClick={() => {
              setIsSubmitOpen(true);
              setSubmitSuccess(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#e51e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff2438] transition-colors shadow-lg shadow-[#e51e2b]/30 inline-flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit a Perspective / Brief</span>
          </button>
        </div>
      </div>

      {/* Editorial Mission */}
      <div className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-mono text-[#e6c887] font-bold uppercase tracking-wider">
            EDITORIAL STANDARDS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Rigorous, Unscripted, and Non-Partisan.
          </h3>
          <p className="text-xs text-[#c9beba] leading-relaxed">
            We publish perspectives that prioritize primary source analysis, historical consciousness, and regional ground truths over partisan talking points. Every published dispatch undergoes peer review by our editorial collective.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#090102] border border-white/10 text-xs text-[#a89c99] shrink-0 text-center">
          <span className="block font-mono text-[#e6c887] text-lg font-bold">100%</span>
          <span>Youth-Authored Research</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-[#e51e2b] text-white shadow-md shadow-[#e51e2b]/30'
                : 'bg-[#140306] border border-white/5 text-[#a89c99] hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/60 transition-all flex flex-col justify-between cursor-pointer group space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#e6c887] font-semibold">{story.category}</span>
                <span className="text-[#8e8280] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {story.readTime}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white group-hover:text-[#e6c887] transition-colors leading-snug">
                {story.title}
              </h4>

              <p className="text-xs text-[#b8adaa] leading-relaxed line-clamp-3">
                {story.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2a060d] border border-[#e51e2b]/40 flex items-center justify-center text-[10px] font-bold text-white">
                  {story.author[0]}
                </div>
                <div>
                  <div className="font-semibold text-white">{story.author}</div>
                  <div className="text-[10px] text-[#8e8280]">{story.authorRole}</div>
                </div>
              </div>

              <span className="text-[#e51e2b] group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#120306] border border-[#e51e2b]/40 p-6 sm:p-10 shadow-2xl space-y-6 text-left">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-[#a89c99] hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e6c887]">
                <span>{selectedStory.category}</span>
                <span>•</span>
                <span>{selectedStory.date}</span>
                <span>•</span>
                <span>{selectedStory.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                {selectedStory.title}
              </h2>
              <div className="flex items-center gap-2 pt-1 text-xs text-[#c9beba]">
                <span>By <strong className="text-white">{selectedStory.author}</strong></span>
                <span>—</span>
                <span className="text-[#8e8280]">{selectedStory.authorRole}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090102] border border-white/5 text-xs text-[#e6c887] italic font-serif">
              "{selectedStory.excerpt}"
            </div>

            <div className="space-y-4 text-sm text-[#d5ccc8] leading-relaxed pt-2 border-t border-white/10">
              {selectedStory.content.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#8e8280]">
              <span>Published by Auvreo Perspectives Archive</span>
              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-1.5 rounded-lg bg-[#e51e2b] text-white font-semibold"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#140306] border border-[#e51e2b]/50 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-[#a89c99] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#e6c887] font-bold uppercase tracking-wider">
                EDITORIAL CONTRIBUTIONS
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Submit an Essay, Op-Ed, or Policy Brief
              </h3>
              <p className="text-xs text-[#a89c99]">
                Reviewed by the Auvreo Editorial Collective. Submissions must be original and cite empirical sources.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
                <h4 className="text-base font-bold text-white">Perspective Transmitted to Board</h4>
                <p className="text-xs text-[#c9bfbc] max-w-md mx-auto">
                  Your piece "{formData.title}" has been registered in the editorial queue. You will receive an editorial feedback dispatch within 5 working days.
                </p>
                <button
                  onClick={() => setIsSubmitOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#140306] border border-white/20 text-xs text-white"
                >
                  Return to Archive
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#a89c99] mb-1 font-mono uppercase">Author Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={e => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a89c99] mb-1 font-mono uppercase">Author Title / Affiliation *</label>
                    <input
                      type="text"
                      required
                      value={formData.authorRole}
                      onChange={e => setFormData({ ...formData, authorRole: e.target.value })}
                      placeholder="e.g. Delegate, UNCSW / Student of Law, DU"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#a89c99] mb-1 font-mono uppercase">Article Category *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as Story['category'] })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                    >
                      <option value="Dialogue">Dialogue</option>
                      <option value="Ideas">Ideas</option>
                      <option value="Culture">Culture</option>
                      <option value="People">People</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Summit">Summit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#a89c99] mb-1 font-mono uppercase">Estimated Reading Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#a89c99] mb-1 font-mono uppercase">Headline / Working Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. The Quiet Consensus: Cross-Bloc Deliberation in Post-Colonial Assemblies"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                  />
                </div>

                <div>
                  <label className="block text-[#a89c99] mb-1 font-mono uppercase">Abstract / Executive Summary (2-3 sentences) *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.summary}
                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Provide a concise distillation of the central thesis and findings..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[#a89c99] mb-1 font-mono uppercase">Full Article Content *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Paste your essay, policy memorandum, or dispatch here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] font-mono text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#e51e2b]/30"
                >
                  Submit Perspective for Editorial Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
