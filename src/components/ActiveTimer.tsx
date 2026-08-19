import React, { useState, useEffect } from 'react';
import { Pause, Play, RotateCcw, Plus, Minus, CheckCircle2, Wind, FastForward } from 'lucide-react';
import { TimerPhase } from '../types';
import { zenAudio } from '../utils/audio';

interface ActiveTimerProps {
  totalSeconds: number;
  remainingSeconds: number;
  halfwaySeconds: number;
  currentPhase: TimerPhase;
  isPaused: boolean;
  bitePacerEnabled: boolean;
  onTogglePause: () => void;
  onAddMinute: () => void;
  onSubtractMinute: () => void;
  onTriggerCheckIn: () => void;
  onReset: () => void;
}

const MINDFUL_PROMPTS = [
  {
    num: '01',
    title: 'Put down your utensils',
    desc: 'Rest your hands and take a moment to look away from your plate. Disconnect from the mechanical motion.'
  },
  {
    num: '02',
    title: 'Check your satiety level',
    desc: 'Are you satisfied, or just eating out of habit? Honor your body\'s natural silence before taking another bite.'
  },
  {
    num: '03',
    title: 'Take a deep breath',
    desc: 'Clearing your palate with a sip of water allows you to appreciate the remaining flavors more fully.'
  },
  {
    num: '04',
    title: 'Chew thoroughly & savor',
    desc: 'Chew each bite 20–30 times to aid digestion and unlock deeper nutrient absorption.'
  }
];

export const ActiveTimer: React.FC<ActiveTimerProps> = ({
  totalSeconds,
  remainingSeconds,
  halfwaySeconds,
  currentPhase,
  isPaused,
  bitePacerEnabled,
  onTogglePause,
  onAddMinute,
  onSubtractMinute,
  onTriggerCheckIn,
  onReset,
}) => {
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [biteCycleSeconds, setBiteCycleSeconds] = useState(0);

  // Auto rotate prompts every 15s if user hasn't clicked
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromptIdx((prev) => (prev + 1) % MINDFUL_PROMPTS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Bite pacer 30-second cycle
  useEffect(() => {
    if (!bitePacerEnabled || isPaused) return;
    const interval = setInterval(() => {
      setBiteCycleSeconds((prev) => (prev + 1) % 30);
    }, 1000);
    return () => clearInterval(interval);
  }, [bitePacerEnabled, isPaused]);

  const formatTime = (secs: number) => {
    const m = Math.floor(Math.max(0, secs) / 60);
    const s = Math.max(0, secs) % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isFirstHalf = remainingSeconds > totalSeconds - halfwaySeconds;
  const timeUntilPause = remainingSeconds - (totalSeconds - halfwaySeconds);
  const elapsedSecs = totalSeconds - remainingSeconds;
  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedSecs / totalSeconds) * 100)));

  return (
    <div id="active-timer-view" className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 min-h-[580px] border-b border-[#333333]/10 animate-fade-in">
      
      {/* Left Column: Live Countdown Display & Controls */}
      <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#333333]/10 p-8 sm:p-12 flex flex-col justify-between">
        <div>
          {/* Phase Badge & Live Pulse Indicator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-[#8A9A5B]"></div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-[#777777]' : 'bg-[#8A9A5B] animate-ping'}`}></span>
              <span className="uppercase tracking-[0.25em] text-[10px] font-sans font-bold text-[#8A9A5B]">
                {isPaused ? 'Timer Paused' : isFirstHalf ? 'Phase 01: Slow Dining (Active)' : 'Phase 02: 80% Full Assessment'}
              </span>
            </div>
          </div>

          {/* Large Editorial Countdown Digits */}
          <div className="my-4">
            <div
              id="timer-display-editorial"
              className="text-7xl sm:text-8xl md:text-[108px] leading-[0.85] font-serif font-bold tracking-tighter text-[#333333] select-none"
            >
              {formatTime(remainingSeconds)}
            </div>

            {/* Live Progress Bar */}
            <div className="w-full bg-[#EAE5DC] h-1.5 rounded-full mt-6 overflow-hidden">
              <div
                className="bg-[#8A9A5B] h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Live Stats */}
            <div className="flex justify-between items-center text-[11px] font-sans text-[#777777] uppercase tracking-wider mt-3">
              <span>Elapsed: <strong className="text-[#333333] font-mono">{formatTime(elapsedSecs)}</strong></span>
              {isFirstHalf ? (
                <span>Halfway Pause In: <strong className="text-[#8A9A5B] font-mono">{formatTime(Math.max(0, timeUntilPause))}</strong></span>
              ) : (
                <span>Remaining: <strong className="text-[#8A9A5B] font-mono">{formatTime(remainingSeconds)}</strong></span>
              )}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <h2 className="text-2xl sm:text-3xl font-serif italic text-[#333333] mb-2">
              {isPaused ? 'Session Paused' : isFirstHalf ? 'Slow Down & Savor' : 'Honoring 80% Satiety'}
            </h2>
            <p className="text-[#555555] leading-relaxed text-sm sm:text-base font-serif max-w-sm">
              {isPaused
                ? 'Click "Resume" to continue your mindful meal timer.'
                : isFirstHalf
                ? 'Chew without hurry. Give your digestive receptors the 15–20 minutes required to register satisfaction.'
                : 'Notice the moment you feel refreshed rather than overfull. Hara Hachi Bu gives you energy for the rest of your day.'}
            </p>
          </div>
        </div>

        {/* Primary Controls Row */}
        <div className="pt-6 border-t border-[#333333]/10 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Play / Pause Toggle Button */}
            <button
              id="btn-timer-pause-toggle"
              type="button"
              onClick={onTogglePause}
              className="flex-1 min-w-[140px] bg-[#333333] text-white font-sans uppercase tracking-[0.2em] text-[11px] px-6 py-4 rounded-full hover:bg-[#444444] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isPaused ? <Play size={14} className="fill-white text-white" /> : <Pause size={14} />}
              <span>{isPaused ? 'Resume Timer' : 'Pause Timer'}</span>
            </button>

            {/* Check in / Halfway Trigger */}
            <button
              id="btn-timer-trigger-checkin"
              type="button"
              onClick={onTriggerCheckIn}
              className="bg-white border border-[#333333]/20 text-[#333333] font-sans uppercase tracking-[0.15em] text-[11px] px-5 py-4 rounded-full hover:border-[#8A9A5B] hover:text-[#8A9A5B] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Trigger Halfway Check-in now"
            >
              <CheckCircle2 size={14} className="text-[#8A9A5B]" />
              <span>Check-In Now</span>
            </button>
          </div>

          {/* Secondary Quick Adjust Buttons */}
          <div className="flex items-center justify-between text-xs font-sans text-[#777777] pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onAddMinute}
                className="px-3 py-1.5 rounded-full bg-white border border-[#333333]/15 text-[#333333] hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-colors cursor-pointer text-[11px] font-bold"
                title="Add 1 minute"
              >
                +1 min
              </button>
              <button
                type="button"
                onClick={onSubtractMinute}
                className="px-3 py-1.5 rounded-full bg-white border border-[#333333]/15 text-[#333333] hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-colors cursor-pointer text-[11px] font-bold"
                title="Subtract 1 minute / Fast forward"
              >
                -1 min
              </button>
            </div>

            <button
              id="btn-timer-reset"
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#777777] hover:text-[#333333] cursor-pointer"
              title="Reset session to setup"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Prompt Cards & Bite Pacer */}
      <div className="lg:col-span-7 bg-[#F9F6F1] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="text-[140px] font-sans font-bold text-[#333333]/5 absolute -bottom-8 -right-4 pointer-events-none select-none">
          80%
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#333333]/60">
              Interactive Mindfulness Cards (Click to Focus)
            </span>
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#8A9A5B]">
              Prompt 0{activePromptIdx + 1} / 0{MINDFUL_PROMPTS.length}
            </span>
          </div>

          {/* Interactive Clickable Prompt Cards */}
          <div className="space-y-3.5 relative z-10">
            {MINDFUL_PROMPTS.map((prompt, idx) => {
              const isActive = activePromptIdx === idx;
              return (
                <div
                  key={prompt.num}
                  onClick={() => {
                    setActivePromptIdx(idx);
                    zenAudio.playSingingBowl('tick');
                  }}
                  className={`group p-6 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#8A9A5B] text-white shadow-md border-transparent -translate-y-0.5'
                      : 'bg-white text-[#333333] border-[#333333]/10 hover:border-[#8A9A5B]/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex gap-5 items-start">
                    <span className={`font-sans font-bold text-xs mt-1 ${isActive ? 'text-white/80' : 'text-[#8A9A5B]'}`}>
                      {prompt.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif font-semibold mb-1">
                          {prompt.title}
                        </h3>
                        {isActive && (
                          <span className="text-[9px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                            Active
                          </span>
                        )}
                      </div>
                      <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isActive ? 'text-white/90' : 'text-[#777777]'}`}>
                        {prompt.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Utensil Rest Bar */}
        {bitePacerEnabled && !isPaused && (
          <div className="mt-8 pt-6 border-t border-[#333333]/10 flex items-center justify-between bg-white p-4 rounded-xl border border-[#333333]/5 relative z-10 shadow-xs">
            <div className="flex items-center gap-3">
              <Wind size={16} className={biteCycleSeconds < 15 ? 'text-[#8A9A5B] animate-pulse' : 'text-[#C67D5A] animate-bounce'} />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-[#333333] block">
                  {biteCycleSeconds < 15 ? 'Savor & Chew Mindfully' : 'Rest Utensil & Breathe (Hands in Lap)'}
                </span>
                <span className="text-[10px] text-[#777777] font-sans">
                  {biteCycleSeconds < 15 ? '30-second pacing cycle active' : 'Clear palate and check in with your stomach'}
                </span>
              </div>
            </div>
            <div className="font-mono text-xs font-bold px-3 py-1 bg-[#F9F6F1] rounded-lg text-[#333333] border border-[#333333]/10">
              {30 - biteCycleSeconds}s
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
