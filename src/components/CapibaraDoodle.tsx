import React from 'react';

interface CapibaraDoodleProps {
  emotion: 'rara' | 'dificil' | 'aburrida' | 'extranas' | 'triste' | 'feliz' | 'fisico' | 'cerca';
  className?: string;
}

export const CapibaraDoodle: React.FC<CapibaraDoodleProps> = ({ emotion, className = "w-48 h-48" }) => {
  // Capibara colors
  const capyColor = "#a38466"; // Soft brown milk chocolate
  const capyLight = "#be9f80"; // Light muzzle/highlight
  const capyDark = "#7a5c43";  // Shaded brown
  const snoutColor = "#6d523c"; // Dark snout
  const eyeColor = "#3d2d20";

  switch (emotion) {
    case 'rara': // Looking sideways/thoughtful, galaxy/spiral thought bubble
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-rara">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#f0edf6" stroke="#d5cfe1" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Thought bubble elements */}
          <path d="M 120,40 Q 130,20 150,25 Q 170,30 165,50 Q 160,70 140,65 Z" fill="none" stroke="#beb1d3" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="115" cy="55" r="4" fill="#beb1d3" />
          <circle cx="105" cy="65" r="2" fill="#beb1d3" />
          {/* Galaxy swirl inside bubble */}
          <path d="M 143,45 Q 148,35 153,42" fill="none" stroke="#8c78b0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="148" cy="38" r="2" fill="#e27396" />

          {/* Capibara Body */}
          <path d="M 50,140 Q 60,105 100,105 Q 140,105 150,140" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Head profile looking right */}
          <path d="M 95,115 Q 95,85 130,85 Q 145,85 155,95 Q 165,105 160,115 Q 155,120 145,120 Q 110,120 95,115 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Muzzle detail */}
          <path d="M 135,85 Q 150,85 155,95 Q 163,105 157,112 Q 152,118 142,118" fill="none" stroke={capyLight} strokeWidth="2" />
          {/* Dark Snout */}
          <path d="M 152,90 Q 158,100 155,108" fill="none" stroke={snoutColor} strokeWidth="4" strokeLinecap="round" />

          {/* Eye - looking contemplative/up */}
          <ellipse cx="122" cy="100" rx="3" ry="2.5" fill={eyeColor} />
          {/* Eyebrow raised */}
          <path d="M 118,94 Q 123,91 127,93" fill="none" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />

          {/* Ear */}
          <path d="M 102,96 Q 98,92 98,99 Q 98,105 103,101" fill={capyDark} stroke={eyeColor} strokeWidth="2.5" />

          {/* Question mark floating */}
          <text x="141" y="52" fill="#8c78b0" fontSize="18" fontWeight="bold" fontFamily="monospace">?</text>
          
          {/* Rosy cheek */}
          <ellipse cx="132" cy="108" rx="5" ry="3" fill="#ffb4b4" opacity="0.8" />

          {/* Sparkles */}
          <path d="M 40,80 L 45,85 L 40,90 L 35,85 Z" fill="#ebc25d" />
          <path d="M 75,50 L 78,54 L 74,58 L 71,54 Z" fill="#ebc25d" />
        </svg>
      );

    case 'dificil': // wearing sweater, hugging heart
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-dificil">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#fef0f0" stroke="#fcdede" strokeWidth="2" strokeDasharray="4 4" />

          {/* Capibara Body sitting forward */}
          <path d="M 60,150 Q 60,95 100,95 Q 140,95 140,150" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Head looking forward-ish */}
          <path d="M 75,95 Q 75,65 100,65 Q 125,65 125,95 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          
          {/* Cute Ears */}
          <path d="M 78,72 Q 74,66 73,74 Q 72,82 78,78" fill={capyDark} stroke={eyeColor} strokeWidth="2" />
          <path d="M 122,72 Q 126,66 127,74 Q 128,82 122,78" fill={capyDark} stroke={eyeColor} strokeWidth="2" />

          {/* Snout */}
          <path d="M 90,85 Q 100,80 110,85 Q 115,92 100,98 Q 85,92 90,85 Z" fill={capyLight} stroke={eyeColor} strokeWidth="2" />
          <path d="M 96,85 Q 100,88 104,85" fill="none" stroke={eyeColor} strokeWidth="3.5" strokeLinecap="round" />

          {/* Cozy Sweater lines (Stripes on the body!) */}
          <path d="M 62,130 Q 100,120 138,130" fill="none" stroke="#68b0ab" strokeWidth="18" strokeLinecap="round" />
          <path d="M 61,142 Q 100,135 139,142" fill="none" stroke="#faf0ca" strokeWidth="10" strokeLinecap="round" />
          
          {/* Two tiny eyes closed (comforting) */}
          <path d="M 84,77 Q 88,81 92,77" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M 108,77 Q 112,81 116,77" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />

          {/* Cheeks */}
          <ellipse cx="82" cy="85" rx="4" ry="2" fill="#ffb4b4" />
          <ellipse cx="118" cy="85" rx="4" ry="2" fill="#ffb4b4" />

          {/* Large Heart held in arms */}
          <path d="M 100,135 C 80,110 55,130 100,165 C 145,130 120,110 100,135 Z" fill="#e27396" stroke={eyeColor} strokeWidth="3" />
          
          {/* Cozy arms wrapping around the heart */}
          <path d="M 65,125 Q 85,135 95,145" fill="none" stroke={capyColor} strokeWidth="7" strokeLinecap="round" />
          <path d="M 135,125 Q 115,135 105,145" fill="none" stroke={capyColor} strokeWidth="7" strokeLinecap="round" />
          {/* Outline for arms */}
          <path d="M 65,125 Q 85,135 95,145" fill="none" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M 135,125 Q 115,135 105,145" fill="none" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />

          {/* Hanging sparkles */}
          <path d="M 45,55 L 48,58 L 45,61 L 42,58 Z" fill="#ebc25d" />
          <path d="M 155,65 L 158,68 L 155,71 L 152,68 Z" fill="#ebc25d" />
        </svg>
      );

    case 'aburrida': // Yawning, with a blanket
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-aburrida">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#fef8ec" stroke="#faecd1" strokeWidth="2" strokeDasharray="4 4" />

          {/* Lazy lying body */}
          <path d="M 40,150 Q 50,110 90,110 L 150,115 Q 170,125 170,150 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          
          {/* Head lying down */}
          <path d="M 40,130 Q 30,125 35,100 Q 40,75 65,75 Q 85,75 90,105 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />

          {/* Ear */}
          <path d="M 70,85 Q 73,78 78,82 Q 83,86 78,92" fill={capyDark} stroke={eyeColor} strokeWidth="2.5" />

          {/* Sleepy eye arc */}
          <path d="M 48,88 Q 53,92 58,88" fill="none" stroke={eyeColor} strokeWidth="3.2" strokeLinecap="round" />

          {/* Cute Yawning mouth! */}
          <ellipse cx="44" cy="102" rx="5" ry="8" fill="#4d2f1d" stroke={eyeColor} strokeWidth="1.5" />
          <ellipse cx="43" cy="105" rx="3.5" ry="5" fill="#e27396" /> {/* tongue */}

          {/* Cheek rosy */}
          <ellipse cx="58" cy="98" rx="4" ry="2" fill="#ffb4b4" />

          {/* Dotted Cozy Blanket covering back */}
          <path d="M 80,112 Q 120,110 155,115 Q 168,125 168,150 L 78,150 Z" fill="#add8e6" stroke={eyeColor} strokeWidth="3" />
          {/* Blanket dots */}
          <circle cx="95" cy="125" r="3" fill="#ffffff" />
          <circle cx="115" cy="120" r="3" fill="#ffffff" />
          <circle cx="135" cy="123" r="3" fill="#ffffff" />
          <circle cx="105" cy="140" r="3" fill="#ffffff" />
          <circle cx="125" cy="138" r="3" fill="#ffffff" />
          <circle cx="145" cy="135" r="3" fill="#ffffff" />

          {/* Zzz indicators */}
          <text x="110" y="65" fill="#bd9a53" fontSize="14" fontWeight="bold" fontFamily="monospace">Z</text>
          <text x="125" y="52" fill="#bd9a53" fontSize="18" fontWeight="bold" fontFamily="monospace">Z</text>
          <text x="142" y="38" fill="#bd9a53" fontSize="22" fontWeight="bold" fontFamily="monospace">z</text>
        </svg>
      );

    case 'extranas': // Looking at photo, heart floating
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-extranas">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#f0f7f4" stroke="#d6ece2" strokeWidth="2" strokeDasharray="4 4" />

          {/* Capibara Sitting */}
          <path d="M 50,145 Q 60,105 100,105 Q 140,105 145,145" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Head facing profile left-ish */}
          <path d="M 65,110 Q 50,100 50,85 Q 50,70 75,70 Q 100,70 100,100 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />

          {/* Ear */}
          <path d="M 88,80 Q 94,74 96,82" fill={capyDark} stroke={eyeColor} strokeWidth="2.5" />

          {/* Sleepy eyes looking down at frame */}
          <ellipse cx="68" cy="85" rx="2.5" ry="1.5" fill={eyeColor} />
          {/* Cheek */}
          <ellipse cx="63" cy="93" rx="4" ry="2" fill="#ffb4b4" />

          {/* Tiny hands holding the photo frame */}
          <path d="M 58,118 Q 70,123 78,116" fill="none" stroke={eyeColor} strokeWidth="3.5" strokeLinecap="round" />

          {/* Photo frame */}
          <g transform="translate(62, 110) rotate(-10)">
            <rect x="0" y="0" width="35" height="42" rx="3" fill="#ffffff" stroke={eyeColor} strokeWidth="2" />
            <rect x="3" y="3" width="29" height="29" rx="1" fill="#eaefeb" />
            {/* Draw tiny hearts in the photo */}
            <path d="M 18,17 C 15,10 8,15 18,24 C 28,15 21,10 18,17 Z" fill="#e27396" scale="0.5" transform="translate(9, 7) scale(0.5)" />
            <circle cx="13" cy="17" r="1.5" fill="#a38466" />
            <circle cx="21" cy="17" r="1.5" fill="#a38466" />
          </g>

          {/* Floating red love heart */}
          <path d="M 130,65 C 120,45 100,55 130,85 C 160,55 140,45 130,65 Z" fill="#e27396" stroke={eyeColor} strokeWidth="2.5" />
          <path d="M 120,85 Q 110,80 105,90" fill="none" stroke="#e27396" strokeWidth="2" strokeDasharray="3 3" />

          {/* Little sparkles around */}
          <path d="M 160,110 L 163,113 L 160,116 L 157,113 Z" fill="#ebc25d" />
          <path d="M 40,55 L 43,58 L 40,61 L 37,58 Z" fill="#ebc25d" />
        </svg>
      );

    case 'triste': // blanket, rain clouds
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-triste">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#ecf1f6" stroke="#d0e0ed" strokeWidth="2" strokeDasharray="4 4" />

          {/* Sad little rain cloud above */}
          <path d="M 85,35 Q 75,35 73,43 Q 65,45 68,53 Q 73,60 83,58 Q 88,61 95,58 Q 100,61 106,56 Q 115,55 112,45 Q 110,37 100,37 Q 95,33 85,35 Z" fill="#cbd7e2" stroke={eyeColor} strokeWidth="2.5" />
          {/* Drops falling */}
          <path d="M 75,65 L 75,72 M 95,68 L 95,76 M 108,64 L 108,70" stroke="#7fa9cc" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3"/>

          {/* Sad tiny capibara completely wrapped in blanket */}
          {/* Blanket shape */}
          <path d="M 60,155 C 45,130 65,95 100,95 C 135,95 155,130 140,155 Z" fill="#bac7cd" stroke={eyeColor} strokeWidth="3.5" />
          
          {/* Only face peek out */}
          <path d="M 75,120 Q 75,95 100,95 Q 125,95 125,120 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3" />
          
          {/* Little ears poking out */}
          <path d="M 73,103 Q 68,103 72,111" fill={capyDark} stroke={eyeColor} strokeWidth="2" />
          <path d="M 127,103 Q 132,103 128,111" fill={capyDark} stroke={eyeColor} strokeWidth="2" />

          {/* Sad eyes closed */}
          <path d="M 85,110 Q 90,115 93,110" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M 107,110 Q 110,115 115,110" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />

          {/* Muzzle with sad look */}
          <path d="M 94,118 Q 100,115 106,118" fill="none" stroke={eyeColor} strokeWidth="2.5" />
          <path d="M 100,116 L 100,123" stroke={eyeColor} strokeWidth="2" />

          {/* Cozy blanket overlapping fold */}
          <path d="M 68,128 Q 100,118 132,128" fill="none" stroke={eyeColor} strokeWidth="2.5" />
          <path d="M 100,128 L 100,155" stroke={eyeColor} strokeWidth="2.5" strokeDasharray="4 4" />

          {/* Star of hope in background */}
          <path d="M 155,55 L 158,58 L 155,61 L 152,58 Z" fill="#ebc25d" />
        </svg>
      );

    case 'feliz': // flowers, stars
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-feliz">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#fefae0" stroke="#f4f1bb" strokeWidth="2" strokeDasharray="4 4" />

          {/* Golden Stars floating */}
          <path d="M 45,45 Q 47,35 55,37 Q 53,47 45,45 Z" fill="#f7b05b" transform="rotate(15 45 45)" />
          <path d="M 155,45 L 159,49 L 155,53 L 151,49 Z" fill="#ebc25d" />
          <path d="M 160,115 L 163,118 L 160,121 L 157,118 Z" fill="#ebc25d" />
          <path d="M 35,110 L 38,113 L 35,116 L 32,113 Z" fill="#ebc25d" />

          {/* Capibara Body */}
          <path d="M 50,145 Q 60,100 100,100 Q 140,100 150,145" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Head */}
          <path d="M 70,105 Q 65,70 100,70 Q 135,70 130,105 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />

          {/* Snout */}
          <path d="M 85,88 Q 100,82 115,88 Q 120,95 100,100 Q 80,95 85,88 Z" fill={capyLight} stroke={eyeColor} strokeWidth="2.5" />
          <path d="M 96,89 Q 100,92 104,89" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Wide smiley arched eyes */}
          <path d="M 82,78 Q 88,72 92,78" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M 108,78 Q 112,72 118,78" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />

          {/* Cute pink rosy cheeks */}
          <ellipse cx="78" cy="85" rx="6" ry="3.5" fill="#ff9aa2" />
          <ellipse cx="122" cy="85" rx="6" ry="3.5" fill="#ff9aa2" />

          {/* Cute flower on head */}
          <g transform="translate(100, 64)">
            <circle cx="-8" cy="0" r="5" fill="#ffcbdb" stroke={eyeColor} strokeWidth="1" />
            <circle cx="8" cy="0" r="5" fill="#ffcbdb" stroke={eyeColor} strokeWidth="1" />
            <circle cx="0" cy="-8" r="5" fill="#ffcbdb" stroke={eyeColor} strokeWidth="1" />
            <circle cx="0" cy="8" r="5" fill="#ffcbdb" stroke={eyeColor} strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#f7d070" stroke={eyeColor} strokeWidth="1.5" />
          </g>

          {/* Flower at bottom corner */}
          <g transform="translate(145, 132)">
            <circle cx="-5" cy="0" r="3.5" fill="#b5e2fa" stroke={eyeColor} strokeWidth="1" />
            <circle cx="5" cy="0" r="3.5" fill="#b5e2fa" stroke={eyeColor} strokeWidth="1" />
            <circle cx="0" cy="-5" r="3.5" fill="#b5e2fa" stroke={eyeColor} strokeWidth="1" />
            <circle cx="0" cy="5" r="3.5" fill="#b5e2fa" stroke={eyeColor} strokeWidth="1" />
            <circle cx="0" cy="0" r="3" fill="#f7b05b" stroke={eyeColor} strokeWidth="1" />
          </g>
        </svg>
      );

    case 'fisico': // looking at a mirror with heart
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-fisico">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#fbf0fb" stroke="#f1daf1" strokeWidth="2" strokeDasharray="4 4" />

          {/* Handheld Mirror on the left */}
          <g transform="translate(35, 75) rotate(-15)">
            {/* Mirror handle */}
            <rect x="18" y="45" width="6" height="30" rx="3" fill="#e9c46a" stroke={eyeColor} strokeWidth="2.5" />
            {/* Mirror frame */}
            <circle cx="21" cy="25" r="23" fill="#e9c46a" stroke={eyeColor} strokeWidth="2.5" />
            {/* Mirror glass */}
            <circle cx="21" cy="25" r="18" fill="#90e0ef" stroke={eyeColor} strokeWidth="1.5" />
            {/* Reflection shine */}
            <path d="M 12,15 L 29,32" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            {/* tiny pink heart in mirror reflection */}
            <path d="M 21,27 C 19,23 15,25 21,31 C 27,25 23,23 21,27 Z" fill="#e27396" scale="0.6" transform="translate(8, 8) scale(0.6)" />
          </g>

          {/* Capibara Body sitting looking left-ish toward the mirror */}
          <path d="M 80,145 Q 90,105 130,105 Q 165,105 170,145" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Head looking left */}
          <path d="M 100,112 Q 85,102 85,87 Q 85,72 110,72 Q 135,72 135,102 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />

          {/* Ear */}
          <path d="M 124,82 Q 128,76 130,84" fill={capyDark} stroke={eyeColor} strokeWidth="2.5" />

          {/* Eyes looking sideways at mirror/smiling */}
          <path d="M 100,85 Q 105,82 109,85" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Nose snout highlight */}
          <path d="M 87,90 Q 98,85 98,95" fill="none" stroke={capyLight} strokeWidth="2" />

          {/* Beautiful eyelashes/rosy cheek */}
          <ellipse cx="108" cy="93" rx="4" ry="2" fill="#ffb4b4" />

          {/* Sparkles of self-love */}
          <path d="M 140,55 L 143,58 L 140,61 L 137,58 Z" fill="#ebc25d" />
          <path d="M 110,40 L 114,43 L 110,46 L 106,43 Z" fill="#ebc25d" />
          <path d="M 70,135 L 73,138 L 70,141 L 67,138 Z" fill="#ebc25d" />

          {/* Heart float above head */}
          <path d="M 110,65 C 105,53 95,58 110,71 C 125,58 115,53 110,65 Z" fill="#ff9aa2" stroke={eyeColor} strokeWidth="1.5" />
        </svg>
      );

    case 'cerca': // relaxed taking tea
      return (
        <svg viewBox="0 0 200 200" className={className} id="capy-cerca">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#fbf5f2" stroke="#ebdcd5" strokeWidth="2" strokeDasharray="4 4" />

          {/* Capibara Body sitting profile-ish */}
          <path d="M 50,145 Q 60,105 100,105 Q 140,105 145,145" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />
          {/* Head facing right-ish */}
          <path d="M 80,110 Q 75,75 110,75 Q 140,75 135,110 Z" fill={capyColor} stroke={eyeColor} strokeWidth="3.5" />

          {/* Ear */}
          <path d="M 88,85 Q 82,82 85,90" fill={capyDark} stroke={eyeColor} strokeWidth="2.5" />

          {/* Eyes closed peacefully */}
          <path d="M 102,88 Q 106,91 110,88" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />

          {/* Snout */}
          <path d="M 115,92 Q 125,87 128,95 Q 125,102 115,100" fill="none" stroke={capyLight} strokeWidth="2" />
          <ellipse cx="123" cy="92" rx="2" ry="1.5" fill={eyeColor} /> {/* nose hole */}

          {/* Rosy cheek */}
          <ellipse cx="100" cy="95" rx="4" ry="2" fill="#ffb4b4" />

          {/* Cute towel folded on head (classic Capybara Onsen style!) */}
          <rect x="92" y="65" width="28" height="11" rx="2.5" fill="#ffffff" stroke={eyeColor} strokeWidth="2.5" />
          <line x1="101" y1="65" x2="101" y2="76" stroke={eyeColor} strokeWidth="1.5" />
          <line x1="110" y1="65" x2="110" y2="76" stroke={eyeColor} strokeWidth="1.5" />

          {/* Little steaming teacup in front */}
          <g transform="translate(130, 125)">
            {/* Cup */}
            <path d="M 0,5 H 18 V 16 C 18,20 0,20 0,16 Z" fill="#ebc25d" stroke={eyeColor} strokeWidth="2.5" />
            <path d="M 18,8 Q 23,8 23,12 Q 23,16 18,16" fill="none" stroke={eyeColor} strokeWidth="2" />
            {/* Steam waves */}
            <path d="M 4,-2 Q 6,-7 4,-12" fill="none" stroke="#77a2a6" strokeWidth="2" strokeLinecap="round" />
            <path d="M 12,-4 Q 10,-9 12,-14" fill="none" stroke="#77a2a6" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Background sparkles */}
          <path d="M 40,75 L 43,78 L 40,81 L 37,78 Z" fill="#ebc25d" />
          <path d="M 160,85 L 163,88 L 160,91 L 157,88 Z" fill="#ebc25d" />
        </svg>
      );

    default:
      return null;
  }
};
