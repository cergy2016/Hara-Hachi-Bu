import React, { useState } from 'react';
import { ArrowRight, Sliders, UtensilsCrossed, Clock } from 'lucide-react';
import { MealPreset } from '../types';

interface SetupScreenProps {
  onStartMeal: (config: { totalMinutes: number; halfwayMinutes: number; bitePacerEnabled: boolean }) => void;
}

const PRESETS: MealPreset[] = [
  {
    id: 'standard-20',
    name: '20 Minutes',
    totalMinutes: 20,
    halfwayMinutes: 10,
    tagline: 'Standard Okinawan Pace',
    recommendedFor: 'Optimal 20-minute window for gut-to-brain leptin signals.'
  },
  {
    id: 'brisk-15',
    name: '15 Minutes',
    totalMinutes: 15,
    halfwayMinutes: 7.5,
    tagline: 'Brisk Mindful Lunch',
    recommendedFor: 'Designed for midday meals with an intentional 7.5 min pause.'
  },
  {
    id: 'dinner-25',
    name: '25 Minutes',
    totalMinutes: 25,
    halfwayMinutes: 12.5,
    tagline: 'Slow Dining & Gathering',
    recommendedFor: 'Evening dinners and relaxed mindful conversation.'
  }
];

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStartMeal }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('standard-20');
  const [customMinutes, setCustomMinutes] = useState<number>(20);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [bitePacerEnabled, setBitePacerEnabled] = useState<boolean>(true);

  const selectedPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleStart = () => {
    if (isCustom) {
      onStartMeal({
        totalMinutes: customMinutes,
        halfwayMinutes: customMinutes / 2,
        bitePacerEnabled
      });
    } else {
      onStartMeal({
        totalMinutes: selectedPreset.totalMinutes,
        halfwayMinutes: selectedPreset.halfwayMinutes,
        bitePacerEnabled
      });
    }
  };

  return (
    <div id="setup-screen" className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 min-h-[580px] border-b border-[#333333]/10">
      
      {/* Left Column: Editorial Concept & Action */}
      <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#333333]/10 p-8 sm:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#8A9A5B]"></div>
            <span className="uppercase tracking-[0.25em] text-[10px] font-sans font-bold text-[#8A9A5B]">
              Mindful Dining Pacing
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#333333] mb-5 leading-[1.15]">
            The 80% Full Rule
          </h2>

          <p className="text-[#555555] leading-relaxed text-base sm:text-lg mb-6 max-w-md font-serif">
            The stomach takes approximately 15 to 20 minutes to signal the brain that it has received nourishment. By introducing an intentional halfway pause, we let your senses catch up with your meal.
          </p>

          {/* Quick Principle Highlight */}
          <div className="border-l-2 border-[#8A9A5B] pl-4 py-1 mb-8">
            <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-[#333333] block mb-1">
              腹八分目に医者いらず
            </span>
            <p className="text-xs text-[#777777] italic font-serif">
              &ldquo;Eight parts of a full stomach sustain the person; the other two parts sustain the doctor.&rdquo;
            </p>
          </div>
        </div>

        <div>
          <button
            id="btn-start-meal"
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto bg-[#333333] text-white font-sans uppercase tracking-[0.2em] text-[11px] px-10 py-5 rounded-full hover:bg-[#444444] transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-sm group"
          >
            <span>Begin Mindful Meal</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Right Column: Duration Preset Cards & Parameters */}
      <div className="lg:col-span-7 bg-[#F9F6F1] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Background Watermark */}
        <div className="text-[140px] font-sans font-bold text-[#333333]/5 absolute -bottom-8 -right-4 pointer-events-none select-none">
          80%
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#333333]/60">
              01 &bull; Duration Selection
            </span>
            <button
              id="btn-toggle-custom-duration"
              type="button"
              onClick={() => setIsCustom(!isCustom)}
              className="text-[11px] text-[#8A9A5B] hover:text-[#6E7D46] font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders size={12} />
              <span>{isCustom ? 'Standard Presets' : 'Custom Pace'}</span>
            </button>
          </div>

          {!isCustom ? (
            <div className="space-y-4 relative z-10">
              {PRESETS.map((preset, idx) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    id={`preset-${preset.id}`}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`group p-6 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#8A9A5B] text-white shadow-md border-transparent -translate-y-0.5'
                        : 'bg-white text-[#333333] border-[#333333]/10 hover:border-[#8A9A5B]/40 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className={`font-sans font-bold text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-[#8A9A5B]'}`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-serif font-semibold">
                              {preset.name}
                            </h3>
                            {preset.id === 'standard-20' && (
                              <span className={`text-[9px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 rounded-full ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-[#8A9A5B]/15 text-[#8A9A5B]'
                              }`}>
                                Classic
                              </span>
                            )}
                          </div>
                          <p className={`text-xs sm:text-sm font-sans mt-1 ${isSelected ? 'text-white/90' : 'text-[#777777]'}`}>
                            {preset.recommendedFor}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`text-[10px] uppercase tracking-widest font-sans font-medium block ${isSelected ? 'text-white/70' : 'text-[#8A9A5B]'}`}>
                          Halfway Cue
                        </span>
                        <span className="text-sm font-bold font-sans">
                          {preset.halfwayMinutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-[#333333]/10 space-y-6 relative z-10 shadow-sm">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#333333]/60">Target Duration:</span>
                <span className="text-3xl font-serif font-bold text-[#8A9A5B]">
                  {customMinutes} Minutes
                </span>
              </div>
              <input
                id="slider-custom-minutes"
                type="range"
                min="5"
                max="45"
                step="1"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Number(e.target.value))}
                className="w-full h-1.5 bg-[#EAE5DC] rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
              />
              <div className="flex justify-between text-[11px] font-sans text-[#777777]">
                <span>5m Express</span>
                <span>Pause at: <strong className="text-[#333333]">{(customMinutes / 2).toFixed(1)}m</strong></span>
                <span>45m Banquet</span>
              </div>
            </div>
          )}
        </div>

        {/* Secondary Parameter Card */}
        <div className="mt-8 pt-6 border-t border-[#333333]/10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8A9A5B]/15 text-[#8A9A5B] flex items-center justify-center">
              <UtensilsCrossed size={14} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider font-sans text-[#333333]">
                Rhythmic Chew & Utensil Rest
              </div>
              <div className="text-[11px] text-[#777777] font-sans">
                Subtle 30-second pacing cues to breathe and set down cutlery
              </div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="toggle-bite-pacer"
              type="checkbox"
              checked={bitePacerEnabled}
              onChange={(e) => setBitePacerEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#E0DAD0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8A9A5B]"></div>
          </label>
        </div>

      </div>
    </div>
  );
};
