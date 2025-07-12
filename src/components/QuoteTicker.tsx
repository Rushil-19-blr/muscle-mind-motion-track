import React, { useState, useEffect } from 'react';

const motivationalQuotes = [
  "The groundwork for all happiness is good health. — Leigh Hunt",
  "Success isn't always about greatness. It's about consistency. — Dwayne Johnson",
  "The body achieves what the mind believes. — Napoleon Hill",
  "Take care of your body. It's the only place you have to live. — Jim Rohn",
  "Exercise is a celebration of what your body can do. Not a punishment for what you ate.",
  "Your only limit is you. Push past it.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Don't wish for a good body, work for it.",
  "Champions train, losers complain.",
  "No pain, no gain. Shut up and train.",
  "Fall seven times, stand up eight. — Japanese Proverb",
  "If you want something you've never had, you must be willing to do something you've never done.",
  "The only bad workout is the one that didn't happen.",
  "Discipline is choosing between what you want now and what you want most."
];

export const QuoteTicker: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(motivationalQuotes[currentQuoteIndex]);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-glass/90 backdrop-blur-glass border-t border-glass-border p-2 z-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div 
            className={`whitespace-nowrap text-primary font-medium cursor-pointer hover:text-secondary transition-colors ${
              isPaused ? '' : 'animate-scroll-left'
            }`}
            onClick={handleCopyQuote}
          >
            💪 {motivationalQuotes[currentQuoteIndex]} 💪
          </div>
        </div>
      </div>
    </div>
  );
};
