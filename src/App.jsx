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
import PreloaderAnimations from './components/ui/PreloaderAnimations';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import { ThreeProvider } from './contexts/ThreeContext';

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <AnimationProvider>
          <div className="App relative min-h-screen">
          <Preloader />
          <PreloaderAnimations />
          
          {/* Fixed Three.js Experience */}
          <div className="experience fixed w-full h-full">
            <ThreeJSExperience />
          </div>
          
          {/* UI Components */}
          <Navigation />
          <ThemeToggle />
          <ScrollProgress />
          
          {/* Page Content */}
          <div className="page z-[99999] w-full h-screen overflow-hidden">
            <div className="page-wrapper relative">
              
              {/* Hero Section */}
              <section className="hero w-screen h-screen">
                <Hero />
              </section>
              
              {/* Intro Text */}
              <div className="intro-text flex justify-center items-center absolute top-1/2 left-1/2 font-medium text-base text-[var(--color-text)] transform -translate-x-1/2 -translate-y-1/2 opacity-0">
                <span className="animatedis">Click on the cube and scroll to get started!</span>
              </div>
              
              {/* Arrow indicator */}
              <div className="arrow-svg-wrapper absolute top-[90%] left-1/2 opacity-0 text-[var(--color-text)] transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12z"/>
                </svg>
              </div>
              
              {/* Section Margins for scroll */}
              <div className="section-margin h-[3000px] w-full"></div>
              
              {/* About Section */}
              <section className="section first-move relative w-1/2 p-[1000px_4%] m-0 bg-[var(--color-background)] overflow-hidden left rounded-tr-[700px] rounded-br-0">
                <div className="progress-wrapper h-0 w-3 z-[9999]">
                  <div className="progress-bar-wrapper-left absolute top-0 left-0">
                    <div className="progress-bar h-screen w-full bg-[var(--color-pink)] origin-top transform scale-y-100"></div>
                  </div>
                </div>
                <About />
              </section>
              
              <div className="section-margin h-[3000px] w-full"></div>
              
              {/* Projects Section */}
              <section className="section second-move relative w-1/2 p-[1000px_4%] m-0 bg-[var(--color-background)] overflow-hidden right ml-auto rounded-tl-[700px] rounded-bl-0">
                <div className="progress-wrapper h-0 w-3 z-[9999]">
                  <div className="progress-bar-wrapper-right absolute top-0 right-0">
                    <div className="progress-bar h-screen w-full bg-[var(--color-green)] origin-top transform scale-y-100"></div>
                  </div>
                </div>
                <Projects />
              </section>
              
              <div className="section-margin h-[3000px] w-full"></div>
              
              {/* Experience Section */}
              <section className="section third-move relative w-1/2 p-[1000px_4%] m-0 bg-[var(--color-background)] overflow-hidden left rounded-tr-[700px] rounded-br-0">
                <div className="progress-wrapper h-0 w-3 z-[9999]">
                  <div className="progress-bar-wrapper-left absolute top-0 left-0">
                    <div className="progress-bar h-screen w-full bg-[var(--color-blue)] origin-top transform scale-y-100"></div>
                  </div>
                </div>
                <Experience />
              </section>
              
              <div className="section-margin h-[3000px] w-full"></div>
              
              {/* Contact Section */}
              <section className="section fourth-move relative w-1/2 p-[1000px_4%] m-0 bg-[var(--color-background)] overflow-hidden right ml-auto rounded-tl-[700px] rounded-bl-0">
                <div className="progress-wrapper h-0 w-3 z-[9999]">
                  <div className="progress-bar-wrapper-right absolute top-0 right-0">
                    <div className="progress-bar h-screen w-full bg-[var(--color-pink)] origin-top transform scale-y-100"></div>
                  </div>
                </div>
                <Contact />
              </section>
              
            </div>
          </div>
        </div>
        </AnimationProvider>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
