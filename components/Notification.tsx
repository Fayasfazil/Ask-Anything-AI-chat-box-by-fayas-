import React, { useEffect } from 'react';
import { SparklesIcon } from './icons/Icons';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed bottom-5 right-5 bg-dusk-900/80 backdrop-blur-lg border border-gold-500/30 rounded-xl shadow-2xl shadow-gold-950 p-4 flex items-center gap-3 text-dusk-100 z-50 animate-slide-in"
      role="alert"
      aria-live="assertive"
      style={{ transformOrigin: 'bottom center' }}
    >
      <SparklesIcon className="w-6 h-6 text-gold-400 flex-shrink-0" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Notification;