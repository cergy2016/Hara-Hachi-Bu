import React, { useState } from 'react';
import { ArrowRight, Heart, Sparkles, Utensils, Wind, CheckCircle2 } from 'lucide-react';
import { zenAudio } from '../utils/audio';

interface HalfwayPauseModalProps {
  onContinueMeal: (fullnessRating: number) => void;
  onFinishEarly: (fullnessRating: number) => void;
}

const FULLNESS_SCALE = [
  { level: 2, label: '01 • Ravenous', desc: 'Stomach feels hollow' },
  { level: 4, label: '02 • Appetite Softening', desc: 'Initial hunger fading' },
  { level: 6, label: '03 • Lightly Fed', desc: 'Comfortable nourishment' },
  { level: 8, label: '04 • Hara Hachi Bu (80%)', desc: 'Energized, clear, room to breathe', isTarget: true },
  { level: 10, label: '05 • Stuffed / Heavy', desc: 'Ate past capacity' },
];

export const HalfwayPauseModal: React.FC<HalfwayPauseModalProps> = ({
  onContinueMeal,
  onFinishEarly,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(8);

  return (
    <div id="halfway-pause-screen" className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 min-h-[580px] border-b border-[#333333]/10 animate-fade-in">
      
      {/* Left Column: Halfway Assessment & Resumption Action */}
      <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#333333]/10 p-8 sm:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#8A9A5B]"></div>
            <span className="uppercase tracking-[0.3em] text-[10px] font-sans font-bold text-[#8A9A5B]">
              Halfway Pause Active &bull; 腹八分目
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#333333] mb-4 leading-[1.15]">
            The 80% Full Rule
          </h2>

          <p className="text-[#555555] leading-relaxed text-base sm:text-lg mb-6 font-serif max-w-sm">
            The stomach takes about 20 minutes to signal the brain that it is full. We pause here to let your senses catch up with your meal.
          </p>

          {/* Satiety Level Selection */}
          <div className="space-y-3 mb-8">
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#333333]/70 block">
              Where is your fullness right now?
            </span>
            <div className="grid grid-cols-1 gap-2">
              {FULLNESS_SCALE.map((item) => {
                const isSelected = selectedRating === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setSelectedRating(item.level)}
                    className={`p-3 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? item.isTarget
                          ? 'bg-[#8A9A5B] text-white border-[#8A9A5B] shadow-xs'
                          : 'bg-[#333333] text-white border-[#333333]'
                        : 'bg-white text-[#333333] border-[#333333]/10 hover:border-[#8A9A5B]/40'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-sans font-bold block">
                        {item.label}
                      </span>
                      <span className={`text-[10px] font-sans ${isSelected ? 'text-white/80' : 'text-[#777777]'}`}>
                        {item.desc}
                      </span>
                    </div>
                    {item.isTarget && (
                      <span className={`text-[9px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#8A9A5B]/15 text-[#8A9A5B]'
                      }`}>
                        Target 80%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#333333]/10">
          <button
            id="btn-resume-second-half"
            type="button"
            onClick={() => {
              zenAudio.playSingingBowl('start');
              onContinueMeal(selectedRating);
            }}
            className="flex-1 bg-[#333333] text-white font-sans uppercase tracking-[0.2em] text-[11px] px-8 py-5 rounded-full hover:bg-[#444444] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Resume Second Half</span>
            <ArrowRight size={14} />
          </button>

          <button
            id="btn-finish-meal-satisfied"
            type="button"
            onClick={() => {
              zenAudio.playSingingBowl('complete');
              onFinishEarly(selectedRating);
            }}
            className="bg-white border border-[#333333]/15 text-[#333333] font-sans uppercase tracking-[0.15em] text-[10px] px-5 py-4 rounded-full hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Heart size={13} className="text-[#8A9A5B]" />
            <span>Satisfied Now (End)</span>
          </button>
        </div>
      </div>

      {/* Right Column: Three Editorial Mindfulness Cards */}
      <div className="lg:col-span-7 bg-[#F9F6F1] p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <span className="text-[10px] uppercase tracking-widest font-sans font-bold opacity-40">
            Mindfulness Prompts
          </span>
        </div>

        <div className="w-full space-y-4 sm:space-y-6 mt-10 mb-8 relative z-10">
          {/* Card 01 */}
          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#333333]/5 transform hover:-translate-y-1 transition-all">
            <div className="flex gap-6 items-start">
              <span className="font-sans text-[#8A9A5B] font-bold text-xs mt-1">01</span>
              <div>
                <h3 className="text-xl font-serif mb-1 text-[#333333]">Put down your utensils</h3>
                <p className="text-sm text-[#777777] font-sans">
                  Rest your hands and take a moment to look away from your plate. Break the mechanical habit of continuous eating.
                </p>
              </div>
            </div>
          </div>

          {/* Card 02 (Featured Highlight in Theme Color) */}
          <div className="group bg-[#8A9A5B] p-6 sm:p-8 rounded-2xl shadow-md transform hover:-translate-y-1 transition-all">
            <div className="flex gap-6 items-start text-white">
              <span className="font-sans font-bold text-xs mt-1 opacity-70">02</span>
              <div>
                <h3 className="text-xl font-serif mb-1">Check your satiety level</h3>
                <p className="text-sm opacity-90 font-sans">
                  Are you satisfied, or just eating out of habit? Honor your body&apos;s natural silence before taking another bite.
                </p>
              </div>
            </div>
          </div>

          {/* Card 03 */}
          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#333333]/5 transform hover:-translate-y-1 transition-all">
            <div className="flex gap-6 items-start">
              <span className="font-sans text-[#8A9A5B] font-bold text-xs mt-1">03</span>
              <div>
                <h3 className="text-xl font-serif mb-1 text-[#333333]">Take a deep breath</h3>
                <p className="text-sm text-[#777777] font-sans">
                  Clearing your palate with a sip of water allows you to appreciate the remaining flavors more fully.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Big Watermark */}
        <div className="text-[120px] font-sans font-bold text-[#333333]/5 absolute bottom-[-20px] right-8 pointer-events-none select-none">
          80%
        </div>
      </div>

    </div>
  );
};
