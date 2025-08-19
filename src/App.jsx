import React from 'react';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ThreeJSExperience from './components/three/ThreeJSExperience';
import Navigation from './components/ui/Navigation';
import ThemeToggle from './components/ui/ThemeToggle';
import ScrollProgress from './components/ui/ScrollProgress';
import Preloader from './components/ui/Preloader';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';

function App() {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <div className="App relative min-h-screen">
          <Preloader />
          <ThreeJSExperience />
          <Navigation />
          <ThemeToggle />
          <ScrollProgress />
          
          <div className="page-wrapper relative z-10">
            <section id="home" className="section">
              <Hero />
            </section>
            
            <div className="section-margin"></div>
            
            <section id="about" className="section">
              <About />
            </section>
            
            <div className="section-margin"></div>
            
            <section id="projects" className="section">
              <Projects />
            </section>
            
            <div className="section-margin"></div>
            
            <section id="experience" className="section">
              <Experience />
            </section>
            
            <div className="section-margin"></div>
            
            <section id="contact" className="section">
              <Contact />
            </section>
          </div>
        </div>
      </AnimationProvider>
    </ThemeProvider>
  );
}

export default App;
