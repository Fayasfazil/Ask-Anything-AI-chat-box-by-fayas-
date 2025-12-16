import React from 'react';
import { SparklesIcon, FontIcon } from './icons/Icons';
import { FontTheme } from '../types';
import { FONT_THEME_OPTIONS } from '../constants';

interface HeaderProps {
  fontTheme: FontTheme;
  setFontTheme: (theme: FontTheme) => void;
}

const Header: React.FC<HeaderProps> = ({ fontTheme, setFontTheme }) => {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dusk-900/50 rounded-full flex items-center justify-center border-2 border-gold-400/50 shadow-lg shadow-gold-500/20">
            <SparklesIcon className="w-6 h-6 text-gold-300 drop-shadow-[0_0_5px_rgba(250,204,21,0.7)] animate-subtle-bounce" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-gold-100 tracking-widest uppercase" style={{ textShadow: '0 0 8px rgba(250, 204, 21, 0.5), 0 0 2px rgba(255, 255, 255, 0.5)' }}>
            ASK ANYTHING
          </h1>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-dusk-950/60 backdrop-blur-sm rounded-full border border-gold-500/20 shadow-lg">
          <FontIcon className="w-5 h-5 text-gold-300/70 ml-2" />
          <select
            id="fontTheme"
            value={fontTheme}
            onChange={(e) => setFontTheme(e.target.value as FontTheme)}
            aria-label="Select font theme"
            className="w-full pl-1 pr-8 py-1 bg-transparent border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400/50 text-gold-200/80 appearance-none cursor-pointer"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fde047' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.25rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.25em 1.25em',
            }}
          >
            {FONT_THEME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={{backgroundColor: '#2e1065', fontFamily: 'var(--font-body)'}}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;