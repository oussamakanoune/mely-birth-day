import React from 'react';
import type { Track } from '../data/tracks';

interface SongArtworkProps {
  track: Track;
  className?: string;
}

export const SongArtwork: React.FC<SongArtworkProps> = ({ track, className = 'w-full h-full' }) => {
  const { iconType } = track.theme;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${track.theme.gradient} flex items-center justify-center ${className}`}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial from-pink-500/20 via-transparent to-black/60 pointer-events-none" />

      {/* Unique visual art based on song identity */}
      {iconType === 'cosmic' && (
        // Uranus - PNL: Cosmic planetary silhouette with starlight and celestial rings
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <circle cx="50" cy="50" r="28" fill="#1e1035" stroke="#f472b6" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="42" ry="12" stroke="#e879f9" strokeWidth="1.2" transform="rotate(-25 50 50)" opacity="0.8" />
          <circle cx="38" cy="42" r="3" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 0 3px #fff)" />
          <circle cx="68" cy="28" r="1.5" fill="#fbcfe8" />
          <circle cx="25" cy="72" r="1.5" fill="#fbcfe8" />
          {/* Couple / Two figures silhouette matching Reference 3 */}
          <path d="M42 66 C42 60 45 56 47 56 C49 56 50 58 50 66 Z" fill="#090514" />
          <circle cx="46" cy="54" r="2.5" fill="#090514" />
          <path d="M52 66 C52 60 55 56 57 56 C59 56 60 58 60 66 Z" fill="#090514" />
          <circle cx="56" cy="54" r="2.5" fill="#090514" />
        </svg>
      )}

      {iconType === 'palace' && (
        // Meleğim - Soolking feat Dadju: Tall glowing minaret / tower at purple sunset (matching Reference 3)
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <circle cx="50" cy="35" r="18" fill="#f472b6" opacity="0.3" filter="blur(4px)" />
          <circle cx="50" cy="35" r="12" fill="#fed7aa" opacity="0.7" />
          {/* Spire / Tower silhouette */}
          <path d="M47 80 L47 40 L50 22 L53 40 L53 80 Z" fill="#130924" stroke="#c084fc" strokeWidth="0.5" />
          <rect x="44" y="55" width="12" height="4" rx="1" fill="#2e104d" />
          <rect x="42" y="70" width="16" height="4" rx="1" fill="#2e104d" />
          <circle cx="50" cy="20" r="2" fill="#fef08a" />
          <path d="M0 80 Q 50 70 100 80 L100 100 L0 100 Z" fill="#0c0617" />
        </svg>
      )}

      {iconType === 'tower' && (
        // J'oublie tout - Jul: Twilight city / urban night silhouette
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <rect x="20" y="45" width="16" height="40" fill="#0f172a" />
          <rect x="42" y="30" width="18" height="55" fill="#1e1b4b" />
          <rect x="66" y="50" width="18" height="35" fill="#0f172a" />
          <circle cx="51" cy="25" r="2" fill="#38bdf8" />
          {/* City lights dots */}
          <circle cx="48" cy="40" r="1.5" fill="#fef08a" />
          <circle cx="54" cy="48" r="1.5" fill="#f472b6" />
          <circle cx="28" cy="55" r="1.5" fill="#fef08a" />
          <circle cx="75" cy="60" r="1.5" fill="#38bdf8" />
        </svg>
      )}

      {iconType === 'sunset' && (
        // Despacito - Luis Fonsi: Sunset coast & palm silhouette
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <circle cx="50" cy="45" r="20" fill="#fb7185" opacity="0.6" filter="blur(3px)" />
          <circle cx="50" cy="45" r="14" fill="#fde047" />
          {/* Ocean waves */}
          <path d="M0 65 Q 25 60 50 65 T 100 65 L100 100 L0 100 Z" fill="#2e0827" />
          <path d="M0 78 Q 25 74 50 78 T 100 78 L100 100 L0 100 Z" fill="#180415" />
          {/* Palm leaf contour */}
          <path d="M20 75 Q 35 45 65 40" stroke="#0f020f" strokeWidth="3" />
          <path d="M65 40 Q 55 48 50 55" stroke="#0f020f" strokeWidth="2" />
          <path d="M65 40 Q 75 48 80 56" stroke="#0f020f" strokeWidth="2" />
        </svg>
      )}

      {iconType === 'ammoniaque' && (
        // À l'ammoniaque - PNL: Dreamy purple haze & twin stars
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <circle cx="40" cy="45" r="22" fill="#a855f7" opacity="0.4" filter="blur(6px)" />
          <circle cx="62" cy="55" r="18" fill="#ec4899" opacity="0.35" filter="blur(5px)" />
          <circle cx="45" cy="40" r="3" fill="#ffffff" filter="drop-shadow(0 0 4px #e879f9)" />
          <circle cx="65" cy="50" r="2" fill="#ffffff" filter="drop-shadow(0 0 3px #f472b6)" />
          <path d="M15 85 Q 50 75 85 85 L85 100 L15 100 Z" fill="#130924" />
        </svg>
      )}

      {iconType === 'clouds' && (
        // Sometimes It Is Hard to Face Reality: Starlight clouds & celestial cross
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <path d="M30 65 Q 40 45 55 50 Q 70 45 75 60 Q 85 65 75 75 L25 75 Q 15 65 30 65 Z" fill="#312e81" opacity="0.6" filter="blur(2px)" />
          {/* Celestial cross starlight */}
          <path d="M50 25 L50 65 M30 45 L70 45" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(0 0 4px #e0e7ff)" />
          <circle cx="50" cy="45" r="3" fill="#ffffff" />
        </svg>
      )}

      {iconType === 'lantern' && (
        // ضيعت عليه العمر يبويا: Arabic heritage warm glowing lantern & desert night
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <circle cx="50" cy="48" r="16" fill="#f59e0b" opacity="0.4" filter="blur(5px)" />
          {/* Traditional Fanous (lantern) shape */}
          <path d="M46 32 L54 32 L58 46 L50 62 L42 46 Z" fill="#451a03" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="50" cy="28" r="3" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="50" cy="46" r="3" fill="#fef08a" filter="drop-shadow(0 0 4px #fbbf24)" />
          {/* Sand dune line */}
          <path d="M0 80 Q 40 70 80 82 T 100 85 L100 100 L0 100 Z" fill="#1c0c05" />
        </svg>
      )}

      {iconType === 'moon' && (
        // Ray'a - Amr Diab: Moonlit balcony & tranquil night waters
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          <circle cx="65" cy="35" r="14" fill="#e0e7ff" opacity="0.8" filter="drop-shadow(0 0 6px #818cf8)" />
          <circle cx="70" cy="32" r="12" fill="#1e1b4b" />
          {/* Balcony balustrade */}
          <path d="M10 75 L90 75" stroke="#4338ca" strokeWidth="2.5" />
          <path d="M20 75 L20 95 M40 75 L40 95 M60 75 L60 95 M80 75 L80 95" stroke="#312e81" strokeWidth="2" />
          <circle cx="25" cy="40" r="1" fill="#fbcfe8" />
          <circle cx="45" cy="25" r="1.5" fill="#ffffff" />
        </svg>
      )}

      {iconType === 'aurora' && (
        // La misère est si belle - PNL: Dreamy twilight aurora & brotherly silhouettes
        <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
          {/* Aurora ribbon gradient effect */}
          <path d="M10 40 Q 35 20 60 35 T 100 25" stroke="#ec4899" strokeWidth="6" opacity="0.35" filter="blur(4px)" />
          <path d="M0 50 Q 40 30 75 45 T 100 35" stroke="#a855f7" strokeWidth="5" opacity="0.4" filter="blur(4px)" />
          <circle cx="78" cy="24" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #f472b6)" />
          <circle cx="30" cy="28" r="1.5" fill="#fbcfe8" />
          {/* Distant building rooftop skyline */}
          <path d="M0 72 L18 68 L28 72 L45 64 L58 70 L72 65 L88 72 L100 68 L100 100 L0 100 Z" fill="#120722" />
          {/* Silhouette of two brothers sitting on rooftop looking at horizon */}
          <circle cx="45" cy="56" r="2.5" fill="#090312" />
          <path d="M42 66 C42 60 44 58 46 58 C48 58 50 60 50 66 Z" fill="#090312" />
          <circle cx="54" cy="55" r="2.5" fill="#090312" />
          <path d="M51 66 C51 59 53 57 55 57 C57 57 59 59 59 66 Z" fill="#090312" />
        </svg>
      )}
    </div>
  );
};
