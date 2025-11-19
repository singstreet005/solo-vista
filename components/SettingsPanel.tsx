import React, { useCallback } from 'react';
import { AppState, LinkItem } from '../types';
import { Image, Link as LinkIcon, Type, Palette, Upload, FileText, Globe, CreditCard, ALargeSmall, Music } from 'lucide-react';

interface SettingsPanelProps {
  data: AppState;
  onChange: (newData: AppState) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ data, onChange }) => {
  const { profile, links } = data;

  const handleProfileChange = (field: keyof typeof profile, value: string | number | null) => {
    onChange({
      ...data,
      profile: {
        ...profile,
        [field]: value,
      },
    });
  };

  const handleLinkChange = (id: string, field: keyof LinkItem, value: any) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    onChange({ ...data, links: updatedLinks });
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'backgroundImageUrl' | 'backgroundAudioUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleProfileChange(field, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [data, onChange]);

  const fonts = [
    { name: 'Inter (Moderno)', value: 'Inter' },
    { name: 'Montserrat (Geométrico)', value: 'Montserrat' },
    { name: 'Playfair (Elegante)', value: 'Playfair Display' },
    { name: 'Lato (Limpio)', value: 'Lato' },
    { name: 'Oswald (Fuerte)', value: 'Oswald' },
  ];

  return (
    <div className="bg-white h-full overflow-y-auto p-6 shadow-xl border-r border-gray-100 scrollbar-thin">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900">Editor Pro</h2>
        <p className="text-sm text-gray-500 font-medium">Personaliza tu página y servicios</p>
      </div>

      {/* SECTION: Profile */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-indigo-600 uppercase tracking-wider mb-2">
          <Type size={16} className="stroke-[3]" />
          <span>Detalles del Perfil</span>
        </div>

        <div className="space-y-3">
          <div>
             <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Visible</label>
             <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-gray-800"
              placeholder="@usuario"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Biografía</label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleProfileChange('bio', e.target.value)}
              rows={3}
              className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none font-medium text-gray-700"
              placeholder="Cuenta tu historia..."
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100 my-6" />

      {/* SECTION: Typography */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-indigo-600 uppercase tracking-wider mb-2">
          <ALargeSmall size={16} className="stroke-[3]" />
          <span>Tipografía</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Fuente</label>
            <select
              value={profile.fontFamily}
              onChange={(e) => handleProfileChange('fontFamily', e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-gray-700 cursor-pointer"
            >
              {fonts.map(font => (
                <option key={font.value} value={font.value}>{font.name}</option>
              ))}
            </select>
          </div>

          {/* Global Font Size */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Tamaño Textos Generales</label>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => handleProfileChange('fontSize', 'sm')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${profile.fontSize === 'sm' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Pequeño
              </button>
              <button
                onClick={() => handleProfileChange('fontSize', 'md')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${profile.fontSize === 'md' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Medio
              </button>
              <button
                onClick={() => handleProfileChange('fontSize', 'lg')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${profile.fontSize === 'lg' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Grande
              </button>
            </div>
          </div>

          {/* Link Font Size */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Tamaño Texto de Links</label>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => handleProfileChange('linkFontSize', 'sm')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${profile.linkFontSize === 'sm' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Pequeño
              </button>
              <button
                onClick={() => handleProfileChange('linkFontSize', 'md')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${profile.linkFontSize === 'md' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Medio
              </button>
              <button
                onClick={() => handleProfileChange('linkFontSize', 'lg')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${profile.linkFontSize === 'lg' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Grande
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 my-6" />

      {/* SECTION: Links */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-black text-indigo-600 uppercase tracking-wider mb-4">
          <LinkIcon size={16} className="stroke-[3]" />
          <span>Gestor de Links</span>
        </div>

        <div className="space-y-6">
          {links.map((link, index) => (
            <div key={link.id} className="bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 relative group hover:border-indigo-100 transition-colors">
              <div className="absolute -top-3 left-4 px-3 py-0.5 bg-indigo-600 text-white text-xs font-black rounded-full shadow-md uppercase tracking-wide">
                Link #{index + 1}
              </div>
              
              <div className="space-y-4 mt-2">
                
                {/* Link Type Selector */}
                <div className="flex bg-gray-200 p-1 rounded-lg">
                   <button
                    onClick={() => handleLinkChange(link.id, 'type', 'direct')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${link.type === 'direct' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <Globe size={12} /> Directo
                   </button>
                   <button
                    onClick={() => handleLinkChange(link.id, 'type', 'service')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${link.type === 'service' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <FileText size={12} /> Página Servicio
                   </button>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 font-bold mb-1">Título del Botón</label>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Conditional Fields for Service Page */}
                {link.type === 'service' && (
                  <div className="bg-white border-l-4 border-indigo-500 pl-4 py-2 space-y-3 rounded-r-lg">
                    <div>
                      <label className="block text-xs text-gray-500 font-bold mb-1">Descripción del Servicio</label>
                      <textarea
                        value={link.description || ''}
                        onChange={(e) => handleLinkChange(link.id, 'description', e.target.value)}
                        rows={4}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none resize-none"
                        placeholder="Detalla qué incluye tu servicio..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 font-bold mb-1">Texto Botón de Pago</label>
                      <input
                        type="text"
                        value={link.buttonText || ''}
                        onChange={(e) => handleLinkChange(link.id, 'buttonText', e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:border-indigo-500 outline-none"
                        placeholder="Ej: Pagar $20"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-gray-500 font-bold mb-1 flex items-center gap-1">
                    {link.type === 'service' ? <CreditCard size={12}/> : <Globe size={12}/>}
                    {link.type === 'service' ? 'URL de Pago (Stripe/PayPal)' : 'URL de Destino'}
                  </label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm text-blue-600 font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 my-6" />

      {/* SECTION: Appearance */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm font-black text-indigo-600 uppercase tracking-wider mb-4">
          <Palette size={16} className="stroke-[3]" />
          <span>Apariencia</span>
        </div>

        <div className="space-y-5">
            {/* Background Image */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Imagen de Fondo</label>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                  <img src={profile.backgroundImageUrl} alt="BG" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                   <label className="flex items-center justify-center w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                      <Upload size={16} className="mr-2 text-gray-400 group-hover:text-indigo-500" />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-indigo-700">Subir Nueva</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'backgroundImageUrl')} />
                   </label>
                </div>
              </div>
            </div>

             {/* Background Audio */}
             <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Audio de Fondo (Invisible)</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                  <Music size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                   <label className="flex items-center justify-center w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                      <Upload size={16} className="mr-2 text-gray-400 group-hover:text-indigo-500" />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-indigo-700">Subir Canción</span>
                      <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'backgroundAudioUrl')} />
                   </label>
                   {profile.backgroundAudioUrl && (
                     <p className="text-xs text-green-600 font-bold mt-1">✓ Audio cargado</p>
                   )}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 font-medium leading-tight">
                *El audio sonará cuando el usuario toque la pantalla por primera vez (política de navegadores).
              </p>
            </div>

            {/* Avatar */}
             <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Foto de Perfil</label>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <label className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 font-bold">
                  Cambiar Foto
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'avatarUrl')} />
                </label>
              </div>
            </div>

            {/* Opacity */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-gray-700">Intensidad Fondo Oscuro</label>
                <span className="text-xs font-bold text-indigo-600">{profile.overlayOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={profile.overlayOpacity}
                onChange={(e) => handleProfileChange('overlayOpacity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
        </div>
      </div>
    </div>
  );
};