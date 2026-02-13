
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Moon, Search, MapPin, ShieldCheck, Users, 
  Heart, Coffee, Bus, BookOpen, Clock, 
  ArrowRight, Menu, X, Mail, AlertCircle
} from 'lucide-react';
import { IslamicPattern } from './Pattern';

interface LandingPageProps {
  onEnterApp: () => void;
}

// Configuration for Lanterns to reduce code repetition
interface LanternConfig {
  id: string;
  positionClass: string;
  animationClass: string;
  lineHeight: string; // Tailwind class
  variant: 'royal' | 'geometric' | 'simple';
  sizeClass: string;
  glowColor: string;
  flickerIntensity?: 'normal' | 'high';
  parallaxSpeed: number;
  mobileHidden?: boolean;
  zIndex: number;
  gradient?: boolean;
}

const LANTERN_CONFIG: LanternConfig[] = [
  { id: 'far-left', positionClass: 'left-[5%] -top-10', animationClass: 'animate-[sway-slow_7s_infinite_ease-in-out]', lineHeight: 'h-40', variant: 'simple', sizeClass: 'w-16 text-gold-antique', glowColor: '#F4A460', parallaxSpeed: 0.15, mobileHidden: true, zIndex: 0 },
  { id: 'mid-left', positionClass: 'left-[12%] -top-10', animationClass: 'animate-[sway_6s_infinite_ease-in-out_1s]', lineHeight: 'h-64', variant: 'royal', sizeClass: 'w-24 text-gold-lantern', glowColor: '#FFD700', parallaxSpeed: 0.25, mobileHidden: true, zIndex: 10, gradient: true },
  { id: 'close-left', positionClass: 'left-4 md:left-[2%] -top-16 md:-top-20', animationClass: 'animate-[sway-fast_8s_infinite_ease-in-out_0.5s] group-hover:scale-105 transition-transform duration-700', lineHeight: 'h-48 md:h-96', variant: 'royal', sizeClass: 'w-28 md:w-40 text-gold-bright drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] opacity-[0.45]', glowColor: '#FFD700', flickerIntensity: 'high', parallaxSpeed: 0.4, mobileHidden: false, zIndex: 20, gradient: true },
  { id: 'close-right', positionClass: 'right-4 md:right-[5%] -top-12 md:-top-10', animationClass: 'animate-[sway_7s_infinite_ease-in-out_2s] group-hover:scale-105 transition-transform duration-700', lineHeight: 'h-40 md:h-80', variant: 'geometric', sizeClass: 'w-24 md:w-36 text-gold-bright drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] opacity-[0.4]', glowColor: '#F4A460', flickerIntensity: 'high', parallaxSpeed: 0.4, mobileHidden: false, zIndex: 20, gradient: true },
  { id: 'mid-right', positionClass: 'right-[15%] -top-10', animationClass: 'animate-[sway-slow_5s_infinite_ease-in-out_1.5s]', lineHeight: 'h-56', variant: 'royal', sizeClass: 'w-20 text-gold-antique', glowColor: '#FFD700', parallaxSpeed: 0.25, mobileHidden: true, zIndex: 10, gradient: true },
  { id: 'far-right', positionClass: 'right-[25%] -top-10', animationClass: 'animate-[sway_9s_infinite_ease-in-out_3s]', lineHeight: 'h-48', variant: 'simple', sizeClass: 'w-14 text-gold-antique', glowColor: '#F4A460', parallaxSpeed: 0.15, mobileHidden: true, zIndex: 0 },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Consolidated Refs for Parallax
  const heroBgRef = useRef<HTMLDivElement>(null);
  const bismillahRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const lanternRefs = useRef<(HTMLDivElement | null)[]>([]);

  // -- Scroll Reveal Observer --
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // -- Optimized Parallax Logic --
  useEffect(() => {
    let animationFrameId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(y > 50);

          if (y < 1200) { 
            if (heroBgRef.current) heroBgRef.current.style.transform = `translateY(${y * 0.15}px)`;
            if (bismillahRef.current) bismillahRef.current.style.transform = `translate3d(-50%, ${y * 0.2}px, 0)`;
            
            // Loop through lantern refs using the config speed
            lanternRefs.current.forEach((ref, index) => {
              if (ref && LANTERN_CONFIG[index]) {
                ref.style.transform = `translateY(${y * LANTERN_CONFIG[index].parallaxSpeed}px)`;
              }
            });

            if (heroContentRef.current) {
                 heroContentRef.current.style.transform = `translateY(${y * 0.25}px)`;
                 heroContentRef.current.style.opacity = `${Math.max(0, 1 - y / 500)}`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="font-landing-body text-neutral-800 overflow-x-hidden w-full bg-emerald-midnight">
      {/* GLOBAL STYLES */}
      <style>{`
        @keyframes sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes sway-slow { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes sway-fast { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
        @keyframes shadow-pulse { 0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.3); transform: scale(1); } 50% { box-shadow: 0 0 50px rgba(212,175,55,0.6); transform: scale(1.02); } }
        @keyframes flicker-candle { 0%, 100% { opacity: 0.8; transform: scale(1); filter: blur(4px); } 50% { opacity: 0.6; transform: scale(0.95); filter: blur(3px); } 25% { opacity: 0.9; transform: scale(1.05); filter: blur(5px); } 75% { opacity: 0.7; transform: scale(0.9); filter: blur(3.5px); } }
        .text-shadow-gold { text-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.2, 0.65, 0.3, 0.9); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .lantern-glow-core { mix-blend-mode: screen; }
      `}</style>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-emerald-midnight/95 backdrop-blur-md py-3 shadow-lg border-b border-gold-lantern/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-pearl">
            <Moon className="w-6 h-6 text-gold-lantern fill-current" />
            <span className="font-brand text-xl md:text-2xl font-bold tracking-wide">
              Sehri<span className="text-gold-lantern">Finder</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-landing-accent font-medium text-neutral-pearl/90">
            {['Story', 'Features', 'Cities', 'Trust'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="hover:text-gold-lantern transition-colors relative group"
              >
                {item === 'Story' ? 'Our Story' : item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-lantern transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={onEnterApp}
              className="bg-gold-lantern hover:bg-gold-highlight text-emerald-midnight px-6 py-2.5 rounded-full font-landing-accent font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-gold-highlight/50"
            >
              Find Sehri
            </button>
          </div>

          <button className="md:hidden text-neutral-pearl p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Backdrop & Content */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute top-full left-0 right-0 bg-emerald-midnight p-6 border-t border-white/10 flex flex-col gap-4 md:hidden shadow-xl animate-fade-in">
               {['Story', 'Features', 'Cities', 'Trust'].map((item) => (
                 <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left text-neutral-pearl py-2 border-b border-white/5">
                   {item === 'Story' ? 'Our Story' : item}
                 </button>
               ))}
               <button onClick={onEnterApp} className="bg-gold-lantern text-emerald-midnight w-full py-3 rounded-lg font-bold mt-2">Find Sehri</button>
            </div>
          </>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-emerald-midnight pt-20 px-4 overflow-hidden pb-32">
        <div ref={heroBgRef} className="absolute inset-0 opacity-10 will-change-transform pointer-events-none">
          <IslamicPattern variant="geometric" className="text-gold-lantern" />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-emerald-midnight pointer-events-none"></div>
        
        {/* BISMILLAH */}
        <div ref={bismillahRef} className="absolute top-32 left-1/2 -translate-x-1/2 text-gold-antique/80 font-arabic-calligraphy text-3xl md:text-5xl tracking-widest opacity-90 z-10 text-center w-full animate-fade-in drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] will-change-transform">
           بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* --- DYNAMIC LANTERNS (Mapped from Config) --- */}
        {LANTERN_CONFIG.map((lantern, index) => (
          <div 
            key={lantern.id}
            ref={(el) => { lanternRefs.current[index] = el; }}
            className={`absolute ${lantern.positionClass} ${lantern.mobileHidden ? 'hidden md:block' : 'block'} will-change-transform group`}
            style={{ zIndex: lantern.zIndex }}
            aria-hidden="true"
          >
             <div className={`opacity-100 origin-top ${lantern.animationClass}`}>
                <div className={`w-[1px] md:w-[1.5px] ${lantern.lineHeight} mx-auto ${lantern.gradient ? 'bg-gradient-to-b from-white/20 via-gold-lantern/50 to-gold-lantern shadow-[0_0_10px_rgba(255,215,0,0.2)]' : 'bg-white/20'}`}></div>
                <LanternSVG 
                  variant={lantern.variant} 
                  className={lantern.sizeClass} 
                  glowColor={lantern.glowColor} 
                  flickerIntensity={lantern.flickerIntensity} 
                />
             </div>
          </div>
        ))}

        <div ref={heroContentRef} className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-24 will-change-transform">
           <h1 className="font-landing-heading text-5xl md:text-7xl lg:text-8xl text-neutral-pearl leading-[1.1] text-shadow-gold">
             No One Should <br/>
             <span className="text-gold-lantern drop-shadow-md">Eat Sehri Alone</span>
           </h1>
           
           <p className="font-landing-body text-lg md:text-2xl text-neutral-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
             Find verified Sehri spots, free community meals, and Masjid distributions near you.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
             <button 
               onClick={onEnterApp}
               className="group flex items-center gap-3 bg-gold-lantern hover:bg-gold-highlight text-emerald-midnight px-8 py-4 rounded-full font-landing-accent font-bold text-lg transition-all animate-[shadow-pulse_3s_infinite] border border-gold-highlight"
             >
               <Search className="w-5 h-5" />
               Find Sehri Near You
             </button>
             
             <button 
               onClick={() => scrollToSection('story')}
               className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-neutral-pearl font-landing-accent font-medium hover:bg-white/5 transition-colors"
             >
               <MapPin className="w-5 h-5 text-gold-lantern" />
               Our Story
             </button>
           </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
           <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] drop-shadow-xl">
              <path d="M0 80V20C240 20 480 80 720 0C960 80 1200 20 1440 20V80H0Z" fill="#faf8f3" />
           </svg>
        </div>
      </section>

      {/* HADITH SECTION */}
      <section className="relative py-20 bg-cream border-b border-gold-lantern/10">
         <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 reveal">
            <div className="inline-block mb-8">
              <IslamicStar className="w-10 h-10 text-gold-lantern mx-auto animate-pulse-slow" />
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-16 h-px bg-gold-antique/30"></div>
              <div className="hidden md:block absolute top-1/2 right-0 w-16 h-px bg-gold-antique/30"></div>

              <blockquote className="font-landing-heading text-2xl md:text-4xl text-emerald-midnight leading-snug mb-6 italic px-4">
                "Whoever provides food for a fasting person to break his fast will have a reward like his, without decreasing the reward of the fasting person."
              </blockquote>
            </div>

            <cite className="block text-sm md:text-base text-emerald-sacred/70 font-landing-accent font-bold tracking-widest uppercase mt-4">
              — Jami’ at-Tirmidhi (Hasan Sahih)
            </cite>
         </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="py-24 bg-cream relative">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
           <IslamicPattern variant="hexagonal" className="text-emerald-midnight" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2 reveal">
                 <IslamicStar className="w-4 h-4 text-gold-antique" />
                 <span className="text-gold-antique text-sm font-bold uppercase tracking-widest">Why We Exist</span>
                 <IslamicStar className="w-4 h-4 text-gold-antique" />
              </div>
              
              <h2 className="reveal font-landing-heading text-4xl md:text-6xl text-emerald-midnight leading-tight" style={{ transitionDelay: '100ms' }}>
                Every Ramadan, thousands wake before dawn — <span className="text-gold-antique italic relative inline-block">
                  but too many wake alone.
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-gold-antique/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
              
              <div className="reveal font-landing-body text-lg text-emerald-midnight/70 space-y-6 leading-relaxed bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-200 shadow-sm relative" style={{ transitionDelay: '200ms' }}>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-antique rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-antique rounded-br-lg"></div>

                <p>
                  Some have families to share Sehri with. Others — students in hostels, workers in new cities, travelers far from home — eat alone. Or skip it entirely.
                </p>

                <div className="my-8 pl-6 border-l-4 border-gold-antique/60 py-2 bg-emerald-50/50 rounded-r-lg">
                   <p className="font-landing-heading italic text-xl text-emerald-sacred mb-2">
                     "He is not a believer whose stomach is filled while the neighbor to his side goes hungry."
                   </p>
                   <p className="text-xs font-bold uppercase tracking-wider text-gold-antique">— Prophet Muhammad (ﷺ)</p>
                </div>

                <p>
                  Across our cities, Masjids prepare communal meals. Trusts set up distribution points. Local restaurants keep their kitchens running through the night. 
                  But the information is scattered — buried in WhatsApp groups, word of mouth, and handwritten notices on walls.
                </p>
                <p className="font-medium text-emerald-midnight text-xl">
                  Sehri Finder connects you to them. One directory. Verified. Community-led.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-emerald-midnight relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-lantern to-transparent opacity-30"></div>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <IslamicPattern variant="arabesque" className="text-gold-lantern" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="text-gold-lantern text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-lantern/50"></span>
              What You Will Find
              <span className="h-px w-8 bg-gold-lantern/50"></span>
            </div>
            <h2 className="font-landing-heading text-4xl md:text-5xl text-neutral-pearl">
              More Than a Meal. <span className="text-gold-lantern italic">A Community.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              delay={0}
              icon={<Moon className="w-8 h-8" />}
              title="Masjid Sehri"
              tag="Community Driven"
              desc="Find Masjids offering communal Sehri meals with spiritual atmosphere, Tahajjud prayers, and community warmth."
            />
            <FeatureCard 
              delay={100}
              icon={<Coffee className="w-8 h-8" />}
              title="Free Sehri"
              tag="No Cost, No Conditions"
              desc="Discover free Sehri distribution points run by trusts, foundations, and generous individuals across the city."
            />
             <FeatureCard 
              delay={200}
              icon={<Heart className="w-8 h-8" />}
              title="Women-Friendly"
              tag="Safe & Welcoming"
              desc="Verified spots with separate arrangements, comfortable spaces, and respectful environments for women and families."
            />
            <FeatureCard 
              delay={300}
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Patient & Elderly"
              tag="With Compassion"
              desc="Locations offering special dietary options, comfortable seating, and accessible facilities for those who need extra care."
            />
            <FeatureCard 
              delay={400}
              icon={<BookOpen className="w-8 h-8" />}
              title="For Students"
              tag="Never Skip Sehri"
              desc="Hostelers, PG residents, and students living away from home — find Sehri within walking distance of your campus."
            />
            <FeatureCard 
              delay={500}
              icon={<Bus className="w-8 h-8" />}
              title="For Travelers"
              tag="Away But Not Alone"
              desc="New to the city or passing through? Find open Sehri spots near railway stations, bus stands, and transit hubs."
            />
          </div>
        </div>
      </section>

      {/* QURANIC VERSE SECTION */}
      <section className="py-20 bg-emerald-midnight relative border-t border-white/5 border-b border-white/5">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <IslamicPattern variant="hexagonal" className="text-gold-lantern" />
         </div>

         <div className="container mx-auto px-6 relative z-10 flex justify-center">
            <div className="reveal max-w-3xl w-full bg-white/[0.02] backdrop-blur-md border border-gold-lantern/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group hover:border-gold-lantern/30 transition-colors duration-500">
               <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-gold-lantern/20 rounded-tl-2xl opacity-60"></div>
               <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-gold-lantern/20 rounded-br-2xl opacity-60"></div>

               <div className="mb-8">
                  <span className="text-gold-antique text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 opacity-80">
                     <span className="w-1 h-1 rounded-full bg-gold-antique"></span>
                     The Divine Command
                     <span className="w-1 h-1 rounded-full bg-gold-antique"></span>
                  </span>
               </div>

               <p className="font-arabic-text text-2xl md:text-3xl lg:text-4xl text-neutral-pearl leading-[2] mb-6 drop-shadow-sm px-4" dir="rtl" lang="ar">
                  وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ ٱلْخَيْطُ ٱلْأَبْيَضُ مِنَ ٱلْخَيْطِ ٱلْأَسْوَدِ مِنَ ٱلْفَجْرِ ثُمَّ أَتِمُّوا ٱلصِّيَامَ إِلَى ٱلَّيْلِ
               </p>

               <p className="font-landing-body text-base md:text-lg text-neutral-ivory/70 leading-relaxed italic max-w-xl mx-auto mb-8">
                  “And eat and drink until the white thread of dawn becomes distinct from the black thread [of night]. Then complete the fast until sunset…”
               </p>

               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-antique/10 bg-gold-antique/5 text-gold-antique/70 text-[10px] font-landing-accent uppercase tracking-widest">
                  <span>Surah Al-Baqarah</span>
                  <span className="w-px h-3 bg-gold-antique/20"></span>
                  <span>2:187</span>
               </div>
            </div>
         </div>
      </section>

      {/* CITIES SECTION */}
      <section id="cities" className="py-24 bg-cream relative">
         <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <IslamicPattern variant="octagon-star-lattice" className="text-emerald-midnight" />
         </div>

         <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-16 reveal">
              <div className="text-gold-antique text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                 <IslamicStar className="w-3 h-3 text-gold-antique" />
                 Cities We Serve
                 <IslamicStar className="w-3 h-3 text-gold-antique" />
              </div>
              <h2 className="font-landing-heading text-4xl md:text-5xl text-emerald-midnight">
                From One City, <span className="text-gold-antique italic">Growing Together</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Chennai (Active) */}
             <div className="reveal bg-emerald-midnight rounded-xl p-8 text-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border border-gold-lantern/20 shadow-xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <IslamicPattern variant="geometric" className="text-gold-lantern" />
                </div>
                <div className="absolute top-0 right-0 p-32 bg-gold-lantern/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform blur-2xl"></div>
                
                <div className="relative z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/30 mb-6 backdrop-blur-sm">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                     Live Now
                   </div>
                   <h3 className="font-landing-heading text-4xl mb-2 text-white">Chennai</h3>
                   <p className="text-white/70 mb-8 text-sm font-landing-body">
                     50+ Verified Spots<br/> 
                     <span className="opacity-60">Triplicane, Royapettah, Mount Road, and more.</span>
                   </p>
                   
                   <button onClick={onEnterApp} className="flex items-center gap-2 text-emerald-midnight bg-gold-lantern px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-emerald-midnight transition-colors shadow-lg">
                     Explore Chennai <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
             </div>

             {/* Other Cities Grid */}
             <div className="grid grid-cols-1 gap-4">
                 <CityCard name="Bengaluru" status="Coming Soon" desc="Shivajinagar, Frazer Town" delay={100} />
                 <CityCard name="Hyderabad" status="Coming Soon" desc="Old City, Charminar, Tolichowki" delay={200} />
                 <CityCard name="Mumbai" status="Coming Soon" desc="Mohammed Ali Road, Bandra, Kurla" delay={300} />
             </div>
           </div>
         </div>
      </section>

      {/* TRUST SECTION */}
      <section id="trust" className="py-24 bg-emerald-midnight relative border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <IslamicPattern variant="hexagonal" className="text-neutral-pearl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
             <div className="w-full text-center">
                <div className="reveal text-gold-lantern text-sm font-bold uppercase tracking-widest mb-4">Trust & Verification</div>
                <h2 className="reveal text-neutral-pearl font-landing-heading text-4xl md:text-5xl mb-10" style={{ transitionDelay: '100ms' }}>
                  Built on Trust, <span className="italic text-gold-lantern">Not Algorithms</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
                  <TrustItem delay={200} title="Community Verified" desc="Every spot is reported and verified by local community members who personally visit and confirm details." />
                  <TrustItem delay={300} title="Updated for 2026" desc="Data is refreshed each Ramadan. Timings, availability, and contact details are re-verified annually." />
                  <TrustItem delay={400} title="Direct Contact" desc="Call or message the venue directly. We provide real phone numbers — no middlemen, no apps in between." />
                  <TrustItem delay={500} title="Report & Improve" desc="Found an issue? One tap to report via WhatsApp. We update listings in real time during Ramadan." />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-gradient-to-b from-emerald-midnight to-[#051a14] relative overflow-hidden">
         <div className="absolute top-0 left-0 right-0 flex justify-center -mt-3 text-gold-lantern/20">
            <IslamicStar className="w-6 h-6" />
         </div>
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-lantern/20 to-transparent"></div>
         
         <div className="absolute inset-0 opacity-20 pointer-events-none">
           <IslamicPattern variant="geometric" className="text-emerald-sacred" />
         </div>

         <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <div className="flex justify-center mb-6 text-gold-lantern/50 animate-pulse reveal">
               <Heart size={24} />
            </div>
            
            <h2 className="reveal font-landing-heading text-5xl md:text-6xl text-neutral-pearl mb-6" style={{ transitionDelay: '100ms' }}>
              This Ramadan, <br/>
              <span className="italic text-gold-lantern">Let No One Go Hungry</span>
            </h2>

            <p className="reveal text-xl text-neutral-ivory/60 mb-10 leading-relaxed font-light" style={{ transitionDelay: '200ms' }}>
              Whether you're looking for a place to eat, or you know a place others should find — Sehri Finder is for you. Join the movement.
            </p>

            <div className="reveal flex flex-col sm:flex-row justify-center gap-4 mb-16" style={{ transitionDelay: '300ms' }}>
               <button 
                onClick={onEnterApp}
                className="bg-gold-lantern hover:bg-gold-highlight text-emerald-midnight px-10 py-4 rounded-full font-landing-accent font-bold text-lg shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-transform hover:-translate-y-1 border-2 border-transparent hover:border-white/20"
               >
                 Open Sehri Finder
               </button>
               <button 
                 onClick={() => window.open('mailto:contribute@sehrifinder.com')}
                 className="bg-emerald-sacred/40 hover:bg-emerald-sacred/60 text-neutral-pearl px-10 py-4 rounded-full font-landing-accent font-bold text-lg border border-white/10 backdrop-blur-md transition-colors"
               >
                 Add a Sehri Spot
               </button>
            </div>

            <div className="reveal max-w-2xl mx-auto border-t border-white/5 pt-12" style={{ transitionDelay: '400ms' }}>
               <p className="font-arabic-text text-2xl mb-4 text-neutral-ivory/80 dir-rtl" lang="ar">
                  إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا
               </p>
               <p className="font-landing-heading italic text-lg text-neutral-ivory/50 mb-2">
                 "We feed you only for the countenance of Allah. We wish not from you reward or gratitude."
               </p>
               <p className="text-xs uppercase tracking-widest text-gold-antique/60">— Qur'an (76:9)</p>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#020a08] pt-20 pb-10 border-t border-white/5 relative overflow-hidden font-landing-body text-neutral-400">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <IslamicPattern variant="hexagonal" className="text-white" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* 1. HUGE PROMINENT 'BUILT FOR UMMAH' SECTION */}
          <div className="text-center mb-20 relative group">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-lantern/20 to-transparent -z-10 group-hover:via-gold-lantern/40 transition-colors"></div>
              <div className="inline-block bg-[#020a08] px-6">
                  <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-sacred/10 border border-gold-lantern/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-shadow">
                          <Heart className="w-8 h-8 text-red-500 fill-red-500/20" />
                      </div>
                      <h2 className="font-landing-heading text-4xl md:text-6xl lg:text-7xl text-neutral-pearl tracking-tight">
                        Built with Love for the <span className="text-gold-lantern italic font-serif">Ummah</span>
                      </h2>
                      <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-light">
                        A purely non-profit initiative connecting the community through the blessings of Sehri.
                      </p>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 border-b border-white/5 pb-16">
            {/* Column 1: Brand & Disclaimer (span 5) */}
            <div className="lg:col-span-5 space-y-8">
               <div className="flex items-center gap-2 text-neutral-pearl">
                  <Moon className="w-6 h-6 text-gold-lantern fill-current" />
                  <span className="font-brand text-2xl font-bold tracking-wide">
                    Sehri<span className="text-gold-lantern">Finder</span>
                  </span>
               </div>
               
               <div className="p-5 rounded-xl bg-emerald-sacred/5 border border-white/5 backdrop-blur-sm">
                 <div className="flex gap-3">
                   <AlertCircle className="w-5 h-5 text-gold-lantern/70 shrink-0 mt-0.5" />
                   <p className="text-xs text-neutral-400 leading-relaxed">
                     <strong>Disclaimer:</strong> Listings are community-sourced. Please verify details before visiting. Details may change during Ramadan.
                   </p>
                 </div>
               </div>
            </div>

            {/* Column 2: Links (span 2) */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-neutral-pearl font-bold uppercase tracking-widest text-xs">Explore</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => scrollToSection('story')} className="hover:text-gold-lantern transition-colors">Our Story</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-gold-lantern transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('cities')} className="hover:text-gold-lantern transition-colors">Cities</button></li>
              </ul>
            </div>

            {/* Column 3: Actions (span 2) */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-neutral-pearl font-bold uppercase tracking-widest text-xs">Contribute</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="mailto:contribute@sehrifinder.com" className="hover:text-gold-lantern transition-colors">Add a Spot</a></li>
                <li><a href="mailto:contribute@sehrifinder.com" className="hover:text-gold-lantern transition-colors">Report Issue</a></li>
                <li><a href="mailto:salam@sehrifinder.com" className="hover:text-gold-lantern transition-colors">Partner with us</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter (span 3) */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-neutral-pearl font-bold uppercase tracking-widest text-xs">Stay Connected</h4>
               <div className="flex flex-col gap-3">
                 <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="email" 
                      placeholder="salam@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-neutral-300 focus:outline-none focus:border-gold-lantern/50 transition-colors"
                    />
                 </div>
                 <button className="bg-gold-lantern hover:bg-gold-highlight text-emerald-midnight px-4 py-3 rounded-lg font-bold text-sm transition-colors w-full">
                    Subscribe for Updates
                 </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
             <div className="flex items-center gap-6">
               <span>&copy; 2026 Sehri Finder. All rights reserved.</span>
               <div className="hidden md:block w-1 h-1 rounded-full bg-white/10"></div>
               <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
             </div>
             
             <div className="flex gap-4">
                {/* Socials could go here */}
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

// --- SUB COMPONENTS (MEMOIZED FOR PERFORMANCE) ---

// High-Fidelity SVG Lantern
const LanternSVG = React.memo(({ 
  className, 
  variant = 'royal', 
  glowColor = "#FFD700",
  flickerIntensity = 'normal'
}: { 
  className?: string, 
  variant?: 'royal' | 'geometric' | 'simple', 
  glowColor?: string,
  flickerIntensity?: 'normal' | 'high'
}) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 160" className="w-full h-auto drop-shadow-2xl" style={{ overflow: 'visible' }}>
        <defs>
           <radialGradient id={`glow-${variant}`} cx="50%" cy="50%" r="50%">
             <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
             <stop offset="50%" stopColor={glowColor} stopOpacity="0.3" />
             <stop offset="100%" stopColor="transparent" stopOpacity="0" />
           </radialGradient>
        </defs>
        
        {/* Glow Effect (Behind) */}
        <circle 
          cx="50" 
          cy={variant === 'simple' ? 65 : 80} 
          r={flickerIntensity === 'high' ? 55 : 40} 
          fill={`url(#glow-${variant})`} 
          className="animate-[flicker-candle_4s_infinite_ease-in-out] lantern-glow-core" 
        />
        
        {/* === VARIANT 1: ROYAL (Foreground, Detailed) === */}
        {variant === 'royal' && (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            {/* Top Loop & Cap */}
            <circle cx="50" cy="15" r="5" strokeWidth="2" />
            <path d="M50 20 L30 40 L70 40 Z" fill="currentColor" fillOpacity="0.2" />
            
            {/* Main Hexagonal Body */}
            <path d="M30 40 L20 80 L30 120 L50 135 L70 120 L80 80 L70 40 Z" fill="currentColor" fillOpacity="0.1" />
            
            {/* Inner Decorative Lattice */}
            <path d="M30 40 L50 80 L70 40" strokeWidth="0.5" opacity="0.6" />
            <path d="M30 120 L50 80 L70 120" strokeWidth="0.5" opacity="0.6" />
            <line x1="20" y1="80" x2="80" y2="80" strokeWidth="0.5" opacity="0.6" />
            <line x1="50" y1="20" x2="50" y2="135" strokeWidth="1" />
            
            {/* Bottom Tassel */}
            <path d="M50 135 L50 150" strokeWidth="2" />
            <circle cx="50" cy="153" r="3" fill="currentColor" stroke="none" />
          </g>
        )}

        {/* === VARIANT 2: GEOMETRIC (Sharp, Angular) === */}
        {variant === 'geometric' && (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <rect x="48" y="10" width="4" height="10" fill="currentColor" />
            {/* Main Diamond Body */}
            <path d="M50 20 L80 50 L50 110 L20 50 Z" fill="currentColor" fillOpacity="0.15" />
            
            {/* Internal Star geometry */}
            <path d="M50 20 L50 110" strokeWidth="0.5" opacity="0.5" />
            <path d="M20 50 L80 50" strokeWidth="0.5" opacity="0.5" />
            <path d="M35 35 L65 35 L50 65 Z" strokeWidth="0.5" opacity="0.5" />
            
            {/* Bottom Finial */}
            <path d="M50 110 L50 140" strokeWidth="1.5" />
            <path d="M50 140 L40 150 L60 150 Z" fill="currentColor" fillOpacity="0.5" />
          </g>
        )}

        {/* === VARIANT 3: SIMPLE (Background, Softer) === */}
        {variant === 'simple' && (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
             <circle cx="50" cy="10" r="4" strokeWidth="2" />
             <path d="M50 14 L35 30 L65 30 Z" fill="currentColor" fillOpacity="0.3" />
             <rect x="35" y="30" width="30" height="70" rx="5" fill="currentColor" fillOpacity="0.1" />
             <path d="M35 30 L50 100 L65 30" strokeWidth="0.5" opacity="0.4" />
             <path d="M35 100 L50 30 L65 100" strokeWidth="0.5" opacity="0.4" />
             <path d="M35 100 L50 115 L65 100 Z" fill="currentColor" fillOpacity="0.3" />
          </g>
        )}
      </svg>
    </div>
  );
});

const FeatureCard = React.memo(({ icon, title, desc, tag, delay = 0 }: { icon: React.ReactNode, title: string, desc: string, tag: string, delay?: number }) => (
  <div 
    className="reveal p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm group hover:bg-white/10 hover:border-gold-lantern/30 transition-all duration-300 relative overflow-hidden"
    style={{ transitionDelay: `${delay}ms` }}
  >
     <div className="absolute top-0 right-0 w-16 h-16 bg-gold-lantern/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
     
     <div className="text-gold-antique mb-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 relative z-10">
       <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique"></div>
       {tag}
     </div>
     <div className="text-neutral-pearl mb-4 group-hover:text-gold-lantern transition-colors relative z-10">{icon}</div>
     <h3 className="font-landing-heading text-2xl text-neutral-pearl mb-3 relative z-10">{title}</h3>
     <p className="text-neutral-ivory/60 text-sm leading-relaxed relative z-10">{desc}</p>
  </div>
));

const TrustItem = React.memo(({ title, desc, delay = 0 }: { title: string, desc: string, delay?: number }) => (
  <div 
    className="reveal flex gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="shrink-0 mt-1">
      <div className="w-10 h-10 rounded-full bg-emerald-sacred/50 border border-gold-lantern/20 flex items-center justify-center text-gold-lantern">
        <ShieldCheck size={18} />
      </div>
    </div>
    <div>
      <h4 className="font-bold text-neutral-pearl mb-1 font-landing-heading text-lg">{title}</h4>
      <p className="text-sm text-neutral-ivory/60 leading-relaxed">{desc}</p>
    </div>
  </div>
));

const CityCard = React.memo(({ name, status, desc, delay = 0 }: { name: string, status: string, desc: string, delay?: number }) => (
  <div 
    className="reveal flex items-center justify-between bg-white border border-stone-200 rounded-xl p-6 group hover:border-gold-antique/50 transition-colors"
    style={{ transitionDelay: `${delay}ms` }}
  >
     <div>
       <h3 className="font-landing-heading text-xl text-emerald-midnight mb-1">{name}</h3>
       <p className="text-xs text-stone-500">{desc}</p>
     </div>
     <div className="flex flex-col items-end">
       <span className="text-[10px] font-bold uppercase tracking-widest text-gold-antique bg-gold-antique/10 px-2 py-1 rounded mb-1">{status}</span>
       <MapPin size={14} className="text-stone-300 group-hover:text-gold-antique transition-colors" />
     </div>
  </div>
));

const IslamicStar = React.memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
));
