import React from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkCardProps {
  link: LinkItem;
  fontSize?: 'sm' | 'md' | 'lg';
  onNavigate?: (link: LinkItem) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, fontSize = 'md', onNavigate }) => {
  if (!link.isActive) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (link.type === 'service' && onNavigate) {
      e.preventDefault();
      onNavigate(link);
    }
  };

  const textSizeClass = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }[fontSize];

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative w-full flex items-center justify-between p-4 px-6 bg-white hover:bg-gray-50 text-gray-900 rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] mb-4 border-2 border-transparent hover:border-indigo-100"
    >
      <span className={`font-black tracking-tight truncate flex-1 text-center pl-4 text-gray-800 ${textSizeClass}`}>
        {link.title}
      </span>
      
      {link.type === 'service' ? (
        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition-colors stroke-[3]" />
      ) : (
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors stroke-[3]" />
      )}
    </a>
  );
};