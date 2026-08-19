import React from 'react';
import { Volume2, VolumeX, Code, BookOpen, Play, Pause, RotateCcw } from 'lucide-react';
import { TimerPhase } from '../types';

interface HeaderProps {
  phase: TimerPhase;
  totalMinutes: number;
  soundEnabled: boolean;
  isPaused: boolean;
  onSelectPhase: (phase: TimerPhase) => void;
  onToggleSound: () => void;
  onOpenEmbed: () => void;
  onOpenPhilosophy: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  phase,
  totalMinutes,
  soundEnabled,
  isPaused,
  onSelectPhase,
  onToggleSound,
  onOpenEmbed,
  onOpenPhilosophy,
}) => {
  return (
    <nav id="app-nav" className="flex flex-col md:flex-row justify-between items-start md:items-end py-6 px-4 sm:px-10 border-b border-[#333333]/10 max-w-6xl mx-auto w-full gap-4">
      {/* Brand & Editorial Title */}
      <div className="flex flex-col cursor-pointer" onClick={() => onSelectPhase('setup')}>
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold mb-1 text-[#777777] flex items-center gap-2">
          <span>Principles of Longevity</span>
          <span className="text-[#8A9A5B]">&bull;</span>
          <span className="font-jp tracking-normal font-semibold text-[#8A9A5B]">腹八分目</span>
        </span>
        <h1 className="text-3xl sm:text-4xl italic tracking-tight font-serif text-[#333333] hover:opacity-80 transition-opacity">
          Hara Hachi Bu
        </h1>
      </div>

      {/* Interactive Phase Navigation Tabs (Clickable to switch view anytime) */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px] uppercase tracking-widest font-sans font-medium text-[#333333]">
        <button
          type="button"
          onClick={() => onSelectPhase('setup')}
          className={`pb-1 transition-all cursor-pointer ${
            phase === 'setup'
              ? 'border-b-2 border-[#333333] font-bold text-[#333333]'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          {totalMinutes}m Setup
        </button>

        <button
          type="button"
          onClick={() => onSelectPhase('phase1')}
          className={`pb-1 transition-all cursor-pointer ${
            phase === 'phase1'
              ? 'border-b-2 border-[#8A9A5B] font-bold text-[#8A9A5B]'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          Phase 01: Dining
        </button>

        <button
          type="button"
          onClick={() => onSelectPhase('halfway_pause')}
          className={`pb-1 transition-all cursor-pointer ${
            phase === 'halfway_pause'
              ? 'border-b-2 border-[#8A9A5B] font-bold text-[#8A9A5B]'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          Phase 02: Check-In
        </button>

        <button
          type="button"
          onClick={() => onSelectPhase('completed')}
          className={`pb-1 transition-all cursor-pointer ${
            phase === 'completed'
              ? 'border-b-2 border-[#333333] font-bold text-[#333333]'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          Complete
        </button>

        {/* Quick Toggles */}
        <div className="flex items-center gap-3 border-l border-[#333333]/15 pl-4 ml-1">
          <button
            id="btn-toggle-sound-editorial"
            onClick={onToggleSound}
            className="hover:opacity-100 opacity-60 transition-opacity flex items-center gap-1.5 cursor-pointer text-[10px]"
            title={soundEnabled ? 'Temple bells enabled' : 'Muted'}
          >
            {soundEnabled ? <Volume2 size={13} className="text-[#8A9A5B]" /> : <VolumeX size={13} />}
            <span className="hidden sm:inline">{soundEnabled ? 'Chimes' : 'Mute'}</span>
          </button>

          <button
            id="btn-open-philosophy-nav"
            onClick={onOpenPhilosophy}
            className="hover:opacity-100 opacity-60 transition-opacity flex items-center gap-1 cursor-pointer text-[10px]"
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Philosophy</span>
          </button>

          <button
            id="btn-open-embed-nav"
            onClick={onOpenEmbed}
            className="hover:opacity-100 opacity-60 transition-opacity flex items-center gap-1 cursor-pointer text-[10px]"
            title="Get embeddable single-file HTML code for chungbooks.fr"
          >
            <Code size={13} />
            <span>Embed</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
