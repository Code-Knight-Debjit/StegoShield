import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import TechnologyStack from "./components/sections/TechnologyStack";
import SecurityHighlights from "./components/sections/SecurityHighlights";
import UseCases from "./components/sections/UseCases";
import EncodePanel from "./components/sections/EncodePanel";
import DecodePanel from "./components/sections/DecodePanel";

function App() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="grid-overlay absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <TechnologyStack />
        <SecurityHighlights />
        <UseCases />
        <section
          id="workspace"
          className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2 lg:px-8"
        >
          <EncodePanel />
          <DecodePanel />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
