import React from 'react';
import { SavedItem } from '../types';
import { ClearIcon, RegenerateIcon, ArchiveIcon } from './icons/Icons';

interface SavedContentProps {
  items: SavedItem[];
  onLoad: (item: SavedItem) => void;
  onDelete: (id: string) => void;
}

const SavedContent: React.FC<SavedContentProps> = ({ items, onLoad, onDelete }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-dusk-950/60 backdrop-blur-2xl rounded-2xl border border-gold-500/20 space-y-4 shadow-2xl shadow-dusk-950/50 transition-all duration-300 hover:border-gold-500/40 hover:shadow-gold-500/20">
      <h2 className="flex items-center gap-3 text-lg font-display text-gold-200/80 tracking-widest uppercase">
        <ArchiveIcon className="w-5 h-5" />
        Archives
      </h2>
      <div className="max-h-96 overflow-y-auto space-y-3 pr-2 -mr-2">
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-dusk-900/70 border border-gold-500/20 rounded-lg flex justify-between items-center gap-3 transition-all duration-200 hover:border-gold-500/40 hover:bg-dusk-900/90 hover:scale-[1.02]">
            <div className="flex-grow overflow-hidden">
              <p className="font-bold text-dusk-100 truncate" title={item.prompt}>{item.prompt}</p>
              <p className="text-xs text-dusk-300/70">{item.contentType} - {new Date(item.timestamp).toLocaleString()}</p>
            </div>
            <div className="flex-shrink-0 flex gap-1">
                <button 
                  onClick={() => onLoad(item)} 
                  title="Load" 
                  className="p-2 rounded-full transition-all duration-200 transform text-dusk-100/80 hover:bg-gold-500/20 hover:text-dusk-100 hover:scale-110 active:scale-95"
                >
                    <RegenerateIcon className="w-5 h-5 -rotate-90" />
                </button>
                <button 
                  onClick={() => onDelete(item.id)} 
                  title="Delete" 
                  className="p-2 rounded-full transition-all duration-200 transform text-sunset/80 hover:bg-sunset/20 hover:text-sunset hover:scale-110 active:scale-95"
                >
                    <ClearIcon className="w-5 h-5" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedContent;