import React, { useState } from 'react';
import { Settings, Eye, Smartphone, Monitor } from 'lucide-react';
import { INITIAL_STATE } from './constants';
import { AppState } from './types';
import { Preview } from './components/Preview';
import { SettingsPanel } from './components/SettingsPanel';

function App() {
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      
      {/* Left Side: Settings Panel (Desktop) / Drawer (Mobile) */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-full md:w-[400px] transform transition-transform duration-300 ease-in-out shadow-2xl
          ${isEditorOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex-shrink-0
        `}
      >
        <SettingsPanel data={appState} onChange={setAppState} />
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsEditorOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
        >
          ✕
        </button>
      </div>

      {/* Right Side: Preview Area */}
      <div className="flex-1 flex flex-col h-full relative bg-slate-200">
        
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsEditorOpen(!isEditorOpen)}
              className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Settings size={16} />
              <span>Edit</span>
            </button>
            <div className="hidden md:block text-gray-800 font-bold text-lg">
              LinkBio <span className="text-indigo-600">Pro</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
             <button 
               onClick={() => setViewMode('mobile')}
               className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
               title="Mobile View"
             >
               <Smartphone size={20} />
             </button>
             <button 
               onClick={() => setViewMode('desktop')}
               className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
               title="Desktop Full View"
             >
               <Monitor size={20} />
             </button>
          </div>

          <div className="flex items-center gap-2">
             <a href={appState.links[0].url} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                <Eye size={16} />
                <span>Live Test</span>
             </a>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
           {/* Dotted Pattern Background for the canvas area */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

           {viewMode === 'mobile' ? (
             /* Mobile Mockup */
             <div className="relative w-[375px] h-[667px] sm:h-[800px] max-h-full bg-black rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden ring-4 ring-gray-900/20">
               {/* Dynamic Island / Notch simulation */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-50"></div>
               <div className="w-full h-full bg-white">
                  <Preview data={appState} />
               </div>
             </div>
           ) : (
             /* Desktop Fullscreen Mockup */
             <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gray-300">
                <Preview data={appState} />
             </div>
           )}
        </div>

      </div>
    </div>
  );
}

export default App;