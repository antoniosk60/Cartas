import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, Sparkles, Smile, Star, ArrowRight, Music, HelpCircle, Gift, Shuffle, RefreshCw, Bookmark } from 'lucide-react';
import { CapibaraDoodle } from './components/CapibaraDoodle';
import { SopaDeLetras } from './components/SopaDeLetras';

type PageId = 'home' | 'rara' | 'dificil' | 'aburrida' | 'extranas' | 'triste' | 'feliz' | 'fisico' | 'cerca';

interface LetterSection {
  id: PageId;
  title: string;
  buttonLabel: string;
  color: string; // Pastel gradient background styling
  badgeColor: string;
  textColor: string;
  emoji: string;
}

// 8 letters declaration mapping to emotions
const letterSections: LetterSection[] = [
  {
    id: 'rara',
    title: '¿Te sientes rara?',
    buttonLabel: '¿Te sientes rara?',
    color: 'from-purple-100/90 to-indigo-100/90 border-purple-200 text-purple-950 hover:from-purple-200 hover:to-indigo-200 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-purple-200 text-purple-800',
    textColor: 'text-purple-900',
    emoji: '🌀'
  },
  {
    id: 'dificil',
    title: '¿Estás pasando por un momento difícil?',
    buttonLabel: '¿Momento difícil?',
    color: 'from-rose-100/90 to-red-100/80 border-rose-200 text-rose-950 hover:from-rose-200 hover:to-red-200 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-rose-200 text-rose-800',
    textColor: 'text-red-900',
    emoji: '🩹'
  },
  {
    id: 'aburrida',
    title: '¿Estás aburrida?',
    buttonLabel: '¿Estás aburrida?',
    color: 'from-amber-100/90 to-yellow-100/70 border-amber-205 text-amber-950 hover:from-amber-200 hover:to-yellow-250 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-amber-200 text-amber-850',
    textColor: 'text-amber-900',
    emoji: '🎈'
  },
  {
    id: 'extranas',
    title: '¿Me extrañas?',
    buttonLabel: '¿Me extrañas?',
    color: 'from-pink-100/95 to-rose-100/80 border-pink-200 text-pink-950 hover:from-pink-200 hover:to-rose-200 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-pink-200 text-pink-800',
    textColor: 'text-pink-900',
    emoji: '💌'
  },
  {
    id: 'triste',
    title: '¿Estás triste?',
    buttonLabel: '¿Estás triste?',
    color: 'from-sky-100/90 to-blue-105/90 border-sky-200 text-sky-950 hover:from-sky-200 hover:to-blue-200 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-sky-200 text-sky-800',
    textColor: 'text-sky-950',
    emoji: '🌧️'
  },
  {
    id: 'feliz',
    title: '¿Estás feliz?',
    buttonLabel: '¿Estás feliz?',
    color: 'from-emerald-100/90 to-teal-100/90 border-emerald-200 text-emerald-950 hover:from-emerald-200 hover:to-teal-200 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-emerald-200 text-emerald-800',
    textColor: 'text-emerald-900',
    emoji: '✨'
  },
  {
    id: 'fisico',
    title: '¿Te sientes mal por tu físico?',
    buttonLabel: '¿Dudas de tu físico?',
    color: 'from-pink-105 to-fuchsia-100/90 border-pink-150 text-pink-950 hover:from-pink-150 hover:to-fuchsia-200 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-pink-200 text-pink-800',
    textColor: 'text-pink-950',
    emoji: '🌸'
  },
  {
    id: 'cerca',
    title: 'Solo quiero sentirte cerca',
    buttonLabel: 'Sentirme cerca',
    color: 'from-orange-100/90 to-amber-100/80 border-orange-200 text-orange-950 hover:from-orange-200 hover:to-amber-205 hover:-translate-y-1 hover:shadow-md',
    badgeColor: 'bg-orange-200 text-orange-850',
    textColor: 'text-orange-950',
    emoji: '🧸'
  }
];

// Romantic daily randomized promise cards
const romanticCompliments = [
  "¿Sabías que mi mundo es un millón de veces más bonito desde que te tengo en mi vida? Eres asombrosa. ✨",
  "Te amo más de lo que la física permite. ¡O de aquí hasta el Sol de ida y vuelta en un carrusel de capibaras! ☀️",
  "Tu sonrisa es mi salvapantallas mental favorito. Prometo intentar sacarte una todos los días de mi vida. ❤️",
  "Hueles a felicidad y sabes a mi rincón favorito de este planeta. Eres mi hogar más abrigadito. 🏡🌻",
  "Si pudieras verte a través de mis ojos, entenderías perfectamente por qué me brillan al mirarte. 😍",
  "Te prometo abrazos que resuelvan el cansancio, mimos infinitos y amarte libre y bonito siempre. 🧸",
  "Eres todo lo que algún día le pedí al cielo, pero con un cabello precioso y la risa más tierna del universo. 🪐"
];

interface LoveParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [kissCount, setKissCount] = useState<number>(() => {
    const saved = localStorage.getItem('capy_kisses');
    return saved ? parseInt(saved) : 0;
  });
  const [particles, setParticles] = useState<LoveParticle[]>([]);
  const [dailyComplimentIndex, setDailyComplimentIndex] = useState<number>(0);
  const [highlightNoteClicked, setHighlightNoteClicked] = useState(false);

  const currentSection = letterSections.find(s => s.id === currentPage);

  const renderBackgroundDoodles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Sparkly items scattered around margins */}
      <span className="absolute top-10 left-8 text-xl opacity-45 animate-bounce">💖</span>
      <span className="absolute top-1/4 right-6 text-xl opacity-35">🌸</span>
      <span className="absolute bottom-1/3 left-6 text-2xl opacity-40 animate-pulse">⭐</span>
      <span className="absolute bottom-12 right-12 text-xl opacity-45 animate-bounce">✨</span>
      <span className="absolute top-1/2 left-10 text-lg opacity-30">🌼</span>
      <span className="absolute top-20 right-16 text-xl opacity-25">💕</span>
    </div>
  );

  // Sync state with URL hash for proper multi-page responsive feel
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'rara', 'dificil', 'aburrida', 'extranas', 'triste', 'feliz', 'fisico', 'cerca'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Select random compliment index on mount
    setDailyComplimentIndex(Math.floor(Math.random() * romanticCompliments.length));

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    window.location.hash = page === 'home' ? '' : page;
  };

  // Sparkles on capybara tap
  const handleCapybaraClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Increment kiss metrics
    const newKisses = kissCount + 1;
    setKissCount(newKisses);
    localStorage.setItem('capy_kisses', newKisses.toString());

    // Generate cute romantic emojis bursting
    const heartEmojis = ['❤️', '💖', '✨', '🌸', '💕', '🍓', '🧸', '☀️', '🌻', '🐾', '💌'];
    const newParticles: LoveParticle[] = [];

    // Spawn 8 particles around client click or centered if touch is not perfectly positioned
    const rect = e.currentTarget.getBoundingClientRect();
    const targetX = e.clientX - rect.left || 100;
    const targetY = e.clientY - rect.top || 100;

    for (let i = 0; i < 7; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        x: targetX + (Math.random() - 0.5) * 60,
        y: targetY + (Math.random() - 0.5) * 40,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      });
    }

    setParticles(prev => [...prev, ...newParticles].slice(-40)); // Keep max 40 in DOM
  };

  const getNewCompliment = () => {
    let nextIdx = (dailyComplimentIndex + 1) % romanticCompliments.length;
    setDailyComplimentIndex(nextIdx);
    setHighlightNoteClicked(true);
    setTimeout(() => setHighlightNoteClicked(false), 800);
  };

  // Renders the emotional text incorporating highly decorative pens / highlights
  const renderHighlightedText = (id: PageId) => {
    switch (id) {
      case 'rara':
        return (
          <>
            ¿Te sientes rara? Pues mira, a mí <span className="highlighter-pink font-semibold">me gustas incluso cuando te sientes rara</span>. Especialmente entonces. No tienes que encajar ni tener sentido siempre.<br /><br />
            <span className="inline-block hover:scale-101 transition-transform my-1 rotate-1 bg-amber-50 px-2 py-0.5 border border-dashed border-amber-300 rounded font-bold text-amber-900">✨ Respira, mi amor.</span> Eres <span className="highlighter-yellow font-semibold">mi persona favorita en todo el universo</span>, incluso en tus días más extraños y locos. Tómate un lindo respiro, ponte tu canción preferida más rara y báilala un poquito. Te abrazo fuertísimo.
          </>
        );
      case 'dificil':
        return (
          <>
            Sé que esto que estás sintiendo hoy es muy pesado. Pero <span className="highlighter-blue font-semibold">no estás sola, ¿vale?</span> Nunca lo estarás.<br /><br />
            No tienes que resolver todo hoy, ni cargar con el mundo entero tú sola. Respira hondo. <span className="highlighter-pink font-semibold">Yo siempre estoy aquí contigo</span> aunque no pueda estar físicamente para abrazarte en este mismísimo segundo. Un día a la vez. Te mando un abrazo enorme de esos mágicos que <span className="highlighter-yellow font-semibold">aprietan muy fuerte pero quitan todo el dolor</span>.
          </>
        );
      case 'aburrida':
        return (
          <>
            ¿Aburrida? ¡Pues mira que estamos a tiempo de hacer algo increíblemente absurdo!<br /><br />
            Mira el plan: baila una canción horrible, dibuja un monstruo feo con tres cabezas en tu mente, o mándame ya mismo un audio diciendo tonterías. O muchísimo mejor: <span className="highlighter-yellow font-semibold">haz la sopa de letras mágica</span> que te dibujé con todo mi amor aquí abajo. Te adoro cuando te aburres, y <span className="highlighter-pink font-semibold">te adoro mil veces más cuando te aburres conmigo</span>. ❤️
          </>
        );
      case 'extranas':
        return (
          <>
            Me extrañas... y yo a ti con toda mi alma entera. Pero piensa esto: esto no es un adiós triste, solo es un <span className="highlighter-pink font-semibold">"ahora mismo no nos vemos"</span>.<br /><br />
            Cuenta las horas si quieres, pero acuérdate de contar también todas las cosas bonitas que te pasen mientras tanto. <span className="highlighter-yellow font-semibold">Cada minuto que corre es un minuto menos</span> para volver a enroscar mis brazos a tu cintura y reírnos juntos. Te siento respirar conmigo aunque esté lejos.
          </>
        );
      case 'triste':
        return (
          <>
            Está bien estar triste, mi sol. <span className="highlighter-blue font-semibold">No tienes que ser súper fuerte siempre</span>. Llorar limpia los ojitos y el alma.<br /><br />
            Pero por favor quiero que recuerdes algo importante: esa tristeza no te define, es solo una nube gris y pasajera que te visita hoy. Mientras esté aquí, <span className="highlighter-pink font-semibold">yo me siento a tu ladito bajo la lluvia</span>. No te voy a decir el aburrido "anímate". Solo te digo: respira, llora si te nace, y nunca olvides que hay alguien (yo) que <span className="highlighter-yellow font-semibold">te ama locamente incluso en tus días grises</span>.
          </>
        );
      case 'feliz':
        return (
          <>
            ¡Qué cosa tan hermosa es verte feliz! <span className="highlighter-yellow font-semibold">Me fascina cuando sonríes así</span>, iluminas mi cielo entero. Guarda este momentito precioso. Míralo bien en tu mente, porque <span className="highlighter-pink font-semibold">tú te mereces ser inmensamente feliz</span> todos los días de tu vida.<br /><br />
            Aunque no esté al lado tuyo para verte brillar hoy, quiero que sepas que verte feliz me hace el novio más dichoso del planeta. Sigue sonriendo así, mi amor de la vida. 🌟
          </>
        );
      case 'fisico':
        return (
          <>
            Oye, acércate y escúchame bien: <span className="highlighter-pink font-semibold">a mí no me interesan las imperfecciones</span> que a veces crees ver en el espejo. A mí me encantas tú entera, de la cabeza a la punta de los pies.<br /><br />
            Tu cuerpo es el refugio favorito que abrazo, el que me da calorcito rico, el que ríe con la pancita cuando hacemos chistes. <span className="highlighter-yellow font-semibold">Eres preciosa, eres arte puro</span>. Te lo digo hoy porque es la verdad absoluta. Mírate al espejo ahora mismo y repite fuerte: <span className="highlighter-blue font-semibold">"soy suficiente y hermosa"</span>. Te mando un beso cálido justo donde más lo necesites.
          </>
        );
      case 'cerca':
        return (
          <>
            No pasa absolutamente nada especial, ¿sabes? Solo quería que supieras que <span className="highlighter-pink font-semibold">estás en mi mente a cada segundo</span>. Pienso en cómo te ríes arrugando tu nariz, en cómo te duermes acurrucada, en cómo me miras.<br /><br />
            No necesitabas ninguna excusa para abrir esta cartita. Solo hacían falta tus ganas de sentirme cerca. <span className="highlighter-yellow font-semibold">Porque yo siempre estoy</span>. No importa el huso horario ni la distancia. Te tengo clavada en el corazón. Siempre. ❤️
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen notebook-bg py-4 px-2 sm:py-8 sm:px-6 flex flex-col items-center justify-between relative overflow-x-hidden font-sans" id="applet-viewport">
      
      {/* REALISTIC HANGING SPRING CLIPIES */}
      <div className="w-full max-w-3xl flex justify-between px-10 -mb-4 z-10 pointer-events-none select-none" id="notebook-clips-top">
        <div className="flex gap-16 sm:gap-24 mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Silver & Wooden binding clip */}
              <div className="w-6 h-12 bg-linear-to-b from-amber-200 via-yellow-100 to-amber-300 rounded-lg shadow-lg border-2 border-amber-400 flex flex-col items-center justify-between p-1">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400/80 border border-slate-600 shadow-inner" />
                <div className="w-3 h-1 bg-rose-400/90 rounded-full" />
              </div>
              <div className="w-1.5 h-4 bg-amber-800/10 -mt-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-3xl relative p-1 mt-2" id="paper-notebook-body-scaffold">
        
        {/* REAL BEAUTIFUL SCRAPBOOK DECORATIONS (Washi Tapes scattered on edges of the desk) */}
        <div className="washi-tape bg-rose-200/90 text-rose-800 -top-2 -left-3 rotate-4 border border-rose-300 z-30">
          💌 Con mucho amor
        </div>
        <div className="washi-tape bg-amber-200/95 text-amber-800 top-4 -right-2 rotate-6 border border-amber-300 z-30 font-cursive">
          ✨ Para mi novia hermosa
        </div>
        <div className="washi-tape bg-cyan-200/90 text-cyan-800 -bottom-3 -right-3 -rotate-3 border border-cyan-300 z-30 font-cursive">
          🧸 Eres mi mundo
        </div>

        {/* PHYSICAL NOTEBOOK SHEET CANVAS */}
        <div className="notebook-sheet w-full rounded-3xl border-3 border-[#c4b397] shadow-[12px_12px_0px_rgba(72,60,45,0.18)] p-3 sm:p-8 md:p-11 relative overflow-hidden flex flex-col min-h-[620px] z-10">
          
          {/* Notebook binder rings on the inside */}
          <div className="absolute left-[33px] sm:left-[50px] top-0 bottom-0 w-0.5 bg-red-400/40 pointer-events-none" />
          
          {/* Binder punched notebook sheets */}
          <div className="absolute left-3.5 sm:left-5 top-5 bottom-5 flex flex-col justify-between items-center pointer-events-none" id="binder-sheet-punch">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-900/12 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)] border border-slate-900/5" />
            ))}
          </div>

          {/* PAGE CONTENT SEGMENT */}
          <div className="pl-7 sm:pl-11 relative z-10 flex-grow flex flex-col">
            
            <AnimatePresence mode="wait">
              {currentPage === 'home' ? (
                /* ENRICHED AND BEAUTIFUL HOME SCREEN */
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center flex-grow text-center"
                  id="home-view-container"
                >
                  {/* Hearts overlay design */}
                  <div className="flex gap-2.5 justify-center mb-1 select-none">
                    <span className="text-xl animate-bounce">🦄</span>
                    <span className="text-3xl animate-heart-beat text-rose-500 fill-rose-500 filter drop-shadow-xs">💖</span>
                    <span className="text-xl animate-bounce" style={{ animationDelay: '0.15s' }}>🍿</span>
                  </div>

                  <h1 className="font-cursive text-5.5xl sm:text-6.5xl text-rose-800 font-extrabold tracking-tight mb-2 filter drop-shadow-xs selection:bg-rose-100" id="title-deco">
                    Ábrelo cuando...
                  </h1>
                  
                  <h2 className="font-cursive text-2.5xl sm:text-3.2xl text-amber-700/90 mb-3" id="subtitle-deco">
                    Elige cómo te sientes hoy
                  </h2>
                  
                  <p className="text-slate-600 font-cursive text-lg sm:text-xl max-w-lg mx-auto mb-8 leading-relaxed italic" id="instruction-home">
                    "Solo abre la cartita que más coincida con lo que sientes en este instante. Siempre estoy aquí contigo de corazón."
                  </p>

                  {/* 8 GRID SECTIONS FOR LETTERS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-1" id="grid-deck">
                    {letterSections.map((sect) => (
                      <button
                        key={sect.id}
                        id={`open-card-${sect.id}`}
                        onClick={() => navigateTo(sect.id)}
                        className={`flex items-center gap-3 p-3.5 text-left rounded-2xl border-2 border-dashed bg-linear-to-b shadow-sm transition-all duration-300 font-cursive text-lg cursor-pointer ${sect.color}`}
                      >
                        {/* Cutie mini capybara preview circular bubble */}
                        <div className="w-12 h-12 shrink-0 bg-white/85 border border-pink-200 rounded-full flex items-center justify-center overflow-hidden shadow-2xs group-hover:rotate-12 transition-transform">
                          <CapibaraDoodle emotion={sect.id as any} className="w-11 h-11 scale-125" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-base sm:text-md leading-tight text-slate-800 balance-text">
                            {sect.title}
                          </p>
                          <span className="text-xs font-semibold text-rose-600/85 flex items-center gap-1 mt-0.5 animate-pulse">
                            Hacer clic para leer 💌 &rarr;
                          </span>
                        </div>
                        <span className="text-2xl filter drop-shadow-xs">{sect.emoji}</span>
                      </button>
                    ))}
                  </div>

                  {/* DAILY SECRET POST-IT STICKY NOTE (EXTREMELY COOL & INTERACTIVE) */}
                  <div className="mt-9 mb-5 w-full max-w-md relative" id="postit-box">
                    {/* Sticky yellow realistic drawing tape */}
                    <div className="absolute top-[-10px] left-1/3 w-28 h-6 bg-yellow-100/80 border-dashed border-x border-amber-300 shadow-3xs -rotate-2 z-20" />
                    
                    <motion.div 
                      key={dailyComplimentIndex}
                      animate={highlightNoteClicked ? { rotate: [1, -5, 1], scale: [1, 1.05, 1] } : {}}
                      className="bg-yellow-50 border-2 border-dashed border-amber-200/80 p-5 rounded-2xl shadow-md text-left relative transform rotate-1 transition-all"
                      id="daily-postcard-note"
                    >
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-amber-200/60">
                        <span className="font-cursive text-amber-800 font-bold text-lg flex items-center gap-1.5">
                          <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                          ¿La verdad del día de hoy? 😊
                        </span>
                        
                        {/* Refresh dice button */}
                        <button
                          onClick={getNewCompliment}
                          className="flex items-center gap-1 text-xs text-amber-700/90 font-cursive bg-amber-100 hover:bg-amber-200 active:scale-95 py-1 px-3 rounded-full border border-amber-200 transition-all cursor-pointer"
                          title="Hacer clic para ver otra de mis verdades para ti"
                          id="btn-reveal-compliment"
                        >
                          <Shuffle className="w-3.5 h-3.5" />
                          <span>Otro mensajito</span>
                        </button>
                      </div>

                      <p className="font-cursive text-md sm:text-lg text-slate-700 leading-relaxed text-center italic py-2">
                        "{romanticCompliments[dailyComplimentIndex]}"
                      </p>

                      <div className="text-right text-xxs font-cursive text-amber-700/60 mt-1">
                        • Hecho para iluminar tus ojitos • Toca el botón para más verdades
                      </div>
                    </motion.div>
                  </div>

                  {/* KISSIES COUNTER BADGE */}
                  <div className="flex items-center gap-2 mb-3 bg-rose-50/70 border border-rose-100 px-4 py-2 rounded-2xl shadow-2xs font-cursive" id="kisssies-badge">
                    <span className="text-xs text-slate-600">🍬 Tiernos cariños dados:</span>
                    <span className="font-bold text-rose-600 text-base flex items-center gap-1">
                      {kissCount}
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-ping" />
                    </span>
                  </div>

                </motion.div>
              ) : (
                /* DECORATED AND POLISHED LETTER INDIVIDUAL SCREEN */
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col flex-grow relative"
                  id="expanded-letter-view"
                >
                  {/* Floating heart bursts on click */}
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ y: p.y, x: p.x, opacity: 1, scale: 0.6 }}
                      animate={{ y: p.y - 140, x: p.x + (Math.random() - 0.5) * 160, opacity: 0, scale: 1.4 }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="absolute text-3xl pointer-events-none select-none z-50 filter drop-shadow-xs font-serif"
                    >
                      {p.emoji}
                    </motion.div>
                  ))}

                  {/* Navigation Back Button header bar */}
                  <div className="flex justify-between items-center mb-6 pt-1">
                    <button
                      onClick={() => navigateTo('home')}
                      className="flex items-center gap-1.5 bg-white hover:bg-rose-100 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-700 font-cursive rounded-full py-1.5 px-4 text-sm sm:text-base transition-all shadow-2xs cursor-pointer active:scale-95"
                      id="btn-back-header-internal"
                    >
                      <ChevronLeft className="w-5 h-5 text-rose-500" />
                      <span>Volver al cuaderno</span>
                    </button>
                    <span className="font-cursive text-sm sm:text-base text-slate-500 uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full border border-amber-200">
                      Cariño {(() => {
                        const idx = letterSections.findIndex(s => s.id === currentPage);
                        return idx === -1 ? 1 : idx + 1;
                      })()} de 8
                    </span>
                  </div>

                  {/* SHEET CONTENT AREA */}
                  <div className="flex flex-col items-center flex-grow text-center max-w-xl mx-auto" id="sheet-pulp">
                    
                    {/* Header Title with heart and stars */}
                    <div className="flex flex-col items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl animate-bounce filter drop-shadow-xs">
                          {currentSection?.emoji}
                        </span>
                        <h2 className="font-cursive text-3 text-3xl sm:text-4.5xl font-extrabold text-rose-800 leading-tight">
                          {currentSection?.title}
                        </h2>
                      </div>
                      <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent my-1 rounded-full" />
                    </div>

                    {/* Capibara Doodle Wrapper with floating instruction bubble */}
                    <div 
                      className="relative my-4 flex flex-col items-center justify-center p-3 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group"
                      onClick={handleCapybaraClick}
                      title="¡Hazme clic para enviarme besitos!"
                      id="capy-interactive-bubble-body"
                    >
                      {/* Reactive tap speech prompt */}
                      <span className="absolute -top-4 font-cursive text-xs text-rose-700 bg-rose-50 border border-rose-200 py-1 px-2.5 rounded-full shadow-2xs rotate-2 opacity-90 group-hover:animate-pulse">
                        ¡Hazme clic! 🐹👇
                      </span>
                      
                      {currentSection && (
                        <div className="relative border-2 border-dashed border-amber-200 bg-white/30 rounded-3xl p-2 shadow-sm">
                          <CapibaraDoodle emotion={currentSection.id as any} className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md" />
                        </div>
                      )}
                      
                      {/* Romantic water ripple floating hearts indicators */}
                      <span className="absolute -top-4 left-3 text-lg select-none pointer-events-none opacity-40 animate-bounce">💖</span>
                      <span className="absolute -bottom-1 right-2 text-lg select-none pointer-events-none opacity-40">✨</span>
                    </div>

                    {/* Letter details */}
                    <div className="flex gap-2 justify-center text-rose-500/60 text-xs sm:text-sm italic mb-4 font-cursive select-none">
                      <span className="animate-pulse">❤️ Toca para besitos</span>
                      <span>•</span>
                      <span>{kissCount} besitos registrados • 💕</span>
                    </div>

                    {/* Letter Paragraph Container (Felt paper card look) */}
                    <div 
                      className="bg-white/85 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-rose-100/90 shadow-[4px_4px_0px_rgba(255,182,193,0.3)] text-left relative my-2 overflow-hidden transition-all hover:shadow-[6px_6px_0px_rgba(255,182,193,0.35)]" 
                      id="letter-body-pape"
                    >
                      {/* Cute physical scrapbook details on sheet */}
                      <div className="absolute right-4 bottom-3 text-rose-300 opacity-25 pointer-events-none select-none">
                        <Heart className="w-16 h-16 fill-rose-300" />
                      </div>

                      {/* Small push pin sketch */}
                      <div className="absolute top-2 left-1/2 -ml-1 w-2.5 h-2.5 rounded-full bg-red-400 border border-red-600 shadow-sm pointer-events-none" />

                      <p className="font-cursive text-xl sm:text-2xl text-slate-800 leading-relaxed balance-text text-justify selection:bg-rose-100 whitespace-pre-line relative z-10">
                        {renderHighlightedText(currentPage)}
                      </p>
                      
                      <div className="mt-5 flex justify-between items-center text-xs text-rose-700/80 font-cursive border-t border-rose-100/50 pt-4">
                        <span>Para: Mi personita amada 🌻</span>
                        <span>De: Tu novio enamorado ❤️</span>
                      </div>
                    </div>

                    {/* INTERACTIVE EXTRA: Sopa de letras only inside 'aburrida' page */}
                    {currentPage === 'aburrida' && (
                      <div className="mt-8 w-full border-t border-slate-200/50 pt-8" id="sopa-special-frame">
                        <h3 className="font-cursive text-2.5xl text-amber-800 font-bold mb-3 flex items-center justify-center gap-1.5">
                          🧩 Tu sorpresa anti-aburrimiento:
                        </h3>
                        <SopaDeLetras />
                      </div>
                    )}

                    {/* BOTTOM ACTIONS BAR FOR CARDS */}
                    <div className="mt-10 mb-4 w-full flex flex-col sm:flex-row gap-3.5 justify-center items-center" id="letter-decis">
                      <button
                        onClick={() => navigateTo('home')}
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 active:scale-97 text-white font-cursive text-lg py-2.5 px-7 rounded-full shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                        id="btn-action-back-to"
                      >
                        Con esto me siento mejor 🌻
                      </button>

                      {/* Go to next logical letter */}
                      {(() => {
                        const nextIdx = (letterSections.findIndex(s => s.id === currentPage) + 1) % letterSections.length;
                        const nextSec = letterSections[nextIdx];
                        return (
                          <button
                            onClick={() => navigateTo(nextSec.id)}
                            className="w-full sm:w-auto bg-rose-50 bg-linear-to-b from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border-2 border-rose-200 active:scale-97 text-rose-700 font-cursive text-base py-2.5 px-6 rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                            id="btn-action-explore-next"
                          >
                            <span>Escribir otra de mis emociones</span>
                            <ArrowRight className="w-4 h-4 text-rose-500 animate-pulse" />
                          </button>
                        );
                      })()}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Sparkles background layer with absolute positioning */}
          {renderBackgroundDoodles()}
        </div>

      </div>

      {/* FOOTER: WITH HEART BEAT AND HELPFUL CUTE PROMPTS */}
      <footer className="mt-10 text-center select-none font-cursive text-slate-700/85 z-10 flex flex-col items-center gap-1" id="footer-decors">
        <div className="flex items-center gap-2 justify-center bg-white/50 backdrop-blur-3xs px-4 py-1.5 rounded-full border border-amber-100/70 shadow-2xs">
          <span>Hecho con todo mi amor eterno</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heart-beat pointer-events-none filter drop-shadow-xs" />
          <span>solo y siempre para ti</span>
        </div>
        <p className="text-xxs text-amber-900/50 mt-1 select-none">
          Presiona cualquier capibara para enviarme besitos virtuales 🌸 Eres mi universo.
        </p>
      </footer>

    </div>
  );
}
