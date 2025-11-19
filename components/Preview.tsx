import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { AppState, LinkItem } from '../types';
import { LinkCard } from './LinkCard';

interface PreviewProps {
  data: AppState;
}

export const Preview: React.FC<PreviewProps> = ({ data }) => {
  const { profile, links } = data;
  const [activeService, setActiveService] = useState<LinkItem | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNavigate = (link: LinkItem) => {
    setActiveService(link);
  };

  const handleBack = () => {
    setActiveService(null);
  };

  // Handle Background Audio
  useEffect(() => {
    if (!profile.backgroundAudioUrl || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.4; // Set default volume to 40% so it's background music

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Autoplay failed (blocked by browser)
        // Add a one-time click listener to start audio
        const enableAudio = () => {
          audio.play().catch(e => console.log("Audio still blocked", e));
          document.removeEventListener('click', enableAudio);
        };
        document.addEventListener('click', enableAudio);
      }
    };

    playAudio();

    return () => {
      audio.pause();
      document.removeEventListener('click', () => {});
    };
  }, [profile.backgroundAudioUrl]);

  // Size mapping
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const baseFontSize = sizeClasses[profile.fontSize];

  return (
    <div 
      className={`relative w-full h-full flex flex-col items-center overflow-hidden bg-gray-900 text-white ${baseFontSize}`}
      style={{ fontFamily: profile.fontFamily }}
    >
      {/* Background Audio (Invisible) */}
      {profile.backgroundAudioUrl && (
        <audio ref={audioRef} src={profile.backgroundAudioUrl} loop className="hidden" />
      )}

      {/* Background Image - Global */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ 
          backgroundImage: `url(${profile.backgroundImageUrl})` 
        }}
      />

      {/* Overlay - Global */}
      <div 
        className="absolute inset-0 z-10 bg-black transition-opacity duration-300"
        style={{ opacity: profile.overlayOpacity / 100 }}
      />

      {/* Main Content / Navigation Container */}
      <div className={`relative z-20 w-full h-full transition-transform duration-500 ease-in-out ${activeService ? '-translate-x-full' : 'translate-x-0'}`}>
        
        {/* VIEW 1: HOME (Bio & Links) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-y-auto scrollbar-hide px-6 pt-16 pb-12 flex flex-col items-center">
          
          {/* Avatar */}
          <div className="relative mb-6 group shrink-0">
            <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm"></div>
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              className="relative w-32 h-32 rounded-full object-cover border-[6px] border-white shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Text Info */}
          <h1 className="text-3xl md:text-4xl font-black mb-3 text-center drop-shadow-lg tracking-tight">
            {profile.name}
          </h1>
          <p className="text-center text-white/95 mb-10 max-w-xs font-medium leading-snug drop-shadow-md bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            {profile.bio}
          </p>

          {/* Links Section */}
          <div className="w-full space-y-4 pb-12">
            {links.map((link) => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onNavigate={handleNavigate} 
                fontSize={profile.linkFontSize}
              />
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-4 text-sm font-bold text-white/60 tracking-widest uppercase">
             LinkBio Pro
          </div>
        </div>

        {/* VIEW 2: SERVICE DETAIL PAGE */}
        {/* Removed solid bg-white to let the background image show through */}
        <div className="absolute top-0 left-full w-full h-full flex flex-col">
          
          {/* Header */}
          <div className="flex items-center p-6 border-b border-white/10 pb-4 bg-black/20 backdrop-blur-sm">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors group"
            >
              <ArrowLeft className="w-7 h-7 stroke-[3]" />
            </button>
            <div className="ml-2 font-black text-xl text-white tracking-tight shadow-black drop-shadow-md">Detalles</div>
          </div>

          {/* Service Content */}
          {activeService && (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
              
              {/* Hero Title */}
              <div className="mb-6 flex flex-col items-center w-full text-center">
                <h2 className="text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                  {activeService.title}
                </h2>
                <div className="h-1.5 w-20 bg-white/50 rounded-full shadow-lg backdrop-blur-md"></div>
              </div>

              {/* Description - Now Transparent & Centered */}
              <div className="mb-8 flex-1 w-full">
                <div className="flex items-center justify-center gap-2 mb-3 text-white/80 font-bold text-sm uppercase tracking-wider drop-shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Descripción</span>
                </div>
                <p className="font-medium leading-relaxed whitespace-pre-wrap text-white drop-shadow-md text-lg text-center">
                  {activeService.description || "No description available."}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="mt-auto sticky bottom-0 pt-4 pb-6 w-full">
                <a 
                  href={activeService.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full p-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl shadow-indigo-900/50 transition-all transform hover:scale-[1.02] active:scale-95 border-2 border-indigo-400/30 backdrop-blur-sm"
                >
                  <span className="font-black text-xl mr-2">{activeService.buttonText || "Proceder al Pago"}</span>
                  <ExternalLink className="w-6 h-6 stroke-[3]" />
                </a>
                <div className="text-center mt-3 text-xs font-bold text-white/70 uppercase tracking-wider drop-shadow-md">
                  Pago Seguro
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};