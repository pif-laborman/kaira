"use client";

import { useState } from "react";

function Cross({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`cross ${light ? "cross-light" : ""} w-4 h-4 ${className}`} />
  );
}

function ArrowBtn({ dark = false, href = "#" }: { dark?: boolean; href?: string }) {
  return (
    <a href={href} className={`btn-press w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${dark ? "border-white/20 text-white hover:bg-white/10" : "border-[#1C1C1C]/15 text-[#1C1C1C] hover:bg-[#1C1C1C]/5"}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

const styles = [
  { name: "Hatha Vinyasa", color: "bg-[#C5D8C0]" },
  { name: "Yin Yoga", color: "bg-[#C0CED8]" },
  { name: "Restorative", color: "bg-[#E8DFC0]" },
  { name: "Chair Yoga", color: "bg-[#E8C4C0]" },
  { name: "Kundalini", color: "bg-[#D0C5D8]" },
  { name: "Meditation", color: "bg-[#C5D8D0]" },
];

const testimonials = [
  {
    name: "Ann S.",
    role: "Yoga Teacher, 10 years",
    text: "The first yoga app I genuinely want to use for class preparation. I used to spend 45 minutes planning each class. Now it takes me 10. My sequences are better, too.",
  },
  {
    name: "Luca M.",
    role: "Beginner, 3 months in",
    text: "I'm still pretty new to yoga, but Kaira made it feel personal from day one. The videos break down each pose clearly. It's like having a teacher with me anytime I practice.",
  },
  {
    name: "Julia H.",
    role: "Marketing Director & Mum of Two",
    text: "I haven't had a ton of time to dive into the sequence builder yet. But the pre-made flows? Total game-changer for 6am sessions before the kids wake up.",
  },
];

const faqs = [
  {
    category: "Pricing",
    items: [
      { q: "How does pricing work?", a: "Choose monthly, quarterly, or yearly. All plans include every current and future feature. No tiers, no feature gates. You get everything." },
      { q: "Will my price ever increase?", a: "Not if you subscribe on this site. You get price-lock for life. Your rate stays the same as long as your subscription is active. This guarantee only applies to web subscribers." },
      { q: "What's the difference between subscribing here vs. in the app stores?", a: "You save 15-30% (we pass on the savings from avoiding app store commissions). Plus you get exclusive bonuses: the monthly digital magazine, private community access, and lifetime price lock. These are only available through this site." },
      { q: "Can I cancel anytime?", a: "Yes. No commitments, no penalties, no questions asked. You keep access until your current billing period ends." },
    ],
  },
  {
    category: "Features",
    items: [
      { q: "How is Kaira different from Down Dog, Alo Moves, or Glo?", a: "Those apps give you pre-recorded video classes. You hit play, you follow along. Kaira is the opposite: you design your own sequences (or pick expert-crafted ones), and the app guides you through them with voice cues, gongs, or video. You're the creator, not just the viewer." },
      { q: "I'm a complete beginner. Is this too advanced for me?", a: "Not at all. Every pose includes alignment cues, modifications, and video guidance. The pre-made flows range from gentle beginner sequences to advanced vinyasa. Start with pre-made, and build your own when you're ready." },
      { q: "Can I use this for class planning as a teacher?", a: "That's one of the most popular use cases. Filter by style, chakra, meridian, or benefit. The builder suggests poses that naturally follow your choices. Teachers tell us it cuts class prep time by 70%." },
    ],
  },
  {
    category: "Technical",
    items: [
      { q: "What devices does Kaira work on?", a: "iOS and Android right now. Web version is on the roadmap for 2026." },
      { q: "Does it work offline?", a: "Yes. Build and play sequences without an internet connection. Your library syncs when you're back online." },
    ],
  },
];

const team = [
  { name: "Alex Rivera", role: "CEO & Founder" },
  { name: "Mira Chen", role: "Product Lead" },
  { name: "Kai Santos", role: "Lead Developer" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStyle, setActiveStyle] = useState("ALL");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const faqFlat = faqs.flatMap((cat) => cat.items);

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1360px] mx-auto px-8 py-5 flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-wide text-white">Kaira</span>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-[13px] text-white/60 hover:text-white transition-colors duration-200 hidden md:block">Features</a>
            <a href="#pricing" className="text-[13px] text-white/60 hover:text-white transition-colors duration-200 hidden md:block">Pricing</a>
            <a href="#pricing" className="btn-press text-[12px] font-semibold tracking-[0.08em] uppercase bg-white text-[#1C1C1C] px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors duration-200">
              Get Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-yoga.jpg"
            alt="Yoga practitioner in warrior pose at sunset"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(180deg, rgba(28,28,28,0.3) 0%, rgba(28,28,28,0.1) 30%, rgba(28,28,28,0.5) 60%, rgba(28,28,28,0.92) 100%)`
          }} />
        </div>

        <Cross className="absolute top-20 left-8 z-20" light />
        <Cross className="absolute top-20 right-8 z-20" light />

        <div className="relative z-10 max-w-[1360px] mx-auto px-8 pb-12 pt-40 w-full">
          <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5 fade-up">
            Stop following. Start designing.
          </p>

          <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white uppercase mb-10 fade-up" style={{ animationDelay: '80ms' }}>
            Your practice.<br />
            <span className="text-white/40">Your sequences.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-t border-white/10 pt-6">
            <div className="max-w-[460px] fade-up" style={{ animationDelay: '160ms' }}>
              <p className="text-[16px] leading-[1.7] text-white/70 mb-2">
                <strong className="text-white">Kaira is not another video class app.</strong>
              </p>
              <p className="text-[15px] leading-[1.7] text-white/50">
                Design custom yoga sequences in seconds, then get guided through them with voice, gongs, or video. For teachers who prep classes, practitioners who want control, and anyone tired of rigid, pre-recorded flows.
              </p>
            </div>
            <div className="flex items-center gap-3 fade-up" style={{ animationDelay: '240ms' }}>
              <a href="#pricing" className="btn-press text-[12px] font-semibold tracking-[0.08em] uppercase bg-white text-[#1C1C1C] px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-200">
                Start Building Flows
              </a>
              <ArrowBtn dark href="#why" />
            </div>
          </div>
        </div>

        <Cross className="absolute bottom-6 left-8 z-20" light />
        <Cross className="absolute bottom-6 right-8 z-20" light />
      </section>

      {/* Social proof bar */}
      <section className="py-5 border-b border-[#1C1C1C]/8">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {["4.6 App Store rating", "71 countries", "6 yoga styles", "Class prep cut by 70%"].map((stat) => (
            <span key={stat} className="text-[12px] tracking-[0.15em] uppercase text-[#8A8478] font-medium">{stat}</span>
          ))}
        </div>
      </section>

      {/* Why Kaira - Problem agitation (NEW SECTION) */}
      <section id="why" className="py-24 relative">
        <Cross className="absolute top-8 left-8" />
        <div className="max-w-[900px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">The problem</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              Most yoga apps treat you like a passenger
            </h2>
            <p className="text-[16px] leading-[1.8] text-[#1C1C1C]/60 max-w-[600px] mx-auto">
              Pre-recorded classes. Fixed sequences. Hit play, follow along, repeat. No room to explore your own practice. No way to customize for your body, your students, or your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "If you teach",
                problem: "You spend 30-60 minutes planning every class. Scribbling sequences on paper, searching YouTube for transitions, second-guessing the flow.",
                solve: "Build a full class sequence in under 10 minutes. Filter by style, chakra, or benefit. Smart suggestions handle transitions.",
              },
              {
                label: "If you practice solo",
                problem: "You're stuck choosing between rigid pre-recorded classes that don't fit your level, or freestyling with no structure at all.",
                solve: "Design sequences that match your body and goals. Or pick from expert-crafted flows and let the player guide you through every pose.",
              },
              {
                label: "If you're short on time",
                problem: "You skip practice because you don't have 60 minutes. Finding the right class takes longer than doing the class.",
                solve: "Pre-made flows from 10 to 90 minutes. No browsing, no decision fatigue. Pick one and start. Done.",
              },
              {
                label: "If you're just starting",
                problem: "Every app assumes you already know what Chaturanga is. You feel lost, unsure if you're doing poses correctly, afraid of injury.",
                solve: "Every pose includes video guidance, alignment cues, and modifications. Start with beginner flows. Build confidence, then build your own.",
              },
            ].map((card) => (
              <div key={card.label} className="bg-[#F2EDE6] rounded-2xl p-7">
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8A8478] mb-3">{card.label}</p>
                <p className="text-[14px] leading-[1.7] text-[#1C1C1C]/50 mb-4">{card.problem}</p>
                <div className="border-t border-[#1C1C1C]/8 pt-4">
                  <p className="text-[14px] leading-[1.7] text-[#1C1C1C]/80 font-medium">{card.solve}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles grid */}
      <section id="features" className="py-24 relative bg-[#F2EDE6]">
        <Cross className="absolute top-8 left-8" />
        <Cross className="absolute top-8 right-8" />
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">Styles</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1] mb-3">
              Six styles. Hundreds of poses. One app.
            </h2>
            <p className="text-[15px] text-[#1C1C1C]/50">Every style has its own pose library, transitions, and expert-crafted flows.</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {["ALL", "VINYASA", "YIN", "RESTORATIVE", "CHAIR", "KUNDALINI"].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStyle(s)}
                className={`btn-press text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2 rounded-full border transition-colors duration-200 ${activeStyle === s ? "bg-[#1C1C1C] text-white border-[#1C1C1C]" : "bg-transparent text-[#1C1C1C] border-[#1C1C1C]/15 hover:border-[#1C1C1C]/30"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {styles.map((style) => (
              <div key={style.name} className={`${style.color} rounded-2xl p-5 min-h-[200px] flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#1C1C1C]/50">{style.name.split(" ")[0]}</span>
                  <Cross />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] mb-1">{style.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#1C1C1C]/50">12 flows</span>
                    <div className="w-7 h-7 rounded-full bg-[#1C1C1C]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sequence Builder: split layout */}
      <section className="py-24 bg-[#E8E1D8]">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">Sequence Builder</p>
              <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.02em] leading-[1.05] mb-6">
                Build a complete flow in under 5 minutes
              </h2>
              <p className="text-[16px] leading-[1.8] text-[#1C1C1C]/60 mb-4 max-w-[440px]">
                Filter by style, chakra, meridian, benefit, or name. Kaira suggests poses that naturally follow your choices, so your sequences unfold with clarity and purpose.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#1C1C1C]/60 mb-8 max-w-[440px]">
                No more guesswork. No more scribbling on paper. Just smart, personalized flow, built in seconds.
              </p>
              <div className="flex items-center gap-3">
                <a href="#pricing" className="btn-press text-[12px] font-semibold tracking-[0.08em] uppercase bg-[#1C1C1C] text-white px-7 py-3.5 rounded-full hover:bg-[#333] transition-colors duration-200">
                  Try the Builder
                </a>
                <ArrowBtn />
              </div>
            </div>
            {/* Phone mockups placeholder */}
            <div className="flex gap-4 justify-center">
              <div className="w-[200px] h-[400px] bg-[#F2EDE6] rounded-[24px] flex items-center justify-center">
                <span className="text-[12px] text-[#8A8478]">Builder</span>
              </div>
              <div className="w-[200px] h-[400px] bg-[#F2EDE6] rounded-[24px] flex items-center justify-center mt-12">
                <span className="text-[12px] text-[#8A8478]">Player</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="py-24 relative">
        <Cross className="absolute top-8 right-8" />
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">Features</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1]">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Sequence Builder", desc: "Design flows with smart pose suggestions. Filter by style, chakra, meridian, or benefit. Teachers cut class prep time by 70%.", color: "bg-[#C5D8C0]" },
              { title: "Sequence Player", desc: "Get guided through your flows with voice cues, gong transitions, or full video. Practice at your pace, on your terms.", color: "bg-[#C0CED8]" },
              { title: "Pre-Made Flows", desc: "Expert-crafted sequences for energy, relaxation, flexibility, and strength. 10 to 90 minutes. Pick and play.", color: "bg-[#E8DFC0]" },
              { title: "Pose Library", desc: "Every pose with alignment cues, modifications for different levels, and video guidance from certified instructors.", color: "bg-[#E8C4C0]" },
              { title: "Multi-Style", desc: "Hatha Vinyasa, Yin, Restorative, Chair Yoga, Kundalini, and Meditation. All in one place. Switch styles between sessions.", color: "bg-[#D0C5D8]" },
              { title: "Smart Filtering", desc: "Find poses by chakra, meridian, benefit, body area, or difficulty. Build intentional sequences, not random ones.", color: "bg-[#C5D8D0]" },
            ].map((f) => (
              <div key={f.title} className={`${f.color} rounded-2xl p-7 min-h-[180px] flex flex-col justify-between`}>
                <Cross className="self-end" />
                <div>
                  <h3 className="text-[16px] font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-[14px] text-[#1C1C1C]/60 leading-[1.6]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#1C1C1C] relative overflow-hidden">
        <Cross className="absolute top-8 left-8" light />
        <Cross className="absolute top-8 right-8" light />
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-4">From beta testers</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1] text-white">
              Teachers, practitioners, beginners.
            </h2>
            <p className="text-[15px] text-white/30 mt-3">
              Real feedback from early users.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-7">
                <p className="text-[15px] leading-[1.7] text-white/60 mb-8">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div>
                    <p className="text-[14px] font-semibold text-white">{t.name}</p>
                    <p className="text-[12px] text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative">
        <Cross className="absolute top-8 left-8" />
        <Cross className="absolute top-8 right-8" />
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="text-center mb-6">
            <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">Pricing</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1] mb-3">
              Practice on your terms
            </h2>
            <p className="text-[15px] text-[#1C1C1C]/50">
              All plans include every current and future feature, plus all bonuses. No tiers. No feature gates.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`btn-press text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2 rounded-full transition-colors duration-200 ${billingCycle === "monthly" ? "bg-[#1C1C1C] text-white" : "border border-[#1C1C1C]/15 text-[#1C1C1C]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`btn-press text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2 rounded-full transition-colors duration-200 ${billingCycle === "annual" ? "bg-[#1C1C1C] text-white" : "border border-[#1C1C1C]/15 text-[#1C1C1C]"}`}
            >
              Annual
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Monthly */}
            <div className="bg-white rounded-2xl p-7 flex flex-col border border-[#1C1C1C]/8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#8A8478]">Monthly</p>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#8A8478] bg-[#F2EDE6] px-3 py-1 rounded-full">Try it first</span>
              </div>
              <div className="mb-6">
                <span className="text-[42px] font-bold tracking-[-0.03em]">$14.99</span>
                <span className="text-[14px] text-[#8A8478] ml-1">/ month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Intelligent Sequence Builder", "Sequence Player", "Pre-Made Flows", "Pose Library", "Multi-Style Support"].map((f) => (
                  <li key={f} className="text-[14px] text-[#1C1C1C]/70 flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#C5D8C0] flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-press text-center text-[12px] font-semibold tracking-[0.08em] uppercase border border-[#1C1C1C]/15 text-[#1C1C1C] py-3.5 rounded-full hover:bg-[#1C1C1C]/5 transition-colors duration-200">
                Get Monthly Access
              </a>
            </div>

            {/* Quarterly - popular */}
            <div className="bg-[#E8C4C0] rounded-2xl p-7 flex flex-col relative">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#1C1C1C]/50">Quarterly</p>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase bg-white text-[#1C1C1C] px-3 py-1 rounded-full">Most popular</span>
              </div>
              <div className="mb-1">
                <span className="text-[14px] text-[#1C1C1C]/40 line-through">$79.99</span>
              </div>
              <div className="mb-2">
                <span className="text-[42px] font-bold tracking-[-0.03em]">$42.99</span>
                <span className="text-[14px] text-[#1C1C1C]/50 ml-1">/ quarter</span>
              </div>
              <p className="text-[12px] font-semibold text-[#3D8B5E] mb-6">Save 50% now</p>
              <ul className="space-y-3 mb-4 flex-1">
                {["Intelligent Sequence Builder", "Sequence Player", "Pre-Made Flows", "Pose Library", "Multi-Style Support"].map((f) => (
                  <li key={f} className="text-[14px] text-[#1C1C1C]/70 flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white/60 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {/* Bonus box */}
              <div className="bg-white/30 rounded-xl p-4 mb-6">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#1C1C1C]/50 mb-2">Web-only bonuses</p>
                <ul className="space-y-1.5">
                  {["Kaira Monthly digital magazine", "Private community access", "Price locked for life"].map((b) => (
                    <li key={b} className="text-[13px] text-[#1C1C1C]/70">{b}</li>
                  ))}
                </ul>
              </div>
              <a href="#" className="btn-press text-center text-[12px] font-semibold tracking-[0.08em] uppercase bg-[#1C1C1C] text-white py-3.5 rounded-full hover:bg-[#333] transition-colors duration-200">
                Get Quarterly Access
              </a>
            </div>

            {/* Yearly */}
            <div className="bg-white rounded-2xl p-7 flex flex-col border-2 border-[#3D8B5E]/30 relative">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#8A8478]">Yearly</p>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase bg-[#3D8B5E] text-white px-3 py-1 rounded-full">Best value</span>
              </div>
              <div className="mb-1">
                <span className="text-[14px] text-[#8A8478] line-through">$259.99</span>
              </div>
              <div className="mb-2">
                <span className="text-[42px] font-bold tracking-[-0.03em]">$129.99</span>
                <span className="text-[14px] text-[#8A8478] ml-1">/ year</span>
              </div>
              <p className="text-[12px] font-semibold text-[#3D8B5E] mb-6">Save 50%. That&apos;s $10.83/month.</p>
              <ul className="space-y-3 mb-4 flex-1">
                {["Intelligent Sequence Builder", "Sequence Player", "Pre-Made Flows", "Pose Library", "Multi-Style Support"].map((f) => (
                  <li key={f} className="text-[14px] text-[#1C1C1C]/70 flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#C5D8C0] flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {/* Bonus box */}
              <div className="bg-[#F2EDE6] rounded-xl p-4 mb-6">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#8A8478] mb-2">Web-only bonuses</p>
                <ul className="space-y-1.5">
                  {["Kaira Monthly digital magazine", "Private community access", "Price locked for life"].map((b) => (
                    <li key={b} className="text-[13px] text-[#1C1C1C]/70">{b}</li>
                  ))}
                </ul>
              </div>
              <a href="#" className="btn-press text-center text-[12px] font-semibold tracking-[0.08em] uppercase bg-[#1C1C1C] text-white py-3.5 rounded-full hover:bg-[#333] transition-colors duration-200">
                Get Yearly Access
              </a>
            </div>
          </div>

          {/* Below pricing */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-6 bg-[#1C1C1C] text-white rounded-full px-8 py-3">
              <span className="text-[12px] tracking-[0.08em] uppercase font-medium">Cancel anytime</span>
              <span className="text-white/20">|</span>
              <span className="text-[12px] tracking-[0.08em] uppercase font-medium">No commitments</span>
              <span className="text-white/20">|</span>
              <span className="text-[12px] tracking-[0.08em] uppercase font-medium">Save 15-30% vs. app stores</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Origin story */}
      <section className="py-24 bg-[#E8E1D8] relative">
        <Cross className="absolute top-8 left-8" />
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">Our story</p>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                We built this because we needed it
              </h2>
              <p className="text-[16px] leading-[1.8] text-[#1C1C1C]/60 mb-4">
                We&apos;re yoga teachers and practitioners who got tired of planning classes on paper and following cookie-cutter video apps. So we built the tool we wished existed.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#1C1C1C]/60 mb-4">
                Bootstrapped. No investors. No board meetings. Just a small team obsessed with making yoga practice more personal.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#1C1C1C]/60">
                Everything we earn goes back into building Kaira.
              </p>
            </div>
            <div className="flex gap-4">
              {team.map((m, i) => (
                <div key={m.name} className="flex-1">
                  <div className={`aspect-[3/4] bg-[#F2EDE6] rounded-2xl mb-3 ${i === 1 ? "mt-8" : ""}`} />
                  <p className="text-[14px] font-semibold">{m.name}</p>
                  <p className="text-[12px] text-[#8A8478]">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative">
        <Cross className="absolute top-8 right-8" />
        <div className="max-w-[700px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#8A8478] mb-4">FAQ</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.1]">
              Questions & answers
            </h2>
          </div>
          <div>
            {faqs.map((category) => (
              <div key={category.category} className="mb-8">
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8A8478] mb-3">{category.category}</p>
                {category.items.map((faq) => {
                  const globalIndex = faqFlat.indexOf(faq);
                  return (
                    <div key={globalIndex} className="border-b border-[#1C1C1C]/8">
                      <button
                        onClick={() => setOpenFaq(openFaq === globalIndex ? null : globalIndex)}
                        className="w-full text-left flex items-center justify-between py-5 group"
                      >
                        <span className="text-[15px] font-medium pr-4">{faq.q}</span>
                        <span className="w-8 h-8 rounded-full border border-[#1C1C1C]/10 flex items-center justify-center shrink-0 text-[#8A8478] transition-transform duration-200" style={{ transform: openFaq === globalIndex ? 'rotate(45deg)' : 'none' }}>
                          +
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: openFaq === globalIndex ? '300px' : '0', opacity: openFaq === globalIndex ? 1 : 0 }}
                      >
                        <p className="text-[14px] leading-[1.7] text-[#1C1C1C]/60 pb-5">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1C1C1C] relative overflow-hidden">
        <Cross className="absolute top-8 left-8" light />
        <Cross className="absolute bottom-8 right-8" light />
        <div className="max-w-[700px] mx-auto px-8 text-center">
          <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-6">Ready to stop following?</p>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.03em] leading-[0.95] text-white uppercase mb-6">
            Build your first flow
          </h2>
          <p className="text-[16px] leading-[1.7] text-white/40 mb-3">
            Design a sequence in under 5 minutes. Practice on your terms.
          </p>
          <p className="text-[14px] leading-[1.7] text-white/30 mb-10">
            Cancel anytime. Every feature included. Web subscribers save 15-30%.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="#pricing" className="btn-press text-[12px] font-semibold tracking-[0.08em] uppercase bg-white text-[#1C1C1C] px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200">
              Start Building Flows
            </a>
            <ArrowBtn dark href="#pricing" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1C1C1C]/8">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[14px] font-semibold">Kaira</span>
          <div className="flex gap-8 text-[13px] text-[#8A8478]">
            <a href="#" className="hover:text-[#1C1C1C] transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-[#1C1C1C] transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-[#1C1C1C] transition-colors duration-200">Contact</a>
          </div>
          <p className="text-[12px] text-[#8A8478]">Kaira Ltd.</p>
        </div>
      </footer>
    </>
  );
}
