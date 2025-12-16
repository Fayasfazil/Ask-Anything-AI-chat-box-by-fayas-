import React, { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import SavedContent from './components/SavedContent';
import Notification from './components/Notification';
import Footer from './components/Footer';
import { generateContentStream } from './services/geminiService';
import { ContentType, SavedItem, FontTheme, ResponseLength } from './types';
import { FONT_THEMES } from './constants';

// A reusable hook for managing state in localStorage.
function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}


const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('The future of artificial intelligence in 2077');
  const [contentType, setContentType] = useState<ContentType>(ContentType.Article);
  const [creativityLevel, setCreativityLevel] = useState<number>(0.7);
  const [responseLength, setResponseLength] = useState<ResponseLength>('medium');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useLocalStorage<SavedItem[]>('savedContent', []);
  const [fontTheme, setFontTheme] = useLocalStorage<FontTheme>('fontTheme', 'cyberpunk');
  const [notification, setNotification] = useState<string | null>(null);
  
  // Restore last session on initial render
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('ai-content-generator-session');
      if (storedSession) {
        const sessionData: { 
            prompt: string; 
            contentType: ContentType; 
            generatedContent: string;
            creativityLevel: number;
            responseLength: ResponseLength;
        } = JSON.parse(storedSession);
        if (sessionData.generatedContent) {
            setPrompt(sessionData.prompt);
            setContentType(sessionData.contentType);
            setGeneratedContent(sessionData.generatedContent);
            if (sessionData.creativityLevel !== undefined) setCreativityLevel(sessionData.creativityLevel);
            if (sessionData.responseLength !== undefined) setResponseLength(sessionData.responseLength);
            setNotification('Session restored.');
        }
      }
    } catch (e) {
      console.error("Failed to load session from localStorage", e);
      localStorage.removeItem('ai-content-generator-session');
    }
  }, []);
  
  // Auto-save session on content change (debounced)
  useEffect(() => {
    if (isLoading) return;

    const autoSaveTimer = setTimeout(() => {
      try {
        const sessionData = {
          prompt,
          contentType,
          generatedContent,
          creativityLevel,
          responseLength,
        };
        localStorage.setItem('ai-content-generator-session', JSON.stringify(sessionData));
      } catch (e) {
        console.error("Failed to auto-save session to localStorage", e);
      }
    }, 1500);

    return () => clearTimeout(autoSaveTimer);
  }, [generatedContent, prompt, contentType, isLoading, creativityLevel, responseLength]);

  // Apply font theme when it changes
  useEffect(() => {
    const theme = FONT_THEMES[fontTheme];
    if (theme) {
      document.documentElement.style.setProperty('--font-display', theme.display);
      document.documentElement.style.setProperty('--font-body', theme.body);
    }
  }, [fontTheme]);
  
  const handleGenerate = useCallback(async (
      currentPrompt: string, 
      currentContentType: ContentType, 
      currentCreativity: number, 
      currentLength: ResponseLength
    ) => {
    if (!currentPrompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    localStorage.removeItem('ai-content-generator-session');

    try {
      await generateContentStream(
        currentPrompt,
        currentContentType,
        (chunk) => setGeneratedContent(prev => prev + chunk),
        currentCreativity,
        currentLength
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSave = useCallback(() => {
    if (!generatedContent.trim()) return;
    const newItem: SavedItem = {
      id: crypto.randomUUID(),
      prompt,
      contentType,
      content: generatedContent,
      timestamp: Date.now(),
      creativityLevel,
      responseLength,
    };
    setSavedItems(prevItems => [newItem, ...prevItems].slice(0, 50));
    setNotification('Content saved successfully!');
  }, [generatedContent, prompt, contentType, setSavedItems, creativityLevel, responseLength]);

  const handleLoad = useCallback((item: SavedItem) => {
    setPrompt(item.prompt);
    setContentType(item.contentType);
    setGeneratedContent(item.content);
    if (item.creativityLevel !== undefined) {
      setCreativityLevel(item.creativityLevel);
    }
    if (item.responseLength !== undefined) {
      setResponseLength(item.responseLength);
    }
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNotification('Content loaded.');
  }, [setPrompt, setContentType, setGeneratedContent, setCreativityLevel, setResponseLength]);

  const handleDelete = useCallback((id: string) => {
    setSavedItems(prevItems => prevItems.filter(item => item.id !== id));
    setNotification('Saved item deleted.');
  }, [setSavedItems]);

  const handleRegenerate = useCallback(() => {
    handleGenerate(prompt, contentType, creativityLevel, responseLength);
  }, [prompt, contentType, creativityLevel, responseLength, handleGenerate]);

  const handleCopy = useCallback(() => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setNotification('Content copied to clipboard!');
    }
  }, [generatedContent]);

  const handleClear = useCallback(() => {
    setGeneratedContent('');
    setError(null);
    localStorage.removeItem('ai-content-generator-session');
  }, []);

  return (
    <div className="min-h-screen text-dusk-200 bg-transparent flex flex-col">
      <Header fontTheme={fontTheme} setFontTheme={setFontTheme} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 animate-fade-in-up pb-12 flex-grow" style={{ transformStyle: 'preserve-3d' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12" style={{ perspective: '1500px' }}>
          
          <div className="group transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(5deg)] hover:[transform:rotateY(0)_scale(1.02)]">
             <div className="lg:sticky lg:top-28 self-start [transform-style:preserve-3d] [transform:translateZ(10px)]">
              <InputForm
                prompt={prompt}
                setPrompt={setPrompt}
                contentType={contentType}
                setContentType={setContentType}
                creativityLevel={creativityLevel}
                setCreativityLevel={setCreativityLevel}
                responseLength={responseLength}
                setResponseLength={setResponseLength}
                onGenerate={() => handleGenerate(prompt, contentType, creativityLevel, responseLength)}
                isLoading={isLoading}
              />
              <SavedContent items={savedItems} onLoad={handleLoad} onDelete={handleDelete} />
            </div>
          </div>
          
          <div className="group mt-8 lg:mt-0 transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(-5deg)] hover:[transform:rotateY(0)_scale(1.02)]">
             <div className="[transform-style:preserve-3d] [transform:translateZ(10px)]">
              <OutputDisplay
                content={generatedContent}
                isLoading={isLoading}
                error={error}
                onCopy={handleCopy}
                onRegenerate={handleRegenerate}
                onClear={handleClear}
                onSave={handleSave}
              />
            </div>
          </div>

        </div>
      </main>
      <Footer />
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default App;