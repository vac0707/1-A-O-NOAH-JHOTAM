/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Music, 
  Music2, 
  MessageCircle, 
  Clock, 
  Heart, 
  ArrowRight,
  Gift,
  Star
} from 'lucide-react';

// --- Types ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Decorative Assets ---
const ASSETS = {
  CROWN: "https://res.cloudinary.com/dcnynnstm/image/upload/v1777910366/pngwing.com_wavv7x.png",
  TRUMPET: "https://res.cloudinary.com/dcnynnstm/image/upload/v1777910878/CORNETAS_ibodg4.png",
  CASTLE: "https://res.cloudinary.com/dcnynnstm/image/upload/v1777911050/CASTILLO_1_smuccc.png"
};

const RoyalOrnament = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 40" className={className} fill="currentColor">
    <path d="M100 20c-20 0-30-15-50-15s-40 15-40 15 10 15 40 15 30-15 50-15 20 15 50 15 40-15 40-15-10-15-40-15-30 15-50 15z" opacity="0.5"/>
    <circle cx="100" cy="20" r="4" />
  </svg>
);

// --- Constants ---
const EVENT_DATE = new Date('2026-05-16T16:00:00');
const MUSIC_URL = "https://res.cloudinary.com/dcnynnstm/video/upload/v1777905358/Eres_T%C3%BA_el_Pr%C3%ADncipe_Azul_La_Bella_Durmiente_qtqtfs.mp3";
const WHATSAPP_NUMBERS = ["+51900999194", "+51941624495"];
const MAP_URL = "https://maps.app.goo.gl/4TEGL5MFgo4MEzJC7";

// --- Components ---

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-flex", whiteSpace: "nowrap", marginRight: "0.25em" }}>
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span variants={child} key={letterIndex}>
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const VisualCalendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  
  return (
    <div className="mt-12 p-6 gold-border rounded-xl bg-royal-blue/40 backdrop-blur-md max-w-xs mx-auto">
      <div className="text-royal-gold font-serif text-lg mb-4 border-b border-royal-gold/20 pb-2">
        MAYO 2026
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, index) => (
          <div key={`${day}-${index}`} className="text-[10px] text-royal-gold/50 font-bold py-1">{day}</div>
        ))}
        {/* Placeholder for empty days at start of May 2026 (starts on Friday) */}
        {[...Array(5)].map((_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}
        {days.map(day => (
          <div 
            key={day} 
            className={`
              relative p-2 text-sm font-serif rounded-lg transition-all
              ${day === 16 ? 'text-royal-blue font-bold z-10' : 'text-white/60'}
            `}
          >
            {day === 16 && (
              <motion.div 
                layoutId="calendar-mark"
                className="absolute inset-0 bg-royal-gold rounded-full -z-10 shadow-lg shadow-royal-gold/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            )}
            {day === 16 && (
              <img src={ASSETS.CROWN} className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 z-20 drop-shadow-sm" alt="Event Mark" />
            )}
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const FloatingStars = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-royal-gold/15"
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.2
          }}
          animate={{ 
            opacity: [0.05, 0.3, 0.05],
            scale: [0.2, 0.4, 0.2],
            y: [0, -60, 0],
            x: [0, Math.random() * 20 - 10, 0]
          }}
          transition={{ 
            duration: Math.random() * 6 + 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star size={Math.random() * 6 + 2} fill="currentColor" />
        </motion.div>
      ))}
      {/* Magical Sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-white/40"
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full blur-[1px]" />
        </motion.div>
      ))}
    </div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.5 }}
    className={`py-12 px-6 flex flex-col items-center text-center ${className}`}
  >
    {children}
  </motion.section>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = EVENT_DATE.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const labels: { [key: string]: string } = {
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos"
  };

  return (
    <div className="flex gap-4 md:gap-8 mt-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-royal-gold/30 rounded-lg bg-royal-blue/50 backdrop-blur-sm shadow-lg shadow-black/20">
            <span className="text-2xl md:text-3xl font-serif text-royal-gold font-bold">{value}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-2 text-royal-gold/60">{labels[label]}</span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio error", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio error", e));
      }
    }, 500);
  };

  const addToGoogleCalendar = () => {
    const start = "20260516T160000";
    const end = "20260516T200000";
    const title = "Primer Añito de Noah Jhotam";
    const details = "¡Te esperamos para celebrar el primer añito de nuestro príncipe!";
    const location = "Pollería Pico Dorado – Tercer Piso";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  const whatsappConfirm = (number: string) => {
    const text = encodeURIComponent("¡Hola! Confirmo mi asistencia al primer añito de Noah Jhotam. ✨👑");
    window.open(`https://wa.me/${number.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-royal-gold selection:text-royal-blue overflow-x-hidden relative">
      {/* Background Video Layer */}
      <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
          onCanPlay={(e) => e.currentTarget.play()}
        >
          <source src="https://res.cloudinary.com/dcnynnstm/video/upload/v1777914146/fondo_disyney_g8pzuh.mp4" type="video/mp4" />
        </video>
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000d26]/60 via-transparent to-[#000d26]/80" />
      </div>
      
      <audio ref={audioRef} src={MUSIC_URL} loop />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            <FloatingStars />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="z-10 text-center px-6"
            >
              <motion.img 
                src={ASSETS.CROWN} 
                alt="Corona" 
                className="mx-auto mb-8 w-32 h-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-royal-gold/80 tracking-[0.4em] uppercase text-xs mb-4 font-serif">
                Estás cordialmente invitado
              </p>
              <h2 className="text-white/90 text-lg mb-2 font-serif tracking-widest italic">
                Al primer añito de
              </h2>
              <h1 className="text-5xl md:text-7xl font-serif gold-gradient-text font-bold mb-12 tracking-tight drop-shadow-lg">
                NOAH JHOTAM
              </h1>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenInvitation}
                className="group relative px-10 py-4 overflow-hidden rounded-full border-2 border-royal-gold bg-transparent"
              >
                <div className="absolute inset-0 bg-royal-gold opacity-10 group-hover:opacity-20 transition-opacity" />
                <span className="relative text-royal-gold font-serif tracking-[0.3em] uppercase text-sm flex items-center gap-2 font-bold">
                  Abrir Invitación 👑
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <FloatingStars />
            
            {/* Music Control */}
            <div className="fixed top-4 right-4 z-40">
              <button 
                onClick={toggleMusic}
                className="w-12 h-12 rounded-full border-2 border-royal-gold bg-royal-blue/60 backdrop-blur-md flex items-center justify-center text-royal-gold shadow-lg shadow-black/40"
              >
                {isPlaying ? <Music2 className="animate-pulse" /> : <Music />}
              </button>
            </div>

            {/* Header / Portada */}
            <Section className="min-h-screen pt-24 pb-12 relative overflow-hidden flex flex-col justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative mb-12"
              >
                <div className="w-68 h-68 md:w-80 md:h-80 mx-auto rounded-full p-2 border-4 border-royal-gold overflow-hidden relative group shadow-[0_0_30px_rgba(255,215,0,0.3)] animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800" 
                    alt="Noah Jhotam" 
                    className="w-full h-full object-cover rounded-full transition-all duration-700"
                  />
                  <div className="absolute inset-0 border-[8px] border-royal-blue/30 rounded-full" />
                </div>
                <motion.img
                  src={ASSETS.CROWN}
                  alt="Corona Portada"
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 z-20 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                />
              </motion.div>

              <div className="max-w-2xl mx-auto z-10">
                <h2 className="text-royal-gold font-script text-5xl md:text-6xl mb-4 drop-shadow-md">
                  ¡Mi Primer Añito!
                </h2>
                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-6 text-white drop-shadow-lg">
                  NOAH JHOTAM <br/>
                  <span className="text-royal-gold block mt-2 text-2xl tracking-[0.4em] font-light uppercase">ÁLVAREZ HUILLCA</span>
                </h1>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mb-8" />
                
                {/* Frase Emotiva en Pergamino */}
                <div className="parchment p-8 rounded-lg max-w-md mx-auto transform -rotate-1 shadow-2xl relative">
                   <AnimatedText 
                    text='"Un regalo del cielo, una bendición en nuestra vida. Hoy celebramos el primer año de amor puro y sonrisas infinitas."'
                    className="text-[#2c1e0f] italic text-lg leading-relaxed font-serif"
                   />
                  <div className="absolute -bottom-3 -right-3 text-royal-gold-dark/40"><img src={ASSETS.CROWN} className="w-10" alt="Crown Icon" /></div>
                </div>
              </div>
            </Section>

            {/* Castillo Section (NUEVO) */}
            <Section className="relative py-20 px-4 overflow-hidden">
               <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                className="relative z-10 max-w-lg mx-auto"
               >
                 <img src={ASSETS.CASTLE} alt="Castillo Real" className="w-full h-auto drop-shadow-2xl" />
                 <div className="absolute inset-0 bg-transparent" />
               </motion.div>
            </Section>

            {/* Proclamation Section (NUEVO ESTILO CON TROMPETAS) */}
            <Section className="relative z-10 px-4">
              <div className="absolute top-0 left-0 w-full flex justify-between px-10 opacity-60">
                <motion.img 
                  src={ASSETS.TRUMPET} 
                  alt="Trompeta Izquierda" 
                  className="w-32 h-auto"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.img 
                  src={ASSETS.TRUMPET} 
                  alt="Trompeta Derecha" 
                  className="w-32 h-auto -scale-x-100"
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="max-w-xl mx-auto parchment p-10 rounded-sm shadow-2xl border-l-[15px] border-[#d4c19c] relative mt-16">
                <div className="absolute top-0 right-0 p-4 opacity-5"><img src={ASSETS.CASTLE} className="w-40" alt="Castillo Marca de Agua" /></div>
                <img src={ASSETS.CROWN} className="mx-auto mb-6 w-16" alt="Corona Pequeña" />
                <h3 className="font-serif text-[#2c1e0f] tracking-[0.3em] uppercase text-sm mb-6 border-b border-black/10 pb-4 font-bold text-center">
                  EL REINO ESTÁ DE FIESTA
                </h3>
                <AnimatedText 
                  text="“Sus majestades tienen el honor de invitarte a la celebración del primer cumpleaños del príncipe Noah Jhotam 👑”"
                  className="text-[#2c1e0f] text-xl md:text-2xl font-serif leading-relaxed italic mb-6 text-center font-bold"
                />
                <div className="w-12 h-1 bg-royal-gold-dark/30 mx-auto mb-6" />
                <AnimatedText 
                  text="Será un día lleno de magia, amor y alegría… contamos con tu honorable presencia."
                  className="text-[#2c1e0f]/80 text-lg font-light leading-relaxed text-center"
                />
              </div>
            </Section>

            {/* Countdown */}
            <Section className="relative z-10">
              <div className="bg-[#000d26]/80 backdrop-blur-xl border-y-2 border-royal-gold/30 w-full py-16 flex flex-col items-center">
                <Clock className="text-royal-gold mb-6" />
                <h3 className="font-serif tracking-[0.4em] uppercase text-xs text-royal-gold mb-6">El gran momento comienza en</h3>
                <Countdown />
                <VisualCalendar />
              </div>
            </Section>

            {/* Date and Location (Cards Realzadas) */}
            <Section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                {/* Cuándo / When */}
                <div className="flex flex-col items-center p-10 bg-[#001a4d]/40 rounded-3xl border border-royal-gold/20 backdrop-blur-sm shadow-2xl group hover:border-royal-gold/50 transition-all">
                  <div className="w-20 h-20 rounded-full bg-royal-gold/10 border-2 border-royal-gold/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                    <Calendar className="text-royal-gold" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-royal-gold mb-4 tracking-widest">CUÁNDO</h3>
                  <div className="space-y-1 text-xl">
                    <p className="font-bold text-white">Sábado 16 de Mayo</p>
                    <p className="text-royal-gold/80 italic">4:00 PM</p>
                  </div>
                  <button 
                    onClick={addToGoogleCalendar}
                    className="mt-8 text-royal-gold border-b-2 border-royal-gold/30 pb-1 text-xs tracking-widest uppercase hover:text-white hover:border-white transition-all font-bold"
                  >
                    Agregar al Calendario
                  </button>
                </div>

                {/* Donde / Where */}
                <div className="flex flex-col items-center text-center p-10 bg-[#001a4d]/40 rounded-3xl border border-royal-gold/20 backdrop-blur-sm shadow-2xl group hover:border-royal-gold/50 transition-all">
                  <div className="w-20 h-20 rounded-full bg-royal-gold/10 border-2 border-royal-gold/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                    <MapPin className="text-royal-gold" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-royal-gold mb-4 tracking-widest">DÓNDE</h3>
                  <div className="space-y-1 text-xl">
                    <p className="font-bold text-white">Pollería Pico Dorado</p>
                    <p className="text-royal-gold/80 italic">Tercer Piso</p>
                  </div>
                  <a 
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-royal-gold-dark to-royal-gold rounded-full hover:brightness-110 transition-all text-sm tracking-widest uppercase text-royal-blue font-bold shadow-lg shadow-royal-gold/20"
                  >
                    Ver Ubicación
                  </a>
                </div>
              </div>
            </Section>

            {/* Padres (ESTILO MEJORADO) */}
            <Section className="relative overflow-hidden bg-capitone py-24 px-8 rounded-[40px] mx-4 mb-20 border-2 border-royal-gold/30">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 w-full max-w-3xl">
                <motion.img 
                  src={ASSETS.CROWN} 
                  className="mx-auto mb-6 w-20 drop-shadow-glow" 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  alt="Corona Padres"
                />
                <h3 className="font-serif text-4xl mb-12 gold-gradient-text tracking-tighter text-center">Padres</h3>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
                  {/* Papá */}
                  <div className="space-y-4 group">
                    <p className="text-royal-gold/60 text-[10px] uppercase tracking-[0.5em] mb-2 font-serif text-center">— ✨ —</p>
                    <div className="relative inline-block px-10">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="text-2xl font-serif text-white tracking-wide border-y border-royal-gold/20 py-4 px-6 relative text-center"
                      >
                        <img src={ASSETS.CROWN} className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 opacity-40" alt="Detail" />
                        JOTAM ÁLVAREZ TORRES
                      </motion.div>
                    </div>
                    <div className="ornament-line" />
                  </div>

                  <div className="w-12 h-[1px] bg-royal-gold/30 md:w-[1px] md:h-24" />

                  {/* Mamá */}
                  <div className="space-y-4 group">
                    <p className="text-royal-gold/60 text-[10px] uppercase tracking-[0.5em] mb-2 font-serif text-center">— ✨ —</p>
                    <div className="relative inline-block px-10">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="text-2xl font-serif text-white tracking-wide border-y border-royal-gold/20 py-4 px-6 relative text-center"
                      >
                        <img src={ASSETS.CROWN} className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 opacity-40" alt="Detail" />
                        DIANA HUILLCA SIME
                      </motion.div>
                    </div>
                    <div className="ornament-line" />
                  </div>
                </div>
                
                <RoyalOrnament className="w-48 h-12 text-royal-gold/30 mx-auto mt-12" />
              </div>
            </Section>

            {/* Confirmation */}
            <Section className="mb-20">
              <div className="parchment p-10 rounded-2xl max-w-lg mx-auto shadow-2xl relative">
                <img src={ASSETS.CROWN} alt="Reward" className="mx-auto mb-6 w-12" />
                <h3 className="font-serif text-3xl mb-6 text-[#2c1e0f]">Confirmación Real</h3>
                <p className="text-[#2c1e0f]/80 mb-10 text-lg leading-relaxed italic">
                  "Tu presencia hará que este día sea inolvidable. Por favor, confirma tu asistencia para preparar el banquete real."
                </p>
                
                <div className="flex flex-col gap-4">
                  {WHATSAPP_NUMBERS.map((num, i) => (
                    <button
                      key={i}
                      onClick={() => whatsappConfirm(num)}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-full transition-all font-bold shadow-xl"
                    >
                      <MessageCircle fill="white" size={20} />
                      Confirmar con {i === 0 ? "Papá" : "Mamá"}: {num}
                    </button>
                  ))}
                </div>
              </div>
            </Section>

            {/* Footer */}
            <footer className="py-24 border-t border-royal-gold/10 text-center px-6 bg-black/60 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent" />
              <img src={ASSETS.CROWN} className="mx-auto mb-8 w-16 drop-shadow-glow" alt="Final Crown" />
              <p className="font-serif text-3xl gold-gradient-text mb-4 tracking-widest font-bold">Noah Jhotam</p>
              <p className="text-royal-gold/50 text-sm tracking-[0.6em] uppercase">16 • 05 • 2026</p>
              <div className="mt-20 text-[10px] text-white/30 tracking-[0.3em] uppercase max-w-xs mx-auto leading-loose">
                Invitación Real de Primer Añito<br/>
                © {new Date().getFullYear()} • Edición Premium
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
