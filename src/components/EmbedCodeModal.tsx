import React, { useState } from 'react';
import { X, Copy, Check, Code } from 'lucide-react';
import { generateStandaloneHtmlSnippet } from '../utils/embedCode';

interface EmbedCodeModalProps {
  onClose: () => void;
}

export const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const codeSnippet = generateStandaloneHtmlSnippet();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#333333]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#333333]/15 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-[#333333]/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-[1px] w-6 bg-[#8A9A5B]"></div>
              <span className="uppercase tracking-[0.25em] text-[10px] font-sans font-bold text-[#8A9A5B]">
                ChungBooks.fr Embeddable Widget
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif italic text-[#333333]">
              Single-File HTML + CSS + JS Snippet
            </h3>
          </div>
          <button
            id="btn-close-embed-modal"
            onClick={onClose}
            className="p-2 rounded-full text-[#777777] hover:text-[#333333] hover:bg-[#EAE5DC]/50 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="py-4 space-y-3 flex-1 overflow-y-auto pr-1">
          <p className="text-xs sm:text-sm text-[#555555] font-serif leading-relaxed">
            This code block is completely self-contained with embedded CSS and vanilla JavaScript adhering to the <strong>Editorial Aesthetic</strong>. Paste it into your website content block, WordPress custom HTML element, or iframe on <strong>chungbooks.fr</strong>.
          </p>

          <div className="relative">
            <pre className="bg-[#333333] text-[#F9F6F1] text-[11px] p-4 rounded-xl overflow-x-auto max-h-72 font-mono leading-relaxed border border-[#333333]">
              <code>{codeSnippet}</code>
            </pre>
            <button
              id="btn-copy-embed-code-overlay"
              onClick={handleCopy}
              className="absolute top-3 right-3 bg-[#8A9A5B] hover:bg-[#78884E] text-white px-3 py-1.5 rounded-full text-[11px] font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-[#333333]/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest font-sans font-medium text-[#777777]">
            ✓ Zero External Build Tools &bull; ✓ Web Audio Synthesizer &bull; ✓ Responsive
          </span>
          <button
            id="btn-copy-embed-code-main"
            onClick={handleCopy}
            className="w-full sm:w-auto bg-[#333333] hover:bg-[#444444] text-white px-8 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Full Snippet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
