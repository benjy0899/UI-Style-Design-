import React, { useState } from 'react';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
}

interface TypographyPairing {
  headline: string;
  body: string;
}

interface MatchingStyleKitProps {
  colorPalette: ColorPalette;
  typography: TypographyPairing;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const MatchingStyleKit: React.FC<MatchingStyleKitProps> = ({
  colorPalette,
  typography,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [activeComponent, setActiveComponent] = useState<string>('button');

  const components = [
    { id: 'button', name: 'Button', icon: '🔘' },
    { id: 'card', name: 'Card', icon: '📄' },
    { id: 'form', name: 'Form', icon: '📝' },
    { id: 'modal', name: 'Modal', icon: '🪟' },
    { id: 'navbar', name: 'Navbar', icon: '📊' }
  ];

  const themeColors = isDarkMode ? {
    bg: '#1F2937',
    cardBg: '#374151',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#4B5563'
  } : {
    bg: colorPalette.background,
    cardBg: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB'
  };

  const renderComponent = () => {
    const baseStyle = {
      fontFamily: typography.body,
      color: themeColors.text
    };

    switch (activeComponent) {
      case 'button':
        return (
          <div className="space-y-4">
            <button
              style={{
                backgroundColor: colorPalette.primary,
                color: 'white',
                fontFamily: typography.body,
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Primary Button
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: colorPalette.primary,
                fontFamily: typography.body,
                padding: '12px 24px',
                borderRadius: '12px',
                border: `2px solid ${colorPalette.primary}`,
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Secondary Button
            </button>
            <button
              style={{
                backgroundColor: colorPalette.accent,
                color: 'white',
                fontFamily: typography.body,
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Small Button
            </button>
          </div>
        );

      case 'card':
        return (
          <div
            style={{
              backgroundColor: themeColors.cardBg,
              border: `1px solid ${themeColors.border}`,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              ...baseStyle
            }}
          >
            <h3
              style={{
                fontFamily: typography.headline,
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                color: themeColors.text
              }}
            >
              Card Title
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '16px',
                color: themeColors.textSecondary
              }}
            >
              This is a sample card component with your generated color palette and typography.
            </p>
            <div className="flex gap-2">
              <span
                style={{
                  backgroundColor: colorPalette.primary,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                Tag
              </span>
              <span
                style={{
                  backgroundColor: colorPalette.accent,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                Label
              </span>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-4">
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: themeColors.text,
                  fontFamily: typography.body
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${themeColors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: themeColors.cardBg,
                  color: themeColors.text,
                  fontFamily: typography.body
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: themeColors.text,
                  fontFamily: typography.body
                }}
              >
                Message
              </label>
              <textarea
                placeholder="Your message here..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${themeColors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: themeColors.cardBg,
                  color: themeColors.text,
                  fontFamily: typography.body,
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        );

      case 'modal':
        return (
          <div
            style={{
              backgroundColor: themeColors.cardBg,
              border: `1px solid ${themeColors.border}`,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              ...baseStyle
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontFamily: typography.headline,
                  fontSize: '18px',
                  fontWeight: '700',
                  color: themeColors.text
                }}
              >
                Confirm Action
              </h3>
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: themeColors.textSecondary,
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '20px',
                color: themeColors.textSecondary
              }}
            >
              Are you sure you want to proceed with this action? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: themeColors.textSecondary,
                  border: `1px solid ${themeColors.border}`,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: typography.body
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: colorPalette.primary,
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: typography.body
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        );

      case 'navbar':
        return (
          <div
            style={{
              backgroundColor: themeColors.cardBg,
              border: `1px solid ${themeColors.border}`,
              borderRadius: '12px',
              padding: '16px 24px',
              ...baseStyle
            }}
          >
            <div className="flex items-center justify-between">
              <div
                style={{
                  fontFamily: typography.headline,
                  fontSize: '18px',
                  fontWeight: '700',
                  color: colorPalette.primary
                }}
              >
                Brand
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  style={{
                    color: themeColors.text,
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: typography.body
                  }}
                >
                  Home
                </a>
                <a
                  href="#"
                  style={{
                    color: themeColors.textSecondary,
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: typography.body
                  }}
                >
                  About
                </a>
                <a
                  href="#"
                  style={{
                    color: themeColors.textSecondary,
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: typography.body
                  }}
                >
                  Contact
                </a>
                <button
                  style={{
                    backgroundColor: colorPalette.accent,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: typography.body
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Matching Style Kit</h2>
        </div>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Component Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {components.map((component) => (
          <button
            key={component.id}
            onClick={() => setActiveComponent(component.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeComponent === component.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{component.icon}</span>
              {component.name}
            </span>
          </button>
        ))}
      </div>

      {/* Component Preview */}
      <div
        className="rounded-2xl p-8 border-2 border-dashed border-gray-300 min-h-[200px] flex items-center justify-center transition-all duration-300"
        style={{ backgroundColor: themeColors.bg }}
      >
        {renderComponent()}
      </div>

      {/* Send to Style Generator */}
      <div className="mt-6 text-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Send to Style Generator
          </span>
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Refine and customize these components in our advanced editor
        </p>
      </div>
    </div>
  );
};

export default MatchingStyleKit;