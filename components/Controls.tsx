import React, { useState } from 'react';
import { SCENARIOS } from '../constants';
import { Wand2, Send } from 'lucide-react';

interface ControlsProps {
  onScenarioSelect: (prompt: string) => void;
  onCustomPrompt: (prompt: string) => void;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onScenarioSelect, onCustomPrompt, disabled }) => {
  const [customText, setCustomText] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      onCustomPrompt(customText);
      setCustomText('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Scenarios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onScenarioSelect(scenario.promptTemplate)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                disabled 
                  ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' 
                  : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-sm hover:bg-blue-50 cursor-pointer'
              }`}
            >
              <span className="text-2xl mb-2">{scenario.icon}</span>
              <span className="text-sm font-medium text-gray-700">{scenario.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Custom AI Edit</h2>
        <form onSubmit={handleCustomSubmit} className="relative">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            disabled={disabled}
            placeholder="E.g., 'Add a retro filter' or 'Place on a snowy mountain'..."
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
          />
          <button
            type="submit"
            disabled={disabled || !customText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 flex items-start gap-2 text-xs text-gray-500">
            <Wand2 className="w-3 h-3 mt-0.5 text-blue-500" />
            <p>Powered by <strong>Gemini 2.5 Flash Image</strong> (Nano Banana). Describe any edit or placement you want.</p>
        </div>
      </div>
    </div>
  );
};

export default Controls;
