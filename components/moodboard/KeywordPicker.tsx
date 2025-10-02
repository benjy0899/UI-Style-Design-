import React, { useState, useCallback, useRef, useEffect } from 'react';

interface KeywordPickerProps {
  keywords: string[];
  onKeywordAdd: (keyword: string) => void;
  onKeywordRemove: (keyword: string) => void;
}

const KeywordPicker: React.FC<KeywordPickerProps> = ({
  keywords,
  onKeywordAdd,
  onKeywordRemove
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestions = [
    'minimalist', 'modern', 'vintage', 'retro', 'futuristic', 'organic', 'geometric',
    'bold', 'subtle', 'vibrant', 'muted', 'pastel', 'monochrome', 'colorful',
    'clean', 'rustic', 'elegant', 'playful', 'professional', 'creative',
    'nature', 'urban', 'industrial', 'luxury', 'casual', 'formal',
    'warm', 'cool', 'bright', 'dark', 'soft', 'sharp', 'smooth', 'textured',
    'corporate', 'startup', 'tech', 'fashion', 'food', 'travel', 'fitness',
    'education', 'healthcare', 'finance', 'entertainment', 'art', 'music'
  ];

  const suggestedKeywords = [
    { label: 'minimalist', color: 'bg-blue-100 text-blue-700' },
    { label: 'modern', color: 'bg-purple-100 text-purple-700' },
    { label: 'vibrant', color: 'bg-pink-100 text-pink-700' },
    { label: 'organic', color: 'bg-green-100 text-green-700' },
    { label: 'bold', color: 'bg-orange-100 text-orange-700' },
    { label: 'elegant', color: 'bg-indigo-100 text-indigo-700' },
    { label: 'playful', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'professional', color: 'bg-gray-100 text-gray-700' }
  ];

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = allSuggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !keywords.includes(suggestion)
        )
        .slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, keywords]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const keyword = inputValue.trim().toLowerCase();
      if (!keywords.includes(keyword)) {
        onKeywordAdd(keyword);
        setInputValue('');
        setShowSuggestions(false);
      }
    }
  }, [inputValue, keywords, onKeywordAdd]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    onKeywordAdd(suggestion);
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, [onKeywordAdd]);

  const handleSuggestedKeywordClick = useCallback((keyword: string) => {
    if (keywords.includes(keyword)) {
      onKeywordRemove(keyword);
    } else {
      onKeywordAdd(keyword);
    }
  }, [keywords, onKeywordAdd, onKeywordRemove]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Keywords & Style</h2>
      </div>

      {/* Input with Autocomplete */}
      <div className="relative mb-6">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type keywords like 'minimalist', 'vibrant', 'modern'..."
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:outline-none shadow-lg placeholder:text-gray-400 transition-all duration-300"
        />
        
        {/* Autocomplete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Keywords */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Popular Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {suggestedKeywords.map((item) => (
            <button
              key={item.label}
              onClick={() => handleSuggestedKeywordClick(item.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                keywords.includes(item.label)
                  ? 'bg-blue-500 text-white shadow-lg'
                  : `${item.color} hover:shadow-md`
              }`}
            >
              {keywords.includes(item.label) ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item.label}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
            Your Keywords
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {keywords.length}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <div
                key={keyword}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span>{keyword}</span>
                <button
                  onClick={() => onKeywordRemove(keyword)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">Pro Tip</p>
            <p className="text-sm text-blue-700">
              Add 3-5 keywords that describe your desired style, mood, or industry. 
              The AI will use these to generate matching color palettes and typography.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordPicker;