import React from 'react';
import { Linkedin, Copy } from 'lucide-react';

export default function RoastResult({ result, language }) {
  const [copied, setCopied] = React.useState(false);
  const [displayScore, setDisplayScore] = React.useState(0);

  React.useEffect(() => {
    if (result) {
      let start = 0;
      const end = result.unemployability_score;
      const duration = 1500;
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [result]);

  if (!result) return null;

  const shareText = `🔥 I just got roasted by The Unfiltered Candidate!\n\n"${result.roasted_answer}"\n\nMy Unemployability Score: ${result.unemployability_score}% 💀\n\n#RoastMe #HRRoast #TheUnfilteredCandidate`;

  const handleLinkedInShare = () => {
    // Try to use Web Share API first (works better on mobile)
    if (navigator.share) {
      navigator.share({
        title: 'The Unfiltered Candidate - Roast Result',
        text: shareText,
      }).catch((error) => {
        // If user cancels or error occurs, fall back to LinkedIn URL
        if (error.name !== 'AbortError') {
          openLinkedInShare();
        }
      });
    } else {
      // Desktop fallback - open LinkedIn compose
      openLinkedInShare();
    }
  };

  const openLinkedInShare = () => {
    // LinkedIn's sharing URL - this opens the share dialog
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.roasted_answer).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-2xl relative mt-8">
      {/* Floating Emoji Icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FFF8E7] p-2 rounded-2xl shadow-sm border border-orange-100 z-10">
        <span className="text-3xl">🍳</span>
      </div>

      <div className="w-full bg-[#FFF8E7] rounded-3xl p-8 pt-12 shadow-lg border-b-8 border-r-4 border-[#E5DCC5] relative overflow-hidden">
        {copied && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full animate-fade-in z-20">
            Copied to clipboard!
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="font-black text-xl text-gray-900 uppercase tracking-wider">
            {language === 'malayalam' ? 'റോസ്റ്റ് ഔട്ട്പുട്ട്' : 'ROASTED OUTPUT'}
          </h3>
        </div>
        
        {/* Content */}
        <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-10 text-center">
          {result.roasted_answer}
        </p>

        {/* Footer Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          
          {/* Score Pill */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              {language === 'malayalam' ? 'ജോലി കിട്ടില്ല' : 'UNEMPLOYABILITY SCORE'}
            </span>
            <div className="flex items-center bg-[#F4D03F] rounded-full p-1.5 pr-6 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full md:w-auto min-w-[200px]">
              <div className="bg-black text-[#F4D03F] rounded-full px-4 py-1.5 font-black text-xl min-w-[80px] text-center">
                {displayScore}%
              </div>
              <div className="flex-1 text-center font-black text-black uppercase tracking-wider text-sm ml-2">
                {language === 'malayalam' ? 'പണി പാളി' : 'UNHIREABLE'}
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleLinkedInShare}
              className="w-12 h-12 rounded-full bg-[#F4D03F] border-2 border-black flex items-center justify-center hover:translate-y-1 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-black"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button 
              onClick={handleCopy}
              className="w-12 h-12 rounded-full bg-[#F4D03F] border-2 border-black flex items-center justify-center hover:translate-y-1 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-black"
              title="Copy to Clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
