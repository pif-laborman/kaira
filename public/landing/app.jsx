function App() {
  return (
    <>
      <main>
        <Hero />
        <LogoTicker />
        <HowItWorks />
        <Problem />
        <FeatureDemo />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
