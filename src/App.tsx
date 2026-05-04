/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, 
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

// --- Constants ---
const EVENT_DATE = new Date('2026-05-16T16:00:00');
const MUSIC_URL = "https://res.cloudinary.com/dcnynnstm/video/upload/v1777905358/Eres_T%C3%BA_el_Pr%C3%ADncipe_Azul_La_Bella_Durmiente_qtqtfs.mp3";
const WHATSAPP_NUMBERS = ["+51900999194", "+51941624495"];
const MAP_URL = "https://maps.app.goo.gl/4TEGL5MFgo4MEzJC7";

// --- Components ---

const VisualCalendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  
  return (
    <div className="mt-12 p-6 gold-border rounded-xl bg-royal-blue/40 backdrop-blur-md max-w-xs mx-auto">
      <div className="text-royal-gold font-serif text-lg mb-4 border-b border-royal-gold/20 pb-2">
        MAYO 2026
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-[10px] text-royal-gold/50 font-bold py-1">{day}</div>
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
              <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 text-royal-gold w-3 h-3" />
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
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-royal-gold/20"
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.4 + 0.1,
            opacity: Math.random() * 0.3
          }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            scale: [0.1, 0.5, 0.1],
            y: [0, -40, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star size={Math.random() * 8 + 4} fill="currentColor" />
        </motion.div>
      ))}
      {/* Decorative Overlays */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`overlay-${i}`}
          className="absolute text-royal-gold/40"
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.8 + 0.5,
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            rotate: [0, 90, 180],
          }}
          transition={{ 
            duration: Math.random() * 4 + 4, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Star size={Math.random() * 12 + 8} className="blur-[1px]" />
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
    transition={{ duration: 0.8 }}
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
    <div className="min-h-screen font-sans selection:bg-royal-gold selection:text-royal-blue">
      <audio ref={audioRef} src={MUSIC_URL} loop />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-royal-blue overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
            <FloatingStars />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="z-10 text-center px-6"
            >
              <Crown className="text-royal-gold mx-auto mb-8 w-16 h-16" />
              <p className="text-royal-gold/80 tracking-[0.3em] uppercase text-xs mb-4 font-serif">
                Estás cordialmente invitado
              </p>
              <h2 className="text-white/90 text-lg mb-2 font-serif tracking-widest italic">
                Al primer añito de
              </h2>
              <h1 className="text-5xl md:text-7xl font-serif gold-gradient-text font-bold mb-12 tracking-tight">
                NOAH JHOTAM
              </h1>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenInvitation}
                className="group relative px-8 py-3 overflow-hidden rounded-full gold-border"
              >
                <div className="absolute inset-0 bg-royal-gold opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative text-royal-gold font-serif tracking-[0.2em] uppercase text-sm flex items-center gap-2">
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
                className="w-12 h-12 rounded-full border border-royal-gold/30 bg-royal-blue/30 backdrop-blur-md flex items-center justify-center text-royal-gold"
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
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full p-2 gold-border overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800" 
                    alt="Noah Jhotam" 
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border-[10px] border-royal-blue/20 rounded-full" />
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-2 text-royal-gold"
                >
                  <Crown size={48} fill="currentColor" />
                </motion.div>
              </motion.div>

              <div className="max-w-2xl mx-auto">
                <h2 className="text-royal-gold font-script text-4xl md:text-5xl mb-4">
                  ¡Mi Primer Añito!
                </h2>
                <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter mb-6 text-white">
                  NOAH JHOTAM <br/>
                  <span className="text-royal-gold/80 block mt-2 text-2xl tracking-[0.5em] font-light">ÁLVAREZ HUILLCA</span>
                </h1>
                <div className="w-16 h-[1px] bg-royal-gold/50 mx-auto mb-8" />
                <p className="text-white/70 italic text-lg leading-relaxed max-w-md mx-auto">
                  "Un regalo del cielo, una bendición en nuestra vida. Hoy celebramos el primer año de amor puro y sonrisas infinitas."
                </p>
              </div>
            </Section>

            {/* Proclamation Section */}
            <Section className="relative">
              <div className="max-w-xl mx-auto px-6 py-10 gold-border rounded-2xl bg-royal-blue/40 backdrop-blur-md">
                <Crown className="text-royal-gold mx-auto mb-6" size={32} />
                <h3 className="font-serif text-royal-gold tracking-[0.2em] uppercase text-sm mb-6 border-b border-royal-gold/20 pb-4">
                  EL REINO ESTÁ DE FIESTA
                </h3>
                <p className="text-white text-xl md:text-2xl font-serif leading-relaxed italic mb-4">
                  “Sus majestades tienen el honor de invitarte a la celebración del primer cumpleaños del príncipe <span className="gold-gradient-text font-bold">Noah Jhotam 👑</span>”
                </p>
                <p className="text-white/80 text-lg font-light leading-relaxed">
                  Será un día lleno de magia, amor y alegría… contamos con tu honorable presencia.
                </p>
              </div>
            </Section>

            {/* Countdown */}
            <Section className="bg-royal-blue/30 backdrop-blur-sm border-y border-white/5">
              <Clock className="text-royal-gold mb-6" />
              <h3 className="font-serif tracking-[0.3em] uppercase text-xs text-royal-gold mb-2">Faltan</h3>
              <Countdown />
              <VisualCalendar />
            </Section>

            {/* Date and Location */}
            <Section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                {/* Cuándo / When */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-royal-gold/10 border border-royal-gold/30 flex items-center justify-center mb-6">
                    <Calendar className="text-royal-gold" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-royal-gold mb-3">CUÁNDO</h3>
                  <div className="space-y-1 text-lg">
                    <p className="font-bold">Sábado 16 de Mayo</p>
                    <p className="text-white/60">4:00 PM</p>
                  </div>
                  <button 
                    onClick={addToGoogleCalendar}
                    className="mt-6 text-royal-gold border-b border-royal-gold/30 pb-1 text-sm tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Agregar al Calendario
                  </button>
                </div>

                {/* Donde / Where */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-royal-gold/10 border border-royal-gold/30 flex items-center justify-center mb-6">
                    <MapPin className="text-royal-gold" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-royal-gold mb-3">DÓNDE</h3>
                  <div className="space-y-1 text-lg">
                    <p className="font-bold">Pollería Pico Dorado</p>
                    <p className="text-white/60">Tercer Piso</p>
                  </div>
                  <a 
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-royal-gold/10 border border-royal-gold/50 rounded-full hover:bg-royal-gold/20 transition-all text-sm tracking-widest uppercase text-royal-gold"
                  >
                    Ver Ubicación
                  </a>
                </div>
              </div>
            </Section>

            {/* Padres */}
            <Section className="relative overflow-hidden bg-white/5 py-20 px-8 rounded-[40px] mx-4 mb-20 border border-white/10">
              <Heart className="absolute top-10 right-10 text-royal-gold/10" size={120} />
              <div className="relative z-10">
                <Heart className="text-royal-gold mx-auto mb-6" size={24} />
                <h3 className="font-serif text-3xl mb-10">Padres</h3>
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
                  <div className="space-y-2">
                    <p className="text-royal-gold/60 text-xs uppercase tracking-[0.3em]">Papá</p>
                    <p className="text-xl font-serif">Jotam Álvarez Torres</p>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
                  <div className="space-y-2">
                    <p className="text-royal-gold/60 text-xs uppercase tracking-[0.3em]">Mamá</p>
                    <p className="text-xl font-serif">Diana Huillca Sime</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Confirmation */}
            <Section className="mb-20">
              <Gift className="text-royal-gold mb-6" />
              <h3 className="font-serif text-3xl mb-4">Confirmación</h3>
              <p className="text-white/60 mb-10 max-w-md mx-auto">
                Tu presencia hará que este día sea inolvidable. Por favor, confirma tu asistencia vía WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {WHATSAPP_NUMBERS.map((num, i) => (
                  <button
                    key={i}
                    onClick={() => whatsappConfirm(num)}
                    className="flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl transition-all font-bold shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle fill="white" size={20} />
                    Confirmar: {num}
                  </button>
                ))}
              </div>
            </Section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-center px-6">
              <Crown className="text-royal-gold/20 mx-auto mb-6" size={40} />
              <p className="font-serif text-2xl gold-gradient-text mb-4">Noah Jhotam</p>
              <p className="text-white/40 text-xs tracking-[0.5em] uppercase">16.05.2026</p>
              <div className="mt-16 text-[10px] text-white/20 tracking-widest uppercase">
                Invitación Real • Hecha con Amor
              </div>
            </footer>

            {/* Floating button for scroll top or something? Or maybe just keep it clean */}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
