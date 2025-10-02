import React, { useState, useEffect } from 'react';

const RemixChallenge: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 34, seconds: 56 });
  const [participants, setParticipants] = useState(247);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    // Simulate participant count updates
    const participantTimer = setInterval(() => {
      setParticipants(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(participantTimer);
    };
  }, []);
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-orange-400/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Enhanced Challenge Badge */}
        <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 mb-8 border border-white/30">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-white font-bold text-sm uppercase tracking-wider">
            🏆 Weekly Challenge
          </span>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Enhanced Main Content */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          This week's challenge:
          <br />
          <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-pulse">
            Create a retro arcade UI! 🕹️
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join hundreds of designers creating pixel-perfect retro interfaces. 
          Share your creation and win exclusive design resources.
        </p>

        {/* Enhanced Challenge Stats with Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2 animate-pulse">{participants}</div>
            <div className="text-white/70 text-sm uppercase tracking-wider">Participants</div>
            <div className="text-green-300 text-xs mt-1">+3 joined recently</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">{timeLeft.days}</div>
            <div className="text-white/70 text-sm uppercase tracking-wider">Days Left</div>
            <div className="text-yellow-300 text-xs mt-1">Hurry up!</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">$500</div>
            <div className="text-white/70 text-sm uppercase tracking-wider">Prize Pool</div>
            <div className="text-blue-300 text-xs mt-1">Winner takes all</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">🎮</div>
            <div className="text-white/70 text-sm uppercase tracking-wider">Theme</div>
            <div className="text-purple-300 text-xs mt-1">Retro Arcade</div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/20 max-w-2xl mx-auto">
          <p className="text-white/80 text-sm mb-4 uppercase tracking-wider">Time Remaining</p>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">{timeLeft.days}</div>
              <div className="text-white/60 text-xs uppercase">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300 mb-1">{timeLeft.hours}</div>
              <div className="text-white/60 text-xs uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-300 mb-1">{timeLeft.minutes}</div>
              <div className="text-white/60 text-xs uppercase">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300 mb-1 animate-pulse">{timeLeft.seconds}</div>
              <div className="text-white/60 text-xs uppercase">Seconds</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-white text-purple-600 px-12 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              🎨 Start Creating
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          
          <button className="bg-black/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-white/30 hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            📋 View Rules
          </button>
        </div>

        {/* Enhanced Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-semibold">Free to Join</span>
            </div>
            <p className="text-white/70 text-sm">No entry fees or hidden costs. Just bring your creativity!</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <span className="text-white font-semibold">All Levels Welcome</span>
            </div>
            <p className="text-white/70 text-sm">From beginners to pros, everyone can participate and learn.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <span className="text-white font-semibold">Community Voting</span>
            </div>
            <p className="text-white/70 text-sm">Winners chosen by community votes and expert judges.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemixChallenge;