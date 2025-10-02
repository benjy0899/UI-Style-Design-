import React, { useState } from 'react';

interface EngagementExtrasProps {
  onSurpriseMe: () => void;
  onRemix: () => void;
  onPin: () => void;
  disabled?: boolean;
}

const EngagementExtras: React.FC<EngagementExtrasProps> = ({
  onSurpriseMe,
  onRemix,
  onPin,
  disabled = false
}) => {
  const [isPinned, setIsPinned] = useState(false);
  const [showPinSuccess, setShowPinSuccess] = useState(false);

  const handlePin = () => {
    if (!isPinned) {
      setIsPinned(true);
      setShowPinSuccess(true);
      onPin();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowPinSuccess(false);
      }, 3000);
    }
  };

  const actions = [
    {
      id: 'surprise',
      title: 'Surprise Me',
      description: 'Generate a random moodboard with trending styles',
      icon: '🎲',
      color: 'from-yellow-500 to-orange-500',
      hoverColor: 'from-yellow-600 to-orange-600',
      action: onSurpriseMe
    },
    {
      id: 'remix',
      title: 'Remix Moodboard',
      description: 'Create alternative variations of your current style',
      icon: '🔄',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'from-purple-600 to-pink-600',
      action: onRemix
    },
    {
      id: 'pin',
      title: isPinned ? 'Pinned to Workspace' : 'Pin to Workspace',
      description: isPinned ? 'Saved to your local workspace' : 'Save this moodboard to your local workspace',
      icon: isPinned ? '📌' : '📍',
      color: isPinned ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-cyan-500',
      hoverColor: isPinned ? 'from-green-600 to-emerald-600' : 'from-blue-600 to-cyan-600',
      action: handlePin
    }
  ];

  return (
    <div className="space-y-6">
      {/* Pin Success Message */}
      {showPinSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-800">Moodboard Pinned!</p>
              <p className="text-sm text-green-700">You can find it in your workspace anytime.</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        </div>

        <div className="space-y-4">
          {actions.map((action, index) => (
            <button
              key={action.id}
              onClick={action.action}
              disabled={disabled || (action.id === 'pin' && isPinned)}
              className={`group w-full bg-gradient-to-r ${action.color} hover:${action.hoverColor} text-white p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                  <p className="text-white/90 text-sm">{action.description}</p>
                </div>
                <svg className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">More Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎨</span>
                <h4 className="font-semibold text-gray-900">Style History</h4>
              </div>
              <p className="text-sm text-gray-600">
                View and restore previous moodboard versions
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👥</span>
                <h4 className="font-semibold text-gray-900">Team Collaboration</h4>
              </div>
              <p className="text-sm text-gray-600">
                Share and collaborate with your design team
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-purple-800 font-medium mb-1">Pro Tips</p>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Use "Surprise Me" to discover new style combinations</li>
                <li>• "Remix" creates variations while keeping your core aesthetic</li>
                <li>• Pin your favorite moodboards for quick access later</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementExtras;