"use client";

import { useState } from "react";

const benefitCards = [
  { title: "Smart Sequencing", desc: "Build flows in seconds with intelligent suggestions based on your choices.", gradient: "card-teal" },
  { title: "Guided Practice", desc: "Follow your sequences with voice cues, gongs, or full video instruction.", gradient: "card-amber" },
  { title: "Expert Flows", desc: "Access pre-made sequences designed by certified teachers for every goal.", gradient: "card-sage" },
  { title: "Every Style", desc: "From Hatha Vinyasa to Yin, Restorative, Chair Yoga, and beyond.", gradient: "card-indigo" },
];

const yogaStyles = [
  { name: "Hatha Vinyasa", desc: "Dynamic flow linking breath and movement" },
  { name: "Yin Yoga", desc: "Deep, slow holds for flexibility and release" },
  { name: "Restorative", desc: "Gentle, supported poses for deep relaxation" },
  { name: "Chair Yoga", desc: "Accessible practice for all abilities" },
  { name: "Kundalini", desc: "Energy work combining breath, mantra, and movement" },
  { name: "Mudra & Meditation", desc: "Hand gestures and stillness practices" },
];

const features = [
  { icon: "🧠", title: "Intelligent Sequence Builder", desc: "Filter by style, chakra, meridian, benefit, or name. Get smart suggestions that flow naturally." },
  { icon: "▶️", title: "Sequence Player", desc: "Be guided through your sequences exactly as you designed them. Voice, gongs, or video." },
  { icon: "🧘‍♀️", title: "Pre-Made Flows", desc: "Expert-crafted sequences for energy, relaxation, flexibility, and strength." },
  { icon: "🔍", title: "Advanced Filtering", desc: "Find exactly what you need across hundreds of poses and transitions." },
  { icon: "🧘‍♂️", title: "Multi-Style Support", desc: "Hatha, Yin, Restorative, Chair, Kundalini, and more. All in one app." },
];

const testimonials = [
  { name: "Maya", role: "Yoga Teacher", text: "This is the first yoga app I genuinely want to use for class preparation. The sequence builder is incredibly intuitive." },
  { name: "Daniel", role: "Practitioner & Beta Tester", text: "I'm still new to yoga, but Kaira made it feel personal from day one. The guided flows break down each pose clearly." },
  { name: "Priya", role: "Studio Owner", text: "The pre-made flows are a total game-changer for busy days. And the player? Nothing else like it." },
  { name: "Lars", role: "Software Engineer & Yogi", text: "What's already here is impressive, but the roadmap is what excites me most. This team knows what they're building." },
  { name: "Sofia", role: "Long-Time Practitioner", text: "I was skeptical of another yoga app. Kaira changed my mind. It keeps the mindful, intentional vibe I need." },
  { name: "Aisha", role: "Yoga Teacher & Beta Tester", text: "I've seen many digital tools come and go, but this feels different. It honors the roots of the practice." },
];

const faqs = [
  { q: "How does pricing work?", a: "Choose monthly, quarterly, or yearly. All plans include every current and future feature. Cancel anytime." },
  { q: "Will my subscription price ever increase?", a: "If you subscribe on our website, your price is locked in for life. It will never increase as long as your subscription stays active." },
  { q: "Can I cancel anytime?", a: "Yes. No commitments, no penalties. Cancel anytime and keep access until your current period ends." },
  { q: "What's the difference between subscribing here vs. in the app stores?", a: "Subscribing here saves you 15-30% because we avoid app store commissions. You also get exclusive bonuses like the digital magazine and community access." },
  { q: "What devices is Kaira available on?", a: "Currently available on iOS and Android. A web version is planned for 2026." },
  { q: "Can I share my sequences with others?", a: "Social sharing and teacher-student features are on our roadmap and coming soon." },
];

const teamMembers = [
  { name: "Alex", role: "CEO & Founder", desc: "A decade of scaling startups, now building the yoga app that should have existed years ago." },
  { name: "Mira", role: "Co-Founder & Product Lead", desc: "20+ years of yoga practice. Designed the original card decks that started it all." },
  { name: "Kai", role: "Lead Developer", desc: "Former engineer at top tech companies. Building from the Amazon to the app store." },
  { name: "Lena", role: "Designer", desc: "The visual mind behind the brand. Every pixel is intentional." },
  { name: "Nora", role: "Yoga Expert & Content Lead", desc: "Deep study in India. Bridging ancient philosophy with modern technology." },
  { name: "Sam", role: "Yoga Expert & Contributor", desc: "1,500+ hours certified. Teaching is a craft, and this tool elevates it." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  return (
    <>
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
        <div className="text-2xl font-bold text-white">
          <span className="gradient-text">K</span>
        </div>
        <a
          href="#pricing"
          className="bg-[#F0965A] text-white rounded-full px-6 py-3 text-base font-medium hover:bg-[#E08548] transition-colors"
        >
          Unlock Kaira
        </a>
      </nav>

      {/* Section 1: Hero */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 w-full">
          <div className="flex-1 text-white">
            <h1 className="text-4xl lg:text-[55px] font-semibold leading-[1] mb-6">
              KAIRA: The Intelligent{" "}
              <span className="gradient-text">Yoga Experience</span>{" "}
              That Adapts to YOU
            </h1>
            <p className="text-lg leading-[27px] mb-8 max-w-lg opacity-90">
              For the first time, design your own yoga sequences with smart, real-time suggestions.
              Then let Kaira guide you through them, exactly as you created them.
            </p>
            <a
              href="#why"
              className="inline-block bg-[#F0965A] text-white rounded-full px-8 py-4 text-base font-medium hover:bg-[#E08548] transition-colors"
            >
              Learn More
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-[280px] h-[500px] bg-black/20 rounded-[40px] border-2 border-white/10 flex items-center justify-center">
              <span className="text-white/40 text-sm">App Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Kaira */}
      <section id="why" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-4">
            Why Kaira? Because Yoga Deserves{" "}
            <span className="gradient-text">Better</span>
          </h2>
          <p className="text-center text-[#666] max-w-[600px] mx-auto mb-16">
            Generic apps give you generic flows. Kaira gives you the tools to practice on your own terms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitCards.map((card) => (
              <div
                key={card.title}
                className={`${card.gradient} rounded-t-[20px] rounded-b-none p-8 text-white min-h-[240px] flex flex-col justify-end`}
              >
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-white/90 text-base leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Closer Look (Video) */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
            Take a Closer Look at{" "}
            <span className="gradient-text">Kaira</span>
          </h2>
          <p className="text-[#666] mb-12">
            See how the Sequence Builder, Player, and Pre-Made Flows work together.
          </p>
          <div className="aspect-video bg-[#0F1C2E] rounded-2xl flex items-center justify-center">
            <div className="text-white/40 text-center">
              <div className="text-5xl mb-4">▶</div>
              <p>Demo Video</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Sequence Building */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="w-full max-w-[400px] mx-auto h-[500px] bg-gray-100 rounded-[20px] flex items-center justify-center">
              <span className="text-[#666] text-sm">Sequence Builder Screenshot</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
              Sequence Building,{" "}
              <span className="gradient-text">Reimagined</span>
            </h2>
            <p className="text-[#666] mb-6 leading-relaxed">
              Design complete yoga flows in seconds. Filter by style, chakra, meridian, benefit, or name.
              Kaira suggests poses that naturally follow your choices, helping your sequences unfold with
              clarity and purpose.
            </p>
            <p className="text-[#666] leading-relaxed">
              Every pose includes expert video guidance. Whether you&apos;re learning, teaching, or refining,
              everything you need is one tap away.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Learn Faster */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 flex gap-4 justify-center">
            <div className="w-[200px] h-[380px] bg-gray-100 rounded-[16px] flex items-center justify-center">
              <span className="text-[#666] text-xs">Info Card 1</span>
            </div>
            <div className="w-[200px] h-[380px] bg-gray-100 rounded-[16px] flex items-center justify-center">
              <span className="text-[#666] text-xs">Info Card 2</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
              Learn Faster. Remember More.{" "}
              <span className="gradient-text">Deepen Your Practice.</span>
            </h2>
            <p className="text-[#666] leading-relaxed">
              Every pose comes with detailed instruction, alignment cues, and modifications.
              Build muscle memory through repetition with your own custom sequences.
              Track your progress and watch your practice evolve.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Pre-Made Flows */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-4">
            Pre-Made Flows:{" "}
            <span className="gradient-text">Expertly Crafted</span>, Ready When You Are
          </h2>
          <p className="text-center text-[#666] max-w-[600px] mx-auto mb-12">
            Don&apos;t want to build from scratch? Choose from expert-designed sequences for energy,
            relaxation, flexibility, and strength.
          </p>
          <div className="flex gap-4 justify-center overflow-x-auto pb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[240px] h-[390px] bg-gray-100 rounded-[16px] flex items-center justify-center shrink-0"
              >
                <span className="text-[#666] text-sm">Flow {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Yoga Player */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
              The World&apos;s First{" "}
              <span className="gradient-text">Yoga Player</span>{" "}
              for Sequences You Create
            </h2>
            <p className="text-[#666] mb-6 leading-relaxed">
              Other apps give you their sequences. Kaira guides you through yours. Choose voice cues,
              gongs, or full video instruction. Set your own pace. Practice your way.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-[280px] h-[460px] bg-gray-100 rounded-[20px] flex items-center justify-center">
              <span className="text-[#666] text-sm">Player Screenshot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Pick Your Style */}
      <section className="py-24 bg-[#0F1C2E]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center text-white mb-4">
            Pick Your{" "}
            <span className="gradient-text">Style</span>
          </h2>
          <p className="text-center text-white/70 max-w-[600px] mx-auto mb-12">
            From dynamic vinyasa to gentle restorative, Kaira supports the styles you love.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {yogaStyles.map((style) => (
              <div
                key={style.name}
                className="min-w-[180px] bg-white/10 rounded-[16px] p-6 text-white flex flex-col items-center text-center shrink-0 snap-start"
              >
                <div className="w-[120px] h-[160px] bg-white/5 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-white/30 text-xs">{style.name}</span>
                </div>
                <h3 className="text-base font-semibold mb-1">{style.name}</h3>
                <p className="text-sm text-white/60">{style.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Beyond Movement */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
            Yoga in Its Most{" "}
            <span className="gradient-text">Authentic Form</span>{" "}
            - Beyond Just Movement
          </h2>
          <p className="text-[#666] leading-relaxed mb-6">
            Kaira goes beyond asana. Pranayama, mudras, meditation, mantras, and chanting are
            part of the experience. Because yoga was never just about the poses.
          </p>
          <p className="text-[#666] leading-relaxed">
            Some elements are live now. Others are part of our upcoming content roadmap.
            But the vision is clear: a complete practice, not just a workout.
          </p>
        </div>
      </section>

      {/* Section 10: Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-12">
            What Kaira Users Are{" "}
            <span className="gradient-text">Saying</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .slice(0, showAllTestimonials ? testimonials.length : 3)
              .map((t) => (
                <div
                  key={t.name}
                  className="border border-[#D5D8DC] rounded-[15px] p-6"
                >
                  <p className="text-[#666] leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-[#262626]">{t.name}</p>
                    <p className="text-sm text-[#666]">{t.role}</p>
                  </div>
                </div>
              ))}
          </div>
          {!showAllTestimonials && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllTestimonials(true)}
                className="bg-white text-[#262626] border border-[#262626] rounded-full px-6 py-2 text-base hover:bg-gray-50 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section 11: Create, Share, Connect */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
            Create, Share, and{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[#666] leading-relaxed mb-6">
            Yoga is better together. Share your sequences with friends, students, or the Kaira community.
            Connect with teachers. Discover new flows created by practitioners around the world.
          </p>
          <p className="text-sm text-[#999]">Coming soon</p>
        </div>
      </section>

      {/* Section 12: Practice Freely */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
              Practice Freely.{" "}
              <span className="gradient-text">Evolve Endlessly.</span>
            </h2>
            <p className="text-[#666] leading-relaxed mb-6">
              Kaira isn&apos;t just another app. It&apos;s a platform designed to grow with your practice.
              Whether you&apos;re stepping onto the mat for the first time or you&apos;ve been teaching for decades,
              Kaira adapts to where you are and where you want to go.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[450px] h-[360px] bg-gray-100 rounded-[16px] flex items-center justify-center">
              <span className="text-[#666] text-sm">Cards Overview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Feature Highlights */}
      <section className="py-24 bg-[#F5F0E8]">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-12">
            Feature{" "}
            <span className="gradient-text">Highlights</span>
          </h2>
          <div className="space-y-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="text-2xl mt-1">{f.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{f.title}</h3>
                  <p className="text-[#666] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 14: Bonuses */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-2">
            <span className="gradient-text">Bonuses</span>
          </h2>
          <p className="text-[#666] mb-12">Only when you subscribe on this website</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="border border-[#D5D8DC] rounded-[16px] p-6">
              <p className="text-2xl mb-3">📖</p>
              <h3 className="font-semibold mb-2">Kaira Monthly Magazine</h3>
              <p className="text-sm text-[#666]">A digital yoga magazine delivered to your inbox every month with sequences, tips, and inspiration.</p>
            </div>
            <div className="border border-[#D5D8DC] rounded-[16px] p-6">
              <p className="text-2xl mb-3">💬</p>
              <h3 className="font-semibold mb-2">Private Community</h3>
              <p className="text-sm text-[#666]">Access our private Telegram group. Connect with fellow practitioners, share flows, and get support.</p>
            </div>
            <div className="border border-[#D5D8DC] rounded-[16px] p-6">
              <p className="text-2xl mb-3">🔒</p>
              <h3 className="font-semibold mb-2">Locked-In Price</h3>
              <p className="text-sm text-[#666]">Your subscription price will never increase. Lock in today&apos;s rate for as long as you stay subscribed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15: Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-4">
            Practice on{" "}
            <span className="gradient-text">Your Terms</span>
          </h2>
          <p className="text-center text-[#666] max-w-[600px] mx-auto mb-12">
            All plans include every current and future feature, plus all the bonuses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {/* Monthly */}
            <div className="border border-[#D5D8DC] rounded-[10px] p-6 text-center">
              <span className="inline-block bg-gray-100 text-[#666] text-xs font-medium px-3 py-1 rounded-full mb-4">
                Try It First
              </span>
              <h3 className="text-xl font-bold mb-2">Monthly</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#2EBA68]">$14.99</span>
                <span className="text-sm text-[#666]">/month</span>
              </div>
              <ul className="text-sm text-[#666] text-left space-y-2 mb-6">
                <li>✓ Intelligent Sequence Builder</li>
                <li>✓ Sequence Player</li>
                <li>✓ Pre-Made Flows</li>
                <li>✓ Advanced Filtering</li>
                <li>✓ Multi-Style Support</li>
              </ul>
              <a
                href="#"
                className="block w-full bg-[#F0965A] text-white rounded-full py-3 font-medium hover:bg-[#E08548] transition-colors"
              >
                Get Monthly Access
              </a>
            </div>

            {/* Quarterly */}
            <div className="border-2 border-[#F0965A] rounded-[10px] p-6 text-center relative">
              <span className="inline-block bg-[#F0965A] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                🔥 Popular Choice
              </span>
              <h3 className="text-xl font-bold mb-2">Quarterly</h3>
              <div className="mb-1">
                <span className="text-sm text-[#666] line-through">$79.99</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#2EBA68]">$42.99</span>
                <span className="text-sm text-[#666]">/quarter</span>
              </div>
              <p className="text-xs text-[#2EBA68] font-bold mb-4">Save 50%</p>
              <ul className="text-sm text-[#666] text-left space-y-2 mb-2">
                <li>✓ Everything in Monthly</li>
                <li>✓ Kaira Monthly Magazine</li>
                <li>✓ Private Community Access</li>
                <li>✓ Locked-In Price</li>
              </ul>
              <a
                href="#"
                className="block w-full bg-[#F0965A] text-white rounded-full py-3 font-medium hover:bg-[#E08548] transition-colors mt-4"
              >
                Get Quarterly Access
              </a>
            </div>

            {/* Yearly */}
            <div className="border border-[#D5D8DC] rounded-[10px] p-6 text-center">
              <span className="inline-block bg-[#2EBA68] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                🏆 Best Value
              </span>
              <h3 className="text-xl font-bold mb-2">Yearly</h3>
              <div className="mb-1">
                <span className="text-sm text-[#666] line-through">$259.99</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#2EBA68]">$129.99</span>
                <span className="text-sm text-[#666]">/year</span>
              </div>
              <p className="text-xs text-[#2EBA68] font-bold mb-4">Save 50%</p>
              <ul className="text-sm text-[#666] text-left space-y-2 mb-2">
                <li>✓ Everything in Monthly</li>
                <li>✓ Kaira Monthly Magazine</li>
                <li>✓ Private Community Access</li>
                <li>✓ Locked-In Price</li>
              </ul>
              <a
                href="#"
                className="block w-full bg-[#F0965A] text-white rounded-full py-3 font-medium hover:bg-[#E08548] transition-colors mt-4"
              >
                Get Yearly Access
              </a>
            </div>
          </div>
          <p className="text-center mt-8">
            <span className="inline-block bg-[#0F1C2E] text-white text-sm px-6 py-3 rounded-full">
              Cancel anytime. No commitments. Total freedom.
            </span>
          </p>
        </div>
      </section>

      {/* Section 16: Origin Story */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] mb-4">
            We Built the World&apos;s #1{" "}
            <span className="gradient-text">Yoga Decks</span>
          </h2>
          <p className="text-[#666] leading-relaxed mb-8">
            Now, we&apos;re redefining what a{" "}
            <span className="gradient-text font-semibold">yoga app</span>{" "}
            can be. From physical cards used in 100+ countries to a digital platform trusted by
            thousands. Same team. Same passion. Bigger vision.
          </p>
          <div className="flex justify-center gap-4">
            <span className="bg-[#0F1C2E] text-white px-6 py-3 rounded-full text-sm font-bold">
              +100K CUSTOMERS
            </span>
            <span className="bg-[#0F1C2E] text-white px-6 py-3 rounded-full text-sm font-bold">
              +71 COUNTRIES
            </span>
          </div>
        </div>
      </section>

      {/* Section 17: Team */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-12">
            Meet the{" "}
            <span className="gradient-text">Team</span>
          </h2>
          <div className="space-y-12">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8`}
              >
                <div className="w-full lg:w-[480px] h-[320px] bg-gray-100 rounded-[16px] flex items-center justify-center shrink-0">
                  <span className="text-[#666] text-sm">{member.name}&apos;s Photo</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#F0965A] font-medium mb-3">{member.role}</p>
                  <p className="text-[#666] leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 18: Roadmap */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-4">
            What&apos;s Live.{" "}
            <span className="gradient-text">What&apos;s Next.</span>
          </h2>
          <p className="text-center text-[#666] mb-12">
            Bootstrapped and live. Here&apos;s where we are and where we&apos;re heading.
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#2EBA68] rounded-full inline-block"></span>
              Live Now
            </h3>
            <ul className="space-y-2 text-[#666]">
              <li>✓ Intelligent Sequence Builder with smart suggestions</li>
              <li>✓ Sequence Player with voice and gong guidance</li>
              <li>✓ Pre-Made Flows by certified teachers</li>
              <li>✓ Multi-style support (Hatha Vinyasa, Yin, Restorative, Chair)</li>
              <li>✓ Detailed pose information and video guides</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#F0965A] rounded-full inline-block"></span>
              In Development
            </h3>
            <ul className="space-y-2 text-[#666]">
              <li>○ AI-powered personalized flow recommendations</li>
              <li>○ Card scanning (physical deck to digital sequence)</li>
              <li>○ Social sharing and community features</li>
              <li>○ Additional yoga styles</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#6B73B5] rounded-full inline-block"></span>
              Future
            </h3>
            <ul className="space-y-2 text-[#666]">
              <li>○ Teacher-student connection and booking</li>
              <li>○ Meditation, mantras, and chanting content</li>
              <li>○ Web version</li>
              <li>○ Marketplace for teacher sequences</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 19: FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl lg:text-[40px] font-bold leading-[1] text-center mb-12">
            <span className="gradient-text">FAQ</span>
          </h2>
          <div className="divide-y divide-[#D5D8DC]">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between text-base font-semibold"
                >
                  {faq.q}
                  <span className="text-xl ml-4 shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-[#666] leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 20: Footer */}
      <footer className="bg-[#0F1C2E] py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold mb-2">
                <span className="gradient-text">Kaira</span>
              </div>
              <p className="text-white/60 text-sm">
                Your practice, your flow.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#F0965A] hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#F0965A] hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-[#F0965A] hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex gap-3">
              {["Instagram", "YouTube", "Facebook"].map((social) => (
                <span
                  key={social}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F0965A] text-xs font-bold"
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              Kaira is a project by Kaira Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
