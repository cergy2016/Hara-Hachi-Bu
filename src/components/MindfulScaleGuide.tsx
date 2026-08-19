import React from 'react';
import { X, CheckCircle2, Clock } from 'lucide-react';

interface MindfulScaleGuideProps {
  onClose: () => void;
}

export const MindfulScaleGuide: React.FC<MindfulScaleGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#333333]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 max-w-xl w-full border border-[#333333]/15 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          id="btn-close-philosophy"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#777777] hover:text-[#333333] hover:bg-[#EAE5DC]/50 transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-[#8A9A5B]"></div>
          <span className="uppercase tracking-[0.25em] text-[10px] font-sans font-bold text-[#8A9A5B]">
            Longevity Studies &bull; 腹八分目
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-serif italic tracking-tight text-[#333333] mb-3">
          The Art of Hara Hachi Bu
        </h3>

        <p className="text-sm sm:text-base text-[#555555] font-serif leading-relaxed mb-6">
          <strong>Hara Hachi Bu</strong> is a traditional Okinawan maxim originating from the teachings of Confucius, reminding dining practitioners to stop eating when their stomach reaches approximately eight parts out of ten full.
        </p>

        {/* 1-10 Satiety Scale */}
        <div className="space-y-2 mb-6 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#333333]/70 block mb-2">
            The Satiety Spectrum (1 to 10)
          </span>

          <div className="p-3 rounded-xl bg-white border border-[#333333]/10 flex items-center justify-between text-xs">
            <span className="font-bold text-[#777777]">01–02: Ravenous</span>
            <span className="text-[#888888]">Extreme hunger, blood sugar dip</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#333333]/10 flex items-center justify-between text-xs">
            <span className="font-bold text-[#555555]">03–04: Hungry</span>
            <span className="text-[#888888]">Ready to eat with calm intention</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#333333]/10 flex items-center justify-between text-xs">
            <span className="font-bold text-[#333333]">05–06: Neutral</span>
            <span className="text-[#888888]">Initial satisfaction registering</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#8A9A5B] text-white shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 size={15} />
              <span>07–08: Hara Hachi Bu</span>
            </div>
            <span className="text-white/90 font-medium">80% Full: Energetic & Satiated</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#333333]/10 flex items-center justify-between text-xs">
            <span className="font-bold text-[#C67D5A]">09–10: Stuffed</span>
            <span className="text-[#888888]">Lethargy, bloating, heavy digestion</span>
          </div>
        </div>

        {/* The 20-min delay note */}
        <div className="bg-[#F9F6F1] rounded-2xl p-4 border border-[#333333]/10 mb-6 flex items-start gap-3">
          <Clock size={18} className="text-[#8A9A5B] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[#555555] font-serif leading-relaxed">
            <strong>The 20-Minute Hormonal Lag:</strong> Satiety signaling hormones (cholecystokinin and leptin) require 15 to 20 minutes to reach the brain. Eating rapidly causes the stomach to reach 100% capacity before the nervous system perceives satiety.
          </div>
        </div>

        <button
          id="btn-understand-philosophy"
          onClick={onClose}
          className="w-full bg-[#333333] text-white font-sans uppercase tracking-[0.2em] text-[11px] py-4 rounded-full hover:bg-[#444444] transition-colors cursor-pointer"
        >
          Return to Dining Session
        </button>
      </div>
    </div>
  );
};
