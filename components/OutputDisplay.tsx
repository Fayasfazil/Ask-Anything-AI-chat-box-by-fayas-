import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyIcon, RegenerateIcon, ClearIcon, SaveIcon } from './icons/Icons';
import AikoMascot from './AikoMascot';

interface OutputDisplayProps {
  content: string;
  isLoading: boolean;
  error: string | null;
  onCopy: () => void;
  onRegenerate: () => void;
  onClear: () => void;
  onSave: () => void;
}

const SkeletonLoader: React.FC = () => (
  <div className="relative overflow-hidden pt-2">
    {/* Shimmer Effect */}
    <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-dusk-800/50 to-transparent"></div>
    {/* Content Placeholders */}
    <div className="space-y-5">
      <div className="h-6 bg-dusk-700/50 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-dusk-700/50 rounded"></div>
        <div className="h-4 bg-dusk-700/50 rounded w-5/6"></div>
        <div className="h-4 bg-dusk-700/50 rounded"></div>
      </div>
      <div className="h-4 bg-dusk-700/50 rounded w-1/2"></div>
      <div className="space-y-3">
        <div className="h-4 bg-dusk-700/50 rounded w-5/6"></div>
        <div className="h-4 bg-dusk-700/50 rounded"></div>
      </div>
    </div>
  </div>
);


const OutputDisplay: React.FC<OutputDisplayProps> = ({
  content,
  isLoading,
  error,
  onCopy,
  onRegenerate,
  onClear,
  onSave,
}) => {
  const hasContent = content && !isLoading && !error;
  const isGenerating = isLoading && content;
  const buttonBaseClasses = "p-2.5 rounded-full transition-all duration-200 transform";
  const primaryButtonClasses = "text-gold-200/80 hover:bg-gold-500/20 hover:text-gold-100 hover:scale-110 active:scale-95";
  const secondaryButtonClasses = "text-sunset/80 hover:bg-sunset/20 hover:text-sunset hover:scale-110 active:scale-95";

  const getAikoState = () => {
    if (error) {
      return { message: "System error... Recalibrating.", mood: 'sad' as const };
    }
    if (isLoading && !content) {
      return { message: "Accessing data streams...", mood: 'thinking' as const };
    }
    if (isLoading && content) {
      return { message: "Compiling... Almost complete.", mood: 'generating' as const };
    }
    if (!isLoading && content) {
      return { message: "Transmission complete. Here's your data.", mood: 'happy' as const };
    }
    return { message: "Awaiting your command.", mood: 'idle' as const };
  };
  
  const { message: aikoMessage, mood: aikoMood } = getAikoState();

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4 min-h-[64px]">
        <div className="flex items-center gap-4">
            <AikoMascot mood={aikoMood} className="w-16 h-16" />
            <div className="p-2 px-4 bg-dusk-950/70 backdrop-blur-sm rounded-xl rounded-bl-none shadow-lg border border-gold-500/20">
                <p className="text-sm font-medium text-dusk-200/90">{aikoMessage}</p>
            </div>
        </div>

        {hasContent && (
          <div className="flex items-center gap-1 p-1 bg-dusk-950/60 backdrop-blur-sm rounded-full border border-gold-500/20 shadow-lg">
            <button onClick={onSave} title="Save" className={`${buttonBaseClasses} ${primaryButtonClasses}`}><SaveIcon className="w-5 h-5" /></button>
            <button onClick={onCopy} title="Copy" className={`${buttonBaseClasses} ${primaryButtonClasses}`}><CopyIcon className="w-5 h-5" /></button>
            <button onClick={onRegenerate} title="Regenerate" className={`${buttonBaseClasses} ${primaryButtonClasses}`}><RegenerateIcon className="w-5 h-5" /></button>
            <button onClick={onClear} title="Clear" className={`${buttonBaseClasses} ${secondaryButtonClasses}`}><ClearIcon className="w-5 h-5" /></button>
          </div>
        )}
      </div>
      
      <div className="prose max-w-none min-h-[400px] p-6 bg-dusk-950/60 backdrop-blur-2xl rounded-2xl border border-gold-500/20 shadow-2xl shadow-dusk-950/50 transition-all duration-300 hover:border-gold-500/40 hover:shadow-gold-500/20">
        {isLoading && !content && <SkeletonLoader />}
        {error && <p className="font-semibold text-sunset">Error: {error}</p>}
        {!isLoading && !error && !content && (
          <div className="flex flex-col items-center justify-center h-full text-center text-dusk-300/50">
            <p>// Output will be displayed here</p>
          </div>
        )}
        
        {content && (
            <>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
                {isGenerating && <span className="inline-block w-2 h-5 bg-dusk-100/70 animate-pulse ml-1" aria-hidden="true" />}
            </>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;