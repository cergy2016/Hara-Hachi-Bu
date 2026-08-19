import React, { useState } from 'react';
import { RotateCcw, BookOpen, Check, Copy } from 'lucide-react';
import { MealSessionRecord } from '../types';

interface CompletionScreenProps {
  session: MealSessionRecord;
  onRestart: () => void;
  onOpenPhilosophy: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  session,
  onRestart,
  onOpenPhilosophy,
}) => {
  const [copied, setCopied] = useState(false);
  const durationMin = Math.max(1, Math.round(session.actualSeconds / 60));

  const handleShare = () => {
    const text = `I just practiced Hara Hachi Bu (eating until 80% full) with a ${durationMin}-minute mindful meal pacing session! 腹八分目`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div id="completion-screen" className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 min-h-[580px] border-b border-[#333333]/10">
      
      {/* Left Column: Outcome & Next Steps */}
      <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#333333]/10 p-8 sm:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#8A9A5B]"></div>
            <span className="uppercase tracking-[0.3em] text-[10px] font-sans font-bold text-[#8A9A5B]">
              Session Concluded &bull; 腹八分目
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif italic tracking-tight text-[#333333] mb-4 leading-[1.15]">
            Meal Complete
          </h2>

          <p className="text-[#555555] leading-relaxed text-base sm:text-lg mb-6 font-serif max-w-sm">
            You paced your dining, honored the biological 20-minute satiety curve, and listened to your body&apos;s natural limits.
          </p>

          <div className="bg-white p-6 rounded-2xl border border-[#333333]/10 mb-6 shadow-xs">
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#8A9A5B] block mb-1">
              Okinawan Longevity Maxim
            </span>
            <p className="text-sm text-[#444444] font-serif italic leading-relaxed">
              &ldquo;Eight parts of a full stomach sustain the person; the other two parts sustain the doctor.&rdquo;
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#333333]/10">
          <button
            id="btn-restart-meal"
            type="button"
            onClick={onRestart}
            className="flex-1 bg-[#333333] text-white font-sans uppercase tracking-[0.2em] text-[11px] px-8 py-5 rounded-full hover:bg-[#444444] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <RotateCcw size={13} />
            <span>Pace Next Meal</span>
          </button>

          <button
            id="btn-share-reflection"
            type="button"
            onClick={handleShare}
            className="bg-white border border-[#333333]/15 text-[#333333] font-sans uppercase tracking-[0.15em] text-[10px] px-5 py-4 rounded-full hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check size={13} className="text-[#8A9A5B]" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Right Column: Statistics & Satiety Summary Cards */}
      <div className="lg:col-span-7 bg-[#F9F6F1] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="text-[140px] font-sans font-bold text-[#333333]/5 absolute -bottom-8 -right-4 pointer-events-none select-none">
          80%
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#333333]/60 block mb-6">
            Session Analytics
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 mb-6">
            <div className="bg-white p-6 rounded-2xl border border-[#333333]/5 shadow-sm">
              <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-[#777777] block mb-2">
                Mindful Time Paced
              </span>
              <div className="text-4xl font-serif font-bold text-[#333333]">
                {durationMin} <span className="text-base font-normal font-sans text-[#777777]">minutes</span>
              </div>
            </div>

            <div className="bg-[#8A9A5B] p-6 rounded-2xl shadow-md text-white">
              <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-white/80 block mb-2">
                Hara Hachi Bu Score
              </span>
              <div className="text-4xl font-serif font-bold text-white">
                {session.fullnessRating} <span className="text-base font-normal font-sans text-white/80">/ 10</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#333333]/5 shadow-sm relative z-10 space-y-2">
            <h3 className="text-xl font-serif text-[#333333] font-semibold">
              Satiety Integration
            </h3>
            <p className="text-sm text-[#666666] font-sans leading-relaxed">
              By stopping at 80% fullness, you prevent metabolic sluggishness, reduce oxidative stress, and sustain steady energy throughout your afternoon or evening.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#333333]/10 flex items-center justify-between relative z-10 text-[11px] font-sans uppercase tracking-wider text-[#777777]">
          <span>ChungBooks.fr Lifestyle Archive</span>
          <button
            onClick={onOpenPhilosophy}
            className="text-[#8A9A5B] font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <BookOpen size={13} />
            <span>Read Complete Essay</span>
          </button>
        </div>

      </div>
    </div>
  );
};
