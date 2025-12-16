import React from 'react';
import { ContentType, ResponseLength } from '../types';
import { CONTENT_TYPE_OPTIONS } from '../constants';
import { SparklesIcon, DocumentIcon, PencilIcon, WandIcon, RulerIcon } from './icons/Icons';

interface InputFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  creativityLevel: number;
  setCreativityLevel: (level: number) => void;
  responseLength: ResponseLength;
  setResponseLength: (length: ResponseLength) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  prompt,
  setPrompt,
  contentType,
  setContentType,
  creativityLevel,
  setCreativityLevel,
  responseLength,
  setResponseLength,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="p-6 bg-dusk-950/60 backdrop-blur-2xl rounded-2xl border border-gold-500/20 space-y-6 shadow-2xl shadow-dusk-950/50 transition-all duration-300 hover:border-gold-500/40 hover:shadow-gold-500/20">
      <div>
        <label htmlFor="contentType" className="flex items-center gap-2 text-sm font-medium text-gold-200/80 mb-2 tracking-wider uppercase">
          <DocumentIcon className="w-4 h-4" />
          Content Type
        </label>
        <select
          id="contentType"
          value={contentType}
          onChange={(e) => setContentType(e.target.value as ContentType)}
          className="w-full px-3 py-2 bg-dusk-900/70 border border-gold-500/30 rounded-lg shadow-inner shadow-dusk-950/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-300 text-dusk-100 placeholder:text-light/60 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23facc15' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
          }}
        >
          {CONTENT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} style={{backgroundColor: '#2e1065'}}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="prompt" className="flex items-center gap-2 text-sm font-medium text-gold-200/80 mb-2 tracking-wider uppercase">
          <PencilIcon className="w-4 h-4" />
          Your Prompt
        </label>
        <textarea
          id="prompt"
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., The benefits of renewable energy in a megacity"
          className="w-full px-3 py-2 bg-dusk-900/70 border border-gold-500/30 rounded-lg shadow-inner shadow-dusk-950/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-300 resize-y text-dusk-100 placeholder:text-light/60"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="creativity" className="flex items-center gap-2 text-sm font-medium text-gold-200/80 mb-2 tracking-wider uppercase">
                <WandIcon className="w-4 h-4" />
                Creativity
            </label>
            <input
                id="creativity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={creativityLevel}
                onChange={(e) => setCreativityLevel(parseFloat(e.target.value))}
                className="w-full cursor-pointer"
            />
            <div className="text-xs text-center text-dusk-300/70 mt-1" aria-hidden="true">{creativityLevel.toFixed(1)}</div>
        </div>
        <div>
            <label htmlFor="length" className="flex items-center gap-2 text-sm font-medium text-gold-200/80 mb-2 tracking-wider uppercase">
                <RulerIcon className="w-4 h-4" />
                Length
            </label>
            <select
                id="length"
                value={responseLength}
                onChange={(e) => setResponseLength(e.target.value as ResponseLength)}
                className="w-full px-3 py-2 bg-dusk-900/70 border border-gold-500/30 rounded-lg shadow-inner shadow-dusk-950/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-300 text-dusk-100 placeholder:text-light/60 appearance-none cursor-pointer"
                 style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23facc15' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                }}
            >
                <option value="short" style={{backgroundColor: '#2e1065'}}>Short</option>
                <option value="medium" style={{backgroundColor: '#2e1065'}}>Medium</option>
                <option value="long" style={{backgroundColor: '#2e1065'}}>Long</option>
            </select>
        </div>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-br from-gold-400 to-gold-600 text-dusk-950 font-bold rounded-xl shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/50 focus:outline-none focus:ring-4 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-dusk-950/50 disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] active:shadow-inner animate-button-glow"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dusk-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Content
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;